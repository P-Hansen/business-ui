import { test, expect } from '@playwright/test';

test('Submit delay request via the File Now button', async ({ page }) => {
  await page.goto('/dissolution');
  await page.fill('[name="delayPeriod"]', '6 months'); // adjust selectors
  await page.check('[name="certify"]');

  const fileNowButton = page.getByRole('button', { name: 'File Now' });
  await expect(fileNowButton).toBeVisible();
  await fileNowButton.click();
  await expect(page.locator('text=Your delay request has been submitted')).toBeVisible();
});
