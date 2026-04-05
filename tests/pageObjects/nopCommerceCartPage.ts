import type { Page, Locator } from '@playwright/test';

export class NopCommerceCartPage {
  readonly page: Page;
  readonly termsOfService: Locator;
  readonly checkoutButton: Locator;
  readonly cartTable: Locator;
  readonly updateCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.termsOfService = page.locator('input#termsofservice');
    this.checkoutButton = page.getByRole('button', { name: /checkout/i });
    this.cartTable = page.locator('table.cart');
    this.updateCartButton = page.getByRole('button', { name: /update shopping cart/i });
  }

  async goto() {
    await this.page.goto('https://demo.nopcommerce.com/cart');
  }

  async acceptTermsAndCheckout() {
    if (await this.termsOfService.isVisible()) {
      await this.termsOfService.check();
    }
    await this.checkoutButton.scrollIntoViewIfNeeded();
    await this.checkoutButton.click();
  }

  async changeQuantity(productName: string, quantity: number) {
    const row = this.page.locator('tr').filter({ hasText: productName }).first();
    const qtyInput = row.locator('input[type="text"]').first();
    await qtyInput.fill(quantity.toString());
    await this.updateCartButton.click();
  }

  async expectProductVisible(productName: string) {
    await this.page.getByRole('link', { name: productName }).first().scrollIntoViewIfNeeded();
    await this.page.getByRole('link', { name: productName }).first().isVisible();
  }
}
