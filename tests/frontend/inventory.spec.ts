import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { InventoryPage } from './pages/InventoryPage';

test.describe('Inventory and Navigation', () => {
  // Importance: Broken storefront elements or non-responsive navigation directly prevent users from browsing products, rendering the application unusable.
  
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('Verify presence of key storefront layout elements', async () => {
    await expect(inventoryPage.headerTitle).toBeVisible();
    await expect(inventoryPage.menuButton).toBeVisible();
    await expect(inventoryPage.cartLink).toBeVisible();
    await expect(inventoryPage.sortContainer).toBeVisible();
    await expect(inventoryPage.inventoryContainer).toBeVisible();
    await expect(inventoryPage.footer).toBeVisible();
  });

  test('Verify sidebar navigation expansion and collapse behavior', async () => {
// Menu links should be hidden initially
    await expect(inventoryPage.sidebarInventory).toBeHidden();
    await expect(inventoryPage.sidebarAbout).toBeHidden();
    await expect(inventoryPage.sidebarLogout).toBeHidden();
    await expect(inventoryPage.sidebarReset).toBeHidden();

    // Open menu
    await inventoryPage.openMenu();
    await expect(inventoryPage.sidebarInventory).toBeVisible();
    await expect(inventoryPage.sidebarAbout).toBeVisible();
    await expect(inventoryPage.sidebarLogout).toBeVisible();
    await expect(inventoryPage.sidebarReset).toBeVisible();

    // Close menu
    await inventoryPage.closeMenu();
    await expect(inventoryPage.sidebarInventory).toBeHidden();
    await expect(inventoryPage.sidebarAbout).toBeHidden();
    await expect(inventoryPage.sidebarLogout).toBeHidden();
    await expect(inventoryPage.sidebarReset).toBeHidden();
  });
});