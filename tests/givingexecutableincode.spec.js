const { test, expect, chromium } = require('@playwright/test');

let browser1;
let context;

test.beforeAll(async () => {
   browser1 = await chromium.launch({
    executablePath: 'C:/Users/SEDHU/Downloads/chromium-win64/chrome-win/chrome.exe' // Replace with your path
  });
  context = await browser1.newContext();
});

test.afterAll(async () => {
  await context.close();
  await browser1.close();
});

test('example test', async () => {
  const page = await context.newPage();
  await page.goto('https://example.com');
  expect(await page.title()).toBe('Example Domain');
});