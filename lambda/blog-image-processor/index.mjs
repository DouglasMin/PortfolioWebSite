import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';

const s3 = new S3Client({});

const ORIGINAL_BUCKET = process.env.ORIGINAL_BUCKET;
const PROCESSED_BUCKET = process.env.PROCESSED_BUCKET;
const TARGET_WIDTHS = (process.env.TARGET_WIDTHS || '640')
  .split(',')
  .map((v) => Number(v.trim()))
  .filter((v) => Number.isFinite(v) && v > 0)
  .sort((a, b) => a - b);

function decodeS3Key(key) {
  return decodeURIComponent((key || '').replace(/\+/g, ' '));
}

async function streamToBuffer(stream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

function stripExt(key) {
  return key.replace(/\.[^./]+$/, '');
}

function extFromMime(mime) {
  if (!mime) return '.bin';
  if (mime.includes('jpeg')) return '.jpg';
  if (mime.includes('png')) return '.png';
  if (mime.includes('gif')) return '.gif';
  if (mime.includes('webp')) return '.webp';
  if (mime.includes('avif')) return '.avif';
  return '.bin';
}

async function putObject({ key, body, contentType }) {
  await s3.send(
    new PutObjectCommand({
      Bucket: PROCESSED_BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType,
      CacheControl: 'public, max-age=31536000, immutable'
    })
  );
}

async function processRecord(record) {
  const sourceBucket = record?.s3?.bucket?.name;
  const sourceKey = decodeS3Key(record?.s3?.object?.key || '');

  if (!sourceBucket || !sourceKey) {
    return { skipped: true, reason: 'missing bucket or key' };
  }

  if (sourceBucket !== ORIGINAL_BUCKET) {
    return { skipped: true, reason: `unexpected source bucket: ${sourceBucket}` };
  }

  const getRes = await s3.send(
    new GetObjectCommand({
      Bucket: ORIGINAL_BUCKET,
      Key: sourceKey
    })
  );

  const contentType = String(getRes.ContentType || '');
  if (!contentType.startsWith('image/')) {
    return { skipped: true, reason: `non-image content type: ${contentType}` };
  }

  const input = await streamToBuffer(getRes.Body);
  const base = sharp(input, { failOn: 'none' }).rotate();
  const metadata = await base.metadata();

  if (!metadata.width) {
    return { skipped: true, reason: 'unable to detect image width' };
  }

  const keyNoExt = stripExt(sourceKey);
  const originalExt = extFromMime(contentType);

  // Save normalized original in processed bucket for fallback.
  const normalizedOriginal = await base.toBuffer();
  await putObject({
    key: `${keyNoExt}/original${originalExt}`,
    body: normalizedOriginal,
    contentType
  });

  const generated = [];

  for (const width of TARGET_WIDTHS) {
    const resizedWebp = await sharp(input, { failOn: 'none' })
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer();

    const variantKey = `${keyNoExt}/w${width}.webp`;

    await putObject({
      key: variantKey,
      body: resizedWebp,
      contentType: 'image/webp'
    });

    generated.push(variantKey);
  }

  const manifest = {
    sourceBucket: ORIGINAL_BUCKET,
    sourceKey,
    processedBucket: PROCESSED_BUCKET,
    generated,
    original: `${keyNoExt}/original${originalExt}`,
    width: metadata.width,
    height: metadata.height,
    generatedAt: new Date().toISOString()
  };

  await putObject({
    key: `${keyNoExt}/manifest.json`,
    body: Buffer.from(JSON.stringify(manifest, null, 2)),
    contentType: 'application/json'
  });

  return {
    skipped: false,
    sourceKey,
    generatedCount: generated.length
  };
}

export const handler = async (event) => {
  if (!ORIGINAL_BUCKET || !PROCESSED_BUCKET) {
    throw new Error('ORIGINAL_BUCKET and PROCESSED_BUCKET are required');
  }

  const records = event?.Records || [];
  const results = [];

  for (const record of records) {
    try {
      const result = await processRecord(record);
      results.push(result);
    } catch (error) {
      console.error('Failed processing record', {
        error: error?.message,
        record
      });
      results.push({
        skipped: true,
        reason: error?.message || 'unknown error'
      });
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      processed: results.filter((r) => !r.skipped).length,
      skipped: results.filter((r) => r.skipped).length,
      results
    })
  };
};
