import { test, expect } from '@playwright/test';

test('basic inventory test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.getByText('Swag Labs')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Open Menu' })).toBeVisible();
  await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
  await expect(page.locator('[data-test="product-sort-container"]')).toBeVisible();
  await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
  await expect(page.locator('[data-test="footer"]')).toBeVisible();
});

test('menu test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="inventory-sidebar-link"]')).toBeHidden;
  await expect(page.locator('[data-test="about-sidebar-link"]')).toBeHidden;
  await expect(page.locator('[data-test="logout-sidebar-link"]')).toBeHidden;
  await expect(page.locator('[data-test="reset-sidebar-link"]')).toBeHidden;
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await expect(page.locator('[data-test="inventory-sidebar-link"]')).toBeVisible();
  await expect(page.locator('[data-test="about-sidebar-link"]')).toBeVisible();
  await expect(page.locator('[data-test="logout-sidebar-link"]')).toBeVisible();
  await expect(page.locator('[data-test="reset-sidebar-link"]')).toBeVisible();
  await page.getByRole('button', { name: 'Close Menu' }).click();
  await expect(page.locator('[data-test="inventory-sidebar-link"]')).toBeHidden;
  await expect(page.locator('[data-test="about-sidebar-link"]')).toBeHidden;
  await expect(page.locator('[data-test="logout-sidebar-link"]')).toBeHidden;
  await expect(page.locator('[data-test="reset-sidebar-link"]')).toBeHidden;
});

test('Adding to cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.getByText('1Sauce Labs Backpackcarry.')).toBeVisible();
  await expect(page.getByText('1Sauce Labs Fleece JacketIt\'s')).toBeVisible();
  await expect(page.getByText('1Sauce Labs OnesieRib snap')).toBeVisible();
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  await expect(page.getByText('1Sauce Labs Backpackcarry.')).toBeHidden();
  await page.locator('[data-test="continue-shopping"]').click();
  await page.locator('[data-test="remove-sauce-labs-fleece-jacket"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.getByText('1Sauce Labs Fleece JacketIt\'s')).toBeHidden();
  await expect(page.getByText('1Sauce Labs OnesieRib snap')).toBeVisible();
  await page.locator('[data-test="remove-sauce-labs-onesie"]').click();
  await expect(page.getByText('1Sauce Labs OnesieRib snap')).toBeHidden();
});