import { Client } from '@notionhq/client';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

if (!NOTION_TOKEN || !NOTION_DATABASE_ID) {
  console.error('Missing NOTION_TOKEN or NOTION_DATABASE_ID');
  process.exit(1);
}

const notion = new Client({ auth: NOTION_TOKEN });

const OUTPUT_DIR = path.resolve('public', 'blog');
const POSTS_DIR = path.join(OUTPUT_DIR, 'posts');
const ASSETS_DIR = path.join(OUTPUT_DIR, 'assets');
const TMP_DIR = path.join(os.tmpdir(), 'portfolio-blog-sync');

const PROPERTY_NAMES = {
  title: 'Title',
  description: 'Description',
  publishedDate: 'Published Date',
  tags: 'Tags',
  published: 'Published'
};

const MAX_BLOCK_DEPTH = 6;
const assetCache = new Map();
const S3_ORIGINALS_BUCKET = process.env.BLOG_S3_ORIGINALS_BUCKET || '';
const BLOG_IMAGE_BASE_URL_RAW =
  process.env.BLOG_IMAGE_BASE_URL ||
  process.env.BLOG_CLOUDFRONT_DOMAIN ||
  '';
const BLOG_IMAGE_BASE_URL = BLOG_IMAGE_BASE_URL_RAW.replace(/\/+$/, '');
const ORIGINALS_PREFIX = process.env.BLOG_ORIGINALS_PREFIX || 'notion-originals/';
const IMAGE_WIDTHS = (process.env.BLOG_IMAGE_WIDTHS || '640')
  .split(',')
  .map((v) => Number(v.trim()))
  .filter((v) => Number.isFinite(v) && v > 0)
  .sort((a, b) => a - b);
const IMAGE_DISPLAY_MAX_WIDTH = Number(process.env.BLOG_IMAGE_DISPLAY_MAX_WIDTH || '520');
const AWS_REGION = process.env.AWS_REGION || 'ap-northeast-2';
const AWS_PROFILE = process.env.AWS_PROFILE || 'dongik2';
const USE_S3_PIPELINE = Boolean(S3_ORIGINALS_BUCKET && BLOG_IMAGE_BASE_URL);

