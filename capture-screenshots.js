import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  // Navigate to the website
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });

  // Wait for initial load
  await page.waitForTimeout(3000);

  // Take screenshots in light mode
  console.log('Capturing light mode screenshots...');

  // Homepage - Light mode
  await page.screenshot({
    path: 'screenshots/homepage-light.png',
    fullPage: true
  });

  // Scroll to different sections and capture
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({
    path: 'screenshots/hero-light.png',
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });

  // Scroll to skills section
  const skillsSection = await page.$('#skills');
  if (skillsSection) {
    await skillsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({
      path: 'screenshots/skills-light.png',
      clip: { x: 0, y: 0, width: 1440, height: 900 }
    });
  }

  // Scroll to projects section
  const projectsSection = await page.$('#projects');
  if (projectsSection) {
    await projectsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({
      path: 'screenshots/projects-light.png',
      clip: { x: 0, y: 0, width: 1440, height: 900 }
    });
  }

  // Toggle to dark mode
  console.log('Switching to dark mode...');
  const themeToggle = await page.$('button[aria-label*="theme"], button[title*="theme"], .theme-toggle, [class*="theme"]');
  if (themeToggle) {
    await themeToggle.click();
    await page.waitForTimeout(1000);
  }

  // Take screenshots in dark mode
  console.log('Capturing dark mode screenshots...');

  // Homepage - Dark mode
  await page.screenshot({
    path: 'screenshots/homepage-dark.png',
    fullPage: true
  });

  // Scroll to different sections and capture in dark mode
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({
    path: 'screenshots/hero-dark.png',
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });

  // Skills section - Dark mode
  if (skillsSection) {
    await skillsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({
      path: 'screenshots/skills-dark.png',
      clip: { x: 0, y: 0, width: 1440, height: 900 }
    });
  }

  // Projects section - Dark mode
  if (projectsSection) {
    await projectsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({
      path: 'screenshots/projects-dark.png',
      clip: { x: 0, y: 0, width: 1440, height: 900 }
    });
  }

  // Mobile viewport
  console.log('Capturing mobile screenshots...');
  await page.setViewportSize({ width: 375, height: 812 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({
    path: 'screenshots/mobile-light.png',
    fullPage: true
  });

  await browser.close();
  console.log('Screenshots captured successfully!');
})();