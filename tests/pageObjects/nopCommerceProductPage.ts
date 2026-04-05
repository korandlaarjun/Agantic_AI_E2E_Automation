import { expect, type Page, type Locator } from '@playwright/test';

export class NopCommerceProductPage {
  readonly page: Page;
  readonly productTitle: Locator;
  readonly processorDropdown: Locator;
  readonly ramDropdown: Locator;
  readonly hddOptions: Locator;
  readonly osOptions: Locator;
  readonly softwareCheckboxes: Locator;
  readonly addToCartButton: Locator;
  readonly cartNotification: Locator;
  readonly priceValue: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productTitle = page.locator('h1');
    this.processorDropdown = page.getByLabel('Processor *');
    this.ramDropdown = page.getByLabel('RAM *');
    this.hddOptions = page.locator('input[type="radio"]');
    this.osOptions = page.locator('input[type="radio"]');
    this.softwareCheckboxes = page.locator('input[type="checkbox"]');
    this.addToCartButton = page.getByRole('button', { name: /add to cart/i });
    this.cartNotification = page.locator('div').filter({ hasText: /The product has been added to your shopping cart/i });
    this.priceValue = page.locator('.product-price, span.price-value-1, span.price-value-2, span.price-value-3');
  }

  async goto() {
    await this.page.goto('https://demo.nopcommerce.com/build-your-own-computer');
  }

  async chooseProcessor(option: string) {
    await this.processorDropdown.selectOption({ label: option });
  }

  async chooseRam(option: string) {
    await this.ramDropdown.selectOption({ label: option });
  }

  async chooseHdd(optionLabel: string) {
    const option = this.page.getByLabel(optionLabel);
    await option.scrollIntoViewIfNeeded();
    await option.check();
  }

  async chooseOs(optionLabel: string) {
    const option = this.page.getByLabel(optionLabel);
    await option.scrollIntoViewIfNeeded();
    await option.check();
  }

  async chooseSoftware(optionLabel: string) {
    const option = this.page.getByLabel(optionLabel);
    await option.scrollIntoViewIfNeeded();
    await option.check();
  }

  async addToCart() {
    await this.addToCartButton.scrollIntoViewIfNeeded();
    await this.addToCartButton.click();
  }

  async expectAddedToCart() {
    await expect(this.cartNotification).toBeVisible({ timeout: 10000 });
  }

  async getPriceText() {
    return this.priceValue.textContent();
  }
}