function extractDateDigits(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const yyyy = String(date.getFullYear());
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}${mm}${dd}`;
}

function extractDigits(value) {
  return (value || '').replace(/\D/g, '');
}

function getPlainText(richText = []) {
  return richText.map((item) => item.plain_text).join('').trim();
}

function getTitle(property) {
  if (!property || property.type !== 'title') return '';
  return getPlainText(property.title);
}

function getRichText(property) {
  if (!property || property.type !== 'rich_text') return '';
  return getPlainText(property.rich_text);
}

function getDate(property) {
  if (!property || property.type !== 'date' || !property.date) return '';
  return property.date.start || '';
}

function getTags(property) {
  if (!property || property.type !== 'multi_select') return [];
  return property.multi_select.map((tag) => tag.name).filter(Boolean);
}

function getCheckbox(property) {
  if (!property || property.type !== 'checkbox') return false;
  return property.checkbox === true;
}

async function fetchAllPages(databaseId) {
  let results = [];
  let cursor = undefined;

  while (true) {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: PROPERTY_NAMES.published,
        checkbox: { equals: true }
      },
      sorts: [
        {
          property: PROPERTY_NAMES.publishedDate,
          direction: 'descending'
        }
      ],
      start_cursor: cursor
    });

    results = results.concat(response.results);

    if (!response.has_more) break;
    cursor = response.next_cursor;
  }

  return results;
}

async function listAllBlockChildren(blockId) {
  let results = [];
  let cursor = undefined;

  while (true) {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      page_size: 100,
      start_cursor: cursor
    });

    results = results.concat(response.results || []);

    if (!response.has_more) break;
    cursor = response.next_cursor;
  }

  return results;
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderRichText(richText = []) {
  return richText
    .map((text) => {
      let content = escapeHtml(text.plain_text || '');
      if (text.annotations) {
        if (text.annotations.code) {
          content = `<code>${content}</code>`;
        }
        if (text.annotations.bold) {
          content = `<strong>${content}</strong>`;
        }
        if (text.annotations.italic) {
          content = `<em>${content}</em>`;
        }
        if (text.annotations.strikethrough) {
          content = `<del>${content}</del>`;
        }
        if (text.annotations.underline) {
          content = `<u>${content}</u>`;
        }
      }
      if (text.href) {
        return `<a href="${text.href}" target="_blank" rel="noopener noreferrer">${content}</a>`;
      }
      return content;
    })
    .join('');
}

function extensionFromContentType(contentType, fallback = '.bin') {
  if (!contentType) return fallback;
  const normalized = contentType.toLowerCase();
  if (normalized.includes('image/jpeg')) return '.jpg';
  if (normalized.includes('image/png')) return '.png';
  if (normalized.includes('image/webp')) return '.webp';
  if (normalized.includes('image/gif')) return '.gif';
  if (normalized.includes('image/svg+xml')) return '.svg';
  if (normalized.includes('video/mp4')) return '.mp4';
  if (normalized.includes('application/pdf')) return '.pdf';
  return fallback;
}

function extensionFromUrl(url) {
  try {
    const pathname = new URL(url).pathname;
    const ext = path.extname(pathname || '').toLowerCase();
    if (/^\.[a-z0-9]{1,8}$/.test(ext)) {
      return ext;
    }
  } catch {
    return '';
  }
  return '';
}

function getFileLikeUrl(fileLike) {
  if (!fileLike || !fileLike.type) return '';
  if (fileLike.type === 'external') return fileLike.external?.url || '';
  if (fileLike.type === 'file') return fileLike.file?.url || '';
  return '';
}

function parseImageHints(captionRich = []) {
  const plain = getPlainText(captionRich);
  const tokenRegex = /\{\{\s*(w|width|align)\s*:\s*([^}]+)\}\}/gi;

  let widthPx = null;
  let widthPercent = null;
  let align = 'center';
  let match;

  while ((match = tokenRegex.exec(plain)) !== null) {
    const key = String(match[1] || '').toLowerCase();
    const value = String(match[2] || '').trim().toLowerCase();

    if (key === 'w' || key === 'width') {
      if (value.endsWith('%')) {
        const pct = Number(value.replace('%', ''));
        if (Number.isFinite(pct) && pct > 0 && pct <= 100) {
          widthPercent = pct;
          widthPx = null;
        }
      } else {
        const px = Number(value.replace('px', ''));
        if (Number.isFinite(px) && px > 0) {
          widthPx = px;
          widthPercent = null;
        }
      }
    }

    if (key === 'align') {
      if (value === 'left' || value === 'center' || value === 'right') {
        align = value;
      }
    }
  }

  const captionText = plain.replace(tokenRegex, '').trim();

  return {
    widthPx,
    widthPercent,
    align,
    captionText
  };
}

function buildCloudFrontUrl(key) {
  if (/^https?:\/\//.test(BLOG_IMAGE_BASE_URL)) {
    return `${BLOG_IMAGE_BASE_URL}/${key}`;
  }
  return `https://${BLOG_IMAGE_BASE_URL}/${key}`;
}

function toSafeId(value, fallback) {
  const clean = String(value || '')
    .replace(/[^a-zA-Z0-9_-]/g, '')
    .trim();
  return clean || fallback;
}

function detectImageDimensions(buffer) {
  if (!buffer || buffer.length < 24) return null;

  // PNG
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47
  ) {
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    if (width > 0 && height > 0) return { width, height };
  }

  // GIF
  if (
    buffer[0] === 0x47 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x38
  ) {
    const width = buffer.readUInt16LE(6);
    const height = buffer.readUInt16LE(8);
    if (width > 0 && height > 0) return { width, height };
  }

  // JPEG
  if (buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    while (offset + 9 < buffer.length) {
      if (buffer[offset] !== 0xff) break;
      const marker = buffer[offset + 1];
      const size = buffer.readUInt16BE(offset + 2);

      // SOF markers that contain dimensions
      const isSof =
        marker === 0xc0 || marker === 0xc1 || marker === 0xc2 || marker === 0xc3 ||
        marker === 0xc5 || marker === 0xc6 || marker === 0xc7 ||
        marker === 0xc9 || marker === 0xca || marker === 0xcb ||
        marker === 0xcd || marker === 0xce || marker === 0xcf;

      if (isSof && offset + 8 < buffer.length) {
        const height = buffer.readUInt16BE(offset + 5);
        const width = buffer.readUInt16BE(offset + 7);
        if (width > 0 && height > 0) return { width, height };
      }

      if (size < 2) break;
      offset += 2 + size;
    }
  }

  return null;
}

