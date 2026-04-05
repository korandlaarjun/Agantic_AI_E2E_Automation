import type { Page, Locator } from '@playwright/test';

export class NopCommerceLoginPage {
  readonly page: Page;
  readonly email: Locator;
  readonly password: Locator;
  readonly rememberMe: Locator;
  readonly loginButton: Locator;
  readonly forgotPasswordLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.email = page.getByLabel('Email:');
    this.password = page.getByLabel('Password:');
    this.rememberMe = page.getByLabel('Remember me?');
    this.loginButton = page.getByRole('button', { name: /log in/i });
    this.forgotPasswordLink = page.getByRole('link', { name: /forgot password\?/i });
  }

  async goto() {
    await this.page.goto('https://demo.nopcommerce.com/login?returnUrl=%2F');
  }

  async login(email: string, passwordValue: string, rememberMe = false) {
    await this.email.fill(email);
    await this.password.fill(passwordValue);
    if (rememberMe) await this.rememberMe.check();
    await this.loginButton.scrollIntoViewIfNeeded();
    await this.loginButton.click();
  }

  async expectLoginError(message: string) {
    await this.page.getByText(message).scrollIntoViewIfNeeded();
    await this.page.getByText(message).isVisible();
  }
}
