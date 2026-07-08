import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { InventoryPage } from './pages/InventoryPage';
import { CartPage } from './pages/CartPage';

test.describe('Shopping Cart Management', () => {
  // Importance: The shopping cart directly drives conversions and revenue. 
  // Any bugs in item addition or removal lead to failed transactions and direct revenue loss.

  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('Execute end-to-end item addition, verification, and removal flow', async () => {
   // 1. Add multiple items to the cart
    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.addToCart('sauce-labs-fleece-jacket');
    await inventoryPage.addToCart('sauce-labs-onesie');

    // 2. Navigate to cart and assert item visibility
    await cartPage.goToCart();
    await expect(cartPage.getProductLocator('1Sauce Labs Backpackcarry.')).toBeVisible();
    await expect(cartPage.getProductLocator('1Sauce Labs Fleece JacketIt\'s')).toBeVisible();
    await expect(cartPage.getProductLocator('1Sauce Labs OnesieRib snap')).toBeVisible();

    // 3. Remove single item and verify update
    await cartPage.removeProduct('sauce-labs-backpack');
    await expect(cartPage.getProductLocator('1Sauce Labs Backpackcarry.')).toBeHidden();

    // 4. Return to shop, remove item from list, and re-verify cart state
    await cartPage.continueShopping();
    await cartPage.removeProduct('sauce-labs-fleece-jacket');
    await cartPage.goToCart();

    await expect(cartPage.getProductLocator('1Sauce Labs Fleece JacketIt\'s')).toBeHidden();
    await expect(cartPage.getProductLocator('1Sauce Labs OnesieRib snap')).toBeVisible();

    //Clear remaining item and verify empty cart state
    await cartPage.removeProduct('sauce-labs-onesie');
    await expect(cartPage.getProductLocator('1Sauce Labs OnesieRib snap')).toBeHidden();
  });
});