async function cacheRemoteAsset(url, blockId, fallbackExt = '.bin') {
  if (!url) return { publicPath: '', dimensions: null };
  if (assetCache.has(url)) return assetCache.get(url);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const contentType = response.headers.get('content-type') || '';
    const ext = extensionFromUrl(url) || extensionFromContentType(contentType, fallbackExt);
    const stableId = blockId || crypto.createHash('sha1').update(url).digest('hex').slice(0, 16);
    const safeId = String(stableId).replace(/[^a-zA-Z0-9_-]/g, '');
    const filename = `${safeId}${ext || fallbackExt}`;
    const outputPath = path.join(ASSETS_DIR, filename);
    const buffer = Buffer.from(await response.arrayBuffer());

    await fs.writeFile(outputPath, buffer);
    const publicPath = `/blog/assets/${filename}`;
    const dimensions = detectImageDimensions(buffer);

    const result = { publicPath, dimensions };
    assetCache.set(url, result);
    return result;
  } catch (error) {
    console.warn(`Failed to cache asset for block ${blockId}: ${error.message}`);
    const result = { publicPath: url, dimensions: null };
    assetCache.set(url, result);
    return result;
  }
}

function uploadToS3WithAwsCli(localPath, s3Key, contentType) {
  const args = [
    's3',
    'cp',
    localPath,
    `s3://${S3_ORIGINALS_BUCKET}/${s3Key}`,
    '--region',
    AWS_REGION,
    '--profile',
    AWS_PROFILE,
    '--only-show-errors',
    '--content-type',
    contentType
  ];

  const result = spawnSync('aws', args, { encoding: 'utf-8' });
  if (result.status !== 0) {
    throw new Error((result.stderr || result.stdout || 'aws s3 cp failed').trim());
  }
}

async function stageImageForPipeline(sourceUrl, blockId, fallbackExt = '.jpg') {
  if (!sourceUrl) return null;

  const cacheKey = `pipeline:${sourceUrl}`;
  if (assetCache.has(cacheKey)) {
    return assetCache.get(cacheKey);
  }

  const response = await fetch(sourceUrl);
  if (!response.ok) {
    throw new Error(`Failed to download source image: HTTP ${response.status}`);
  }

  const contentType = response.headers.get('content-type') || 'image/jpeg';
  const ext = extensionFromUrl(sourceUrl) || extensionFromContentType(contentType, fallbackExt);
  const stableId = toSafeId(blockId, crypto.createHash('sha1').update(sourceUrl).digest('hex').slice(0, 16));
  const s3Key = `${ORIGINALS_PREFIX}${stableId}${ext}`;
  const keyNoExt = s3Key.replace(/\.[^./]+$/, '');

  const buffer = Buffer.from(await response.arrayBuffer());
  const dimensions = detectImageDimensions(buffer);

  await fs.mkdir(TMP_DIR, { recursive: true });
  const tempPath = path.join(TMP_DIR, `${stableId}${ext}`);
  await fs.writeFile(tempPath, buffer);

  try {
    uploadToS3WithAwsCli(tempPath, s3Key, contentType);
  } finally {
    await fs.unlink(tempPath).catch(() => {});
  }

  const largestWidth = IMAGE_WIDTHS[IMAGE_WIDTHS.length - 1];
  const srcset = IMAGE_WIDTHS.map((w) => `${buildCloudFrontUrl(`${keyNoExt}/w${w}.webp`)} ${w}w`).join(', ');
  const processedSrc = largestWidth
    ? buildCloudFrontUrl(`${keyNoExt}/w${largestWidth}.webp`)
    : buildCloudFrontUrl(`${keyNoExt}/original${ext}`);
  const fallbackSrc = buildCloudFrontUrl(`${keyNoExt}/original${ext}`);

  const result = {
    publicPath: processedSrc,
    fallbackPath: fallbackSrc,
    srcset,
    dimensions
  };
  assetCache.set(cacheKey, result);
  return result;
}

