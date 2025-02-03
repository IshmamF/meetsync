import { test, expect } from '@playwright/test';

test('page loads after deployment', async ({ page }) => {
  await page.goto('http://localhost:3000');

  expect(page.url()).toBe('http://localhost:3000/');
});
