import type { Page, Locator } from '@playwright/test';

export class NopCommerceHomePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly cartLink: Locator;
  readonly loginLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('input[id="small-searchterms"]');
    this.searchButton = page.locator('button[type="submit"]');
    this.cartLink = page.getByRole('link', { name: /shopping cart/i });
    this.loginLink = page.getByRole('link', { name: /log in/i });
  }

  async goto() {
    await this.page.goto('https://demo.nopcommerce.com/');
  }

  async search(term: string) {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  async openCategory(categoryName: string) {
    await this.page.getByRole('link', { name: categoryName }).first().click();
  }

  async openProduct(productName: string) {
    await this.page.getByRole('link', { name: productName }).first().click();
  }

  async addProductToCart(productName: string) {
    const productCard = this.page.locator('article.product-item').filter({ hasText: productName });
    await productCard.getByRole('button', { name: /add to cart/i }).first().click();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async openLoginPage() {
    await this.loginLink.click();
  }
}