function renderParagraph(block) {
  const content = renderRichText(block.paragraph?.rich_text || []);
  if (!content) return '';
  return `<p>${content}</p>`;
}

function renderHeading(block, level) {
  const content = renderRichText(block[level]?.rich_text || []);
  if (!content) return '';
  const tag = level === 'heading_1' ? 'h1' : level === 'heading_2' ? 'h2' : 'h3';
  return `<${tag}>${content}</${tag}>`;
}

function renderListItem(block) {
  const content = renderRichText(block[block.type]?.rich_text || []);
  return `<li>${content}</li>`;
}

function renderQuote(block) {
  const content = renderRichText(block.quote?.rich_text || []);
  if (!content) return '';
  return `<blockquote>${content}</blockquote>`;
}

function renderCode(block) {
  const content = escapeHtml(getPlainText(block.code?.rich_text || []));
  const language = block.code?.language || 'plaintext';
  return `<pre><code data-language="${language}">${content}</code></pre>`;
}

function renderCallout(block) {
  const content = renderRichText(block.callout?.rich_text || []);
  if (!content) return '';
  const icon = block.callout?.icon?.type === 'emoji'
    ? escapeHtml(block.callout.icon.emoji || '')
    : '';
  return `<div class="blog-callout">${icon ? `<span class="blog-callout-icon">${icon}</span>` : ''}<div>${content}</div></div>`;
}

function renderDivider() {
  return '<hr />';
}

function renderBookmark(block) {
  const url = block.bookmark?.url;
  if (!url) return '';
  return `<p><a href="${url}" target="_blank" rel="noopener noreferrer">${escapeHtml(url)}</a></p>`;
}

function renderEmbed(block) {
  const url = block.embed?.url;
  if (!url) return '';
  return `<p><a href="${url}" target="_blank" rel="noopener noreferrer">${escapeHtml(url)}</a></p>`;
}

function renderLinkPreview(block) {
  const url = block.link_preview?.url;
  if (!url) return '';
  return `<p><a href="${url}" target="_blank" rel="noopener noreferrer">${escapeHtml(url)}</a></p>`;
}

function renderChildPage(block) {
  const title = escapeHtml(block.child_page?.title || 'Untitled page');
  return `<p class="blog-child-ref">📄 ${title}</p>`;
}

function renderChildDatabase(block) {
  const title = escapeHtml(block.child_database?.title || 'Untitled database');
  return `<p class="blog-child-ref">🗃️ ${title}</p>`;
}

function renderEquation(block) {
  const expression = escapeHtml(block.equation?.expression || '');
  if (!expression) return '';
  return `<pre><code data-language="latex">${expression}</code></pre>`;
}

function renderToDo(block, childHtml = '') {
  const content = renderRichText(block.to_do?.rich_text || []);
  const checked = block.to_do?.checked === true ? ' checked' : '';
  return `<div class="blog-todo"><label><input type="checkbox" disabled${checked} /> <span>${content}</span></label>${childHtml}</div>`;
}

function renderToggle(block, childHtml = '') {
  const content = renderRichText(block.toggle?.rich_text || []);
  return `<details class="blog-toggle"><summary>${content || 'Toggle'}</summary>${childHtml}</details>`;
}

function renderHeadingToggle(block, childHtml = '') {
  const level = block.type;
  const content = renderRichText(block[level]?.rich_text || []);
  if (!content) return childHtml;
  const headingTag = level === 'heading_1' ? 'h1' : level === 'heading_2' ? 'h2' : 'h3';
  return `<details class="blog-toggle blog-toggle-heading"><summary><span class="${headingTag}">${content}</span></summary>${childHtml}</details>`;
}

function renderTableOfContents() {
  return '';
}

function renderUnsupported(block) {
  return `<p class="blog-unsupported">Unsupported Notion block: ${escapeHtml(block.type || 'unknown')}</p>`;
}

