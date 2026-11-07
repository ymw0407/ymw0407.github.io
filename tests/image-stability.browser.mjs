// Run with PLAYWRIGHT_MODULE pointing to an installed Playwright package and a running site.
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE || 'playwright');
const origin = process.argv[2] || 'http://127.0.0.1:5173';
const browser = await chromium.launch();
const errors = [];

async function loadedImage(page, selector) {
  const image = page.locator(selector);
  await image.scrollIntoViewIfNeeded();
  await image.evaluate(image => image.decode());
  await page.waitForFunction(selector => document.querySelector(selector)?.parentElement.dataset.imageState === 'loaded', selector);
  return image.elementHandle();
}

async function assertRetained(image) {
  assert.equal(await image.evaluate(image => image.isConnected), true, 'Loaded image must retain its DOM node');
  assert.equal(await image.evaluate(image => image.parentElement.dataset.imageState), 'loaded');
  assert.equal(await image.evaluate(image => getComputedStyle(image).opacity), '1');
}

try {
  for (const width of [390, 1280]) {
    const page = await browser.newPage({ locale: 'ko-KR', viewport: { width, height: 900 } });
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(origin + '/posts/2026-11-07-smoked-rye-oolong');
    const image = await loadedImage(page, 'article img');
    const imageTop = await image.evaluate(image => image.getBoundingClientRect().top + scrollY);
    for (const top of [imageTop + 200, imageTop - 100, imageTop + 400, 0, imageTop]) {
      await page.evaluate(async top => {
        scrollTo({ top, behavior: 'instant' });
        for (let i = 0; i < 4; i++) await new Promise(requestAnimationFrame);
      }, top);
      await assertRetained(image);
    }
    await image.click();
    await page.locator('img').last().evaluate(image => image.decode());
    await assertRetained(image);
    await page.locator('div:has(> [data-image-state])').last().locator('..').getByRole('button').click();
    await assertRetained(image);
    console.log('PASS scroll and lightbox:', width);
    await page.close();
  }

  const editor = await browser.newPage({ locale: 'ko-KR' });
  editor.on('pageerror', error => errors.push(error.message));
  await editor.goto(origin + '/blog');
  await editor.getByRole('button', { name: '새 포스트 작성 (.md)', exact: true }).click();
  const draft = '![Test photo | 300px](/images/posts/smoked-rye-oolong.webp)\n\nDraft text.';
  await editor.locator('textarea').fill(draft);
  const previewImage = await loadedImage(editor, 'figure img');
  await editor.locator('textarea').fill(draft + '\n\nMore text.');
  await editor.getByText('More text.', { exact: true }).waitFor();
  await assertRetained(previewImage);
  await editor.locator('textarea').fill(draft.replace('smoked-rye-oolong.webp', 'moonlight-reading-6-day-streak.png'));
  const changedImage = await loadedImage(editor, 'figure img');
  assert.equal(await changedImage.evaluate(image => image.naturalWidth), 498, 'A changed source must still load');
  await editor.close();
  console.log('PASS editing text and replacing image sources');
  assert.deepEqual(errors, []);
} finally {
  await browser.close();
}
