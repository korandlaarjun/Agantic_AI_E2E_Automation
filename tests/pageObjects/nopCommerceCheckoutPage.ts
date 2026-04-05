import type { Page, Locator } from '@playwright/test';

export class NopCommerceCheckoutPage {
  readonly page: Page;
  readonly guestCheckoutButton: Locator;
  readonly billingContinue: Locator;
  readonly shippingContinue: Locator;
  readonly paymentContinue: Locator;
  readonly confirmOrderButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.guestCheckoutButton = page.getByRole('button', { name: /checkout as guest/i });
    this.billingContinue = page.locator('#billing-buttons-container button');
    this.shippingContinue = page.locator('#shipping-method-buttons-container button');
    this.paymentContinue = page.locator('#payment-method-buttons-container button');
    this.confirmOrderButton = page.locator('#confirm-order-buttons-container button');
  }

  async selectGuestCheckout() {
    if (await this.guestCheckoutButton.isVisible()) {
      await this.guestCheckoutButton.scrollIntoViewIfNeeded();
      await this.guestCheckoutButton.click();
    }
  }

  async fillBillingAddress(address: {
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    state: string;
    city: string;
    address1: string;
    zip: string;
    phoneNumber: string;
  }) {
    await this.page.getByLabel('First name:').fill(address.firstName);
    await this.page.getByLabel('Last name:').fill(address.lastName);
    await this.page.getByLabel('Email:').fill(address.email);
    await this.page.locator('select[name*="CountryId"]').selectOption({ label: address.country });
    await this.page.locator('select[name*="StateProvinceId"]').selectOption({ label: address.state });
    await this.page.getByLabel('City:').fill(address.city);
    await this.page.getByLabel('Address 1:').fill(address.address1);
    await this.page.getByLabel('Zip / postal code:').fill(address.zip);
    await this.page.getByLabel('Phone number:').fill(address.phoneNumber);
  }

  async continueFromBilling() {
    await this.billingContinue.scrollIntoViewIfNeeded();
    await this.billingContinue.click();
  }

  async chooseShippingMethod(methodLabel: string) {
    const option = this.page.getByLabel(methodLabel);
    await option.scrollIntoViewIfNeeded();
    await option.check();
    await this.shippingContinue.click();
  }

  async choosePaymentMethod(methodLabel: string) {
    const option = this.page.getByLabel(methodLabel);
    await option.scrollIntoViewIfNeeded();
    await option.check();
    await this.paymentContinue.click();
  }

  async fillPaymentInformation(payment: {
    cardholderName: string;
    cardNumber: string;
    expireMonth: string;
    expireYear: string;
    cardCode: string;
  }) {
    await this.page.locator('select[name*="CardType"]').selectOption({ label: 'Visa' });
    await this.page.getByLabel('Cardholder name:').fill(payment.cardholderName);
    await this.page.getByLabel('Card number:').fill(payment.cardNumber);
    await this.page.locator('select[name*="ExpireMonth"]').selectOption({ label: payment.expireMonth });
    await this.page.locator('select[name*="ExpireYear"]').selectOption({ label: payment.expireYear });
    await this.page.getByLabel('Card code:').fill(payment.cardCode);
    await this.confirmOrderButton.scrollIntoViewIfNeeded();
  }

  async confirmOrder() {
    await this.confirmOrderButton.click();
  }

  async expectOrderComplete() {
    await this.page.getByText(/thank you/i).scrollIntoViewIfNeeded();
    await this.page.getByText(/your order has been successfully processed!/i).isVisible();
  }
}