async function renderImage(block) {
  const image = block.image;
  if (!image) return '';

  const sourceUrl = getFileLikeUrl(image);
  if (!sourceUrl) return '';

  let asset;
  if (USE_S3_PIPELINE) {
    try {
      asset = await stageImageForPipeline(sourceUrl, block.id, '.png');
    } catch (error) {
      console.warn(`Pipeline upload failed for image block ${block.id}: ${error.message}`);
      asset = image.type === 'file'
        ? await cacheRemoteAsset(sourceUrl, block.id, '.png')
        : { publicPath: sourceUrl, dimensions: null };
    }
  } else if (image.type === 'file') {
    asset = await cacheRemoteAsset(sourceUrl, block.id, '.png');
  } else {
    asset = { publicPath: sourceUrl, dimensions: null };
  }

  const captionRich = image.caption || [];
  const hints = parseImageHints(captionRich);
  const captionHtml = hints.captionText ? escapeHtml(hints.captionText) : '';
  const altText = escapeHtml(hints.captionText || getPlainText(captionRich) || 'Notion image');
  const width = asset.dimensions?.width;
  const height = asset.dimensions?.height;
  const sizeAttrs = width && height ? ` width="${width}" height="${height}"` : '';
  const maxGeneratedWidth = IMAGE_WIDTHS.length > 0 ? IMAGE_WIDTHS[IMAGE_WIDTHS.length - 1] : null;
  const displayMaxWidth = Number.isFinite(IMAGE_DISPLAY_MAX_WIDTH) && IMAGE_DISPLAY_MAX_WIDTH > 0
    ? IMAGE_DISPLAY_MAX_WIDTH
    : null;
  const figureStyle =
    hints.align === 'left'
      ? ' style="text-align:left;"'
      : hints.align === 'right'
      ? ' style="text-align:right;"'
      : ' style="text-align:center;"';

  let desiredWidthPx = null;
  if (hints.widthPx) {
    desiredWidthPx = maxGeneratedWidth ? Math.min(hints.widthPx, maxGeneratedWidth) : hints.widthPx;
  } else if (width) {
    desiredWidthPx = maxGeneratedWidth ? Math.min(width, maxGeneratedWidth) : Math.min(width, 960);
  } else if (maxGeneratedWidth) {
    desiredWidthPx = maxGeneratedWidth;
  }

  if (displayMaxWidth && desiredWidthPx) {
    desiredWidthPx = Math.min(desiredWidthPx, displayMaxWidth);
  }

  const inlineStyle = hints.widthPercent
    ? ` style="width:${hints.widthPercent}%;height:auto;display:inline-block;"`
    : desiredWidthPx
    ? ` style="width:min(100%, ${desiredWidthPx}px);height:auto;display:inline-block;"`
    : ' style="max-width:100%;height:auto;display:inline-block;"';

  const sizesAttrValue = hints.widthPercent
    ? `${Math.round(hints.widthPercent)}vw`
    : desiredWidthPx
    ? `${Math.round(desiredWidthPx)}px`
    : '(max-width: 768px) 100vw, 960px';
  const srcSetAttr = asset.srcset ? ` srcset="${asset.srcset}" sizes="${sizesAttrValue}"` : '';
  const fallbackSrc = asset.fallbackPath || asset.publicPath;

  if (asset.srcset) {
    return `<figure${figureStyle}><picture><source type="image/webp"${srcSetAttr} /><img src="${fallbackSrc}" alt="${altText}"${sizeAttrs}${inlineStyle} /></picture>${captionHtml ? `<figcaption>${captionHtml}</figcaption>` : ''}</figure>`;
  }

  return `<figure${figureStyle}><img src="${asset.publicPath}" alt="${altText}"${sizeAttrs}${inlineStyle} />${captionHtml ? `<figcaption>${captionHtml}</figcaption>` : ''}</figure>`;
}

