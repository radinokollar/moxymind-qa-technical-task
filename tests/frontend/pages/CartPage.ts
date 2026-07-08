import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly continueShoppingButton: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  getProductLocator(text: string): Locator {
    return this.page.getByText(text);
  }

  async removeProduct(productNameSlug: string) {
    await this.page.locator(`[data-test="remove-${productNameSlug}"]`).click();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }
}