import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly headerTitle: Locator;
  readonly menuButton: Locator;
  readonly closeMenuButton: Locator;
  readonly cartLink: Locator;
  readonly sortContainer: Locator;
  readonly inventoryContainer: Locator;
  readonly footer: Locator;

  // Lokátory pre bočné menu
  readonly sidebarInventory: Locator;
  readonly sidebarAbout: Locator;
  readonly sidebarLogout: Locator;
  readonly sidebarReset: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerTitle = page.getByText('Swag Labs');
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.closeMenuButton = page.getByRole('button', { name: 'Close Menu' });
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.sortContainer = page.locator('[data-test="product-sort-container"]');
    this.inventoryContainer = page.locator('[data-test="inventory-container"]');
    this.footer = page.locator('[data-test="footer"]');

    this.sidebarInventory = page.locator('[data-test="inventory-sidebar-link"]');
    this.sidebarAbout = page.locator('[data-test="about-sidebar-link"]');
    this.sidebarLogout = page.locator('[data-test="logout-sidebar-link"]');
    this.sidebarReset = page.locator('[data-test="reset-sidebar-link"]');
  }

  async openMenu() {
    await this.menuButton.click();
  }

  async closeMenu() {
    await this.closeMenuButton.click();
  }

  async addToCart(productNameSlug: string) {
    await this.page.locator(`[data-test="add-to-cart-${productNameSlug}"]`).click();
  }
}