async function renderFileLike(block, kind) {
  const payload = block[kind];
  if (!payload) return '';

  const sourceUrl = getFileLikeUrl(payload);
  if (!sourceUrl) return '';

  const asset = payload.type === 'file'
    ? await cacheRemoteAsset(sourceUrl, block.id, kind === 'pdf' ? '.pdf' : '.bin')
    : { publicPath: sourceUrl, dimensions: null };

  const captionHtml = renderRichText(payload.caption || []);

  if (kind === 'pdf') {
    return `<figure><a href="${asset.publicPath}" target="_blank" rel="noopener noreferrer">Open PDF</a>${captionHtml ? `<figcaption>${captionHtml}</figcaption>` : ''}</figure>`;
  }

  if (kind === 'video') {
    return `<figure><video controls preload="metadata" src="${asset.publicPath}" style="max-width:100%;border-radius:0.75rem;"></video>${captionHtml ? `<figcaption>${captionHtml}</figcaption>` : ''}</figure>`;
  }

  if (kind === 'audio') {
    return `<figure><audio controls preload="metadata" src="${asset.publicPath}" style="width:100%;"></audio>${captionHtml ? `<figcaption>${captionHtml}</figcaption>` : ''}</figure>`;
  }

  if (kind === 'file') {
    const name = escapeHtml(payload.name || 'Download file');
    return `<p><a href="${asset.publicPath}" target="_blank" rel="noopener noreferrer">${name}</a></p>`;
  }

  return `<p><a href="${asset.publicPath}" target="_blank" rel="noopener noreferrer">Open media</a></p>`;
}

async function renderTable(block) {
  const tableMeta = block.table || {};
  const rows = await listAllBlockChildren(block.id);
  const tableRows = rows.filter((row) => row.type === 'table_row');
  if (!tableRows.length) return '';

  const hasColumnHeader = tableMeta.has_column_header === true;
  const hasRowHeader = tableMeta.has_row_header === true;

  const renderedRows = tableRows
    .map((row, rowIndex) => {
      const cells = row.table_row?.cells || [];
      const renderedCells = cells
        .map((cell, cellIndex) => {
          const isHeader = (hasColumnHeader && rowIndex === 0) || (hasRowHeader && cellIndex === 0);
          const tag = isHeader ? 'th' : 'td';
          return `<${tag}>${renderRichText(cell || [])}</${tag}>`;
        })
        .join('');
      return `<tr>${renderedCells}</tr>`;
    })
    .join('');

  return `<div class="blog-table-wrap"><table><tbody>${renderedRows}</tbody></table></div>`;
}

async function renderBlock(block) {
  switch (block.type) {
    case 'paragraph':
      return renderParagraph(block);
    case 'heading_1':
    case 'heading_2':
    case 'heading_3':
      return renderHeading(block, block.type);
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return renderListItem(block);
    case 'quote':
      return renderQuote(block);
    case 'code':
      return renderCode(block);
    case 'callout':
      return renderCallout(block);
    case 'to_do':
      return renderToDo(block);
    case 'toggle':
      return renderToggle(block);
    case 'divider':
      return renderDivider();
    case 'image':
      return renderImage(block);
    case 'table':
      return renderTable(block);
    case 'bookmark':
      return renderBookmark(block);
    case 'embed':
      return renderEmbed(block);
    case 'link_preview':
      return renderLinkPreview(block);
    case 'child_page':
      return renderChildPage(block);
    case 'child_database':
      return renderChildDatabase(block);
    case 'equation':
      return renderEquation(block);
    case 'table_of_contents':
      return renderTableOfContents(block);
    case 'file':
    case 'pdf':
    case 'video':
    case 'audio':
      return renderFileLike(block, block.type);
    case 'column_list':
    case 'column':
    case 'synced_block':
      return '';
    case 'unsupported':
      return renderUnsupported(block);
    default:
      return renderUnsupported(block);
  }
}

