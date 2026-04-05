import { expect, type Page, type Locator } from '@playwright/test';

export class NopCommerceRegistrationPage {
  readonly page: Page;
  readonly genderMale: Locator;
  readonly genderFemale: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly company: Locator;
  readonly newsletter: Locator;
  readonly password: Locator;
  readonly confirmPassword: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.genderMale = page.getByLabel('Male');
    this.genderFemale = page.getByLabel('Female');
    this.firstName = page.getByLabel('First name:');
    this.lastName = page.getByLabel('Last name:');
    this.email = page.getByLabel('Email:');
    this.company = page.getByLabel('Company name:');
    this.newsletter = page.getByLabel('Newsletter');
    this.password = page.getByLabel('Password:');
    this.confirmPassword = page.getByLabel('Confirm password:');
    this.registerButton = page.getByRole('button', { name: /register/i });
  }

  async goto() {
    await this.page.goto('https://demo.nopcommerce.com/register?returnUrl=%2F');
  }

  async chooseGender(gender: 'male' | 'female' = 'male') {
    const value = gender === 'male' ? 'M' : 'F';
    await this.page.locator(`input[name="Gender"][value="${value}"]`).check();
  }

  async fillPersonalDetails({ firstName, lastName, email, company, subscribe }:
    { firstName: string; lastName: string; email: string; company?: string; subscribe?: boolean }) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.email.fill(email);
    if (company) await this.company.fill(company);
    if (subscribe) await this.page.locator('input[type="checkbox"][id^="NewsLetterSubscriptions"]').first().check();
  }

  async fillPassword(passwordValue: string) {
    await this.password.fill(passwordValue);
    await this.confirmPassword.fill(passwordValue);
  }

  async submit() {
    await this.registerButton.scrollIntoViewIfNeeded();
    await this.registerButton.click();
  }

  async expectSuccess() {
    await this.page.waitForURL(/registerresult/);
    await this.page.getByText('Your registration completed').scrollIntoViewIfNeeded();
    await this.page.getByText('Your registration completed').isVisible();
  }

  async expectError(message: string) {
    await expect(this.page.getByText(message)).toBeVisible();
  }
}