async function renderBlocks(blocks, depth = 0) {
  let html = '';
  let listBuffer = [];
  let listType = null;

  const flushList = () => {
    if (!listBuffer.length) return;
    const tag = listType === 'numbered_list_item' ? 'ol' : 'ul';
    html += `<${tag}>${listBuffer.join('')}</${tag}>`;
    listBuffer = [];
    listType = null;
  };

  for (const block of blocks) {
    if (block.type === 'bulleted_list_item' || block.type === 'numbered_list_item') {
      if (listType && listType !== block.type) {
        flushList();
      }
      listType = block.type;
      const item = renderListItem(block);
      if (item) {
        listBuffer.push(item);
      }

      if (block.has_children && depth < MAX_BLOCK_DEPTH) {
        const children = await listAllBlockChildren(block.id);
        if (children.length) {
          const childHtml = await renderBlocks(children, depth + 1);
          const lastIndex = listBuffer.length - 1;
          if (lastIndex >= 0) {
            listBuffer[lastIndex] = `${listBuffer[lastIndex].replace('</li>', '')}${childHtml}</li>`;
          }
        }
      }
      continue;
    }

    flushList();

    const shouldFetchChildren = block.has_children && depth < MAX_BLOCK_DEPTH && block.type !== 'table';
    let childHtml = '';
    if (shouldFetchChildren) {
      const children = await listAllBlockChildren(block.id);
      if (children.length) {
        childHtml = await renderBlocks(children, depth + 1);
      }
    }

    let blockHtml = '';
    if (block.type === 'toggle') {
      blockHtml = renderToggle(block, childHtml);
    } else if (block.type === 'to_do') {
      blockHtml = renderToDo(block, childHtml);
    } else if (block.type === 'synced_block') {
      blockHtml = childHtml ? `<div class="blog-synced-block">${childHtml}</div>` : '';
    } else if (block.type === 'column_list') {
      blockHtml = childHtml ? `<div class="blog-columns">${childHtml}</div>` : '';
    } else if (block.type === 'column') {
      blockHtml = `<div class="blog-column">${childHtml}</div>`;
    } else if (
      (block.type === 'heading_1' || block.type === 'heading_2' || block.type === 'heading_3') &&
      block[block.type]?.is_toggleable
    ) {
      blockHtml = renderHeadingToggle(block, childHtml);
    } else {
      blockHtml = await renderBlock(block);
      if (childHtml) {
        blockHtml += childHtml;
      }
    }

    html += blockHtml;
  }

  flushList();
  return html;
}

async function sync() {
  await fs.mkdir(POSTS_DIR, { recursive: true });
  await fs.mkdir(ASSETS_DIR, { recursive: true });

  const pages = await fetchAllPages(NOTION_DATABASE_ID);

  const index = [];
  const usedSlugs = new Set();
  const slugCounts = new Map();

  for (const page of pages) {
    const properties = page.properties || {};
    const title = getTitle(properties[PROPERTY_NAMES.title]);
    if (!title) continue;

    const description = getRichText(properties[PROPERTY_NAMES.description]);
    const publishedDate = getDate(properties[PROPERTY_NAMES.publishedDate]);
    const tags = getTags(properties[PROPERTY_NAMES.tags]);
    const published = getCheckbox(properties[PROPERTY_NAMES.published]);

    if (!published) continue;

    let slugBase = extractDateDigits(publishedDate);
    if (!slugBase) {
      slugBase = extractDigits(page.id);
    }
    if (!slugBase) {
      slugBase = String(index.length + 1).padStart(4, '0');
    }

    const count = (slugCounts.get(slugBase) || 0) + 1;
    slugCounts.set(slugBase, count);
    let uniqueSlug = `${slugBase}${String(count).padStart(2, '0')}`;
    while (usedSlugs.has(uniqueSlug)) {
      const nextCount = slugCounts.get(slugBase) + 1;
      slugCounts.set(slugBase, nextCount);
      uniqueSlug = `${slugBase}${String(nextCount).padStart(2, '0')}`;
    }
    usedSlugs.add(uniqueSlug);

    const blocks = await listAllBlockChildren(page.id);
    const html = await renderBlocks(blocks);

    const post = {
      id: page.id,
      slug: uniqueSlug,
      title,
      description,
      publishedDate,
      tags,
      html
    };

    index.push({
      id: page.id,
      slug: uniqueSlug,
      title,
      description,
      publishedDate,
      tags
    });

    const postPath = path.join(POSTS_DIR, `${uniqueSlug}.json`);
    await fs.writeFile(postPath, JSON.stringify(post, null, 2), 'utf-8');
  }

  await fs.writeFile(path.join(OUTPUT_DIR, 'index.json'), JSON.stringify(index, null, 2), 'utf-8');

  console.log(`Synced ${index.length} posts.`);
}

sync().catch((error) => {
  console.error('Sync failed', error);
  process.exit(1);
});
