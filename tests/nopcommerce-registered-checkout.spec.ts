import { test, expect } from '@playwright/test';
import { NopCommerceRegistrationPage } from './pageObjects/nopCommerceRegistrationPage';
import { NopCommerceProductPage } from './pageObjects/nopCommerceProductPage';
import { NopCommerceCartPage } from './pageObjects/nopCommerceCartPage';
import { NopCommerceCheckoutPage } from './pageObjects/nopCommerceCheckoutPage';
import { NopCommerceAccountPage } from './pageObjects/nopCommerceAccountPage';

import type { Page } from '@playwright/test';

const randomEmail = () => `nopcommerce+registered+${Date.now()}@example.com`;
const password = 'P@ssword123!';

async function registerUser(page: Page, email: string) {
  const registerPage = new NopCommerceRegistrationPage(page);
  await registerPage.goto();
  await registerPage.chooseGender('male');
  await registerPage.fillPersonalDetails({
    firstName: 'Registered',
    lastName: 'Customer',
    email,
    company: 'Registered Company',
    subscribe: true,
  });
  await registerPage.fillPassword(password);
  await registerPage.submit();
  await expect(page.getByText('Your registration completed')).toBeVisible({ timeout: 15000 });
  await expect(page.getByRole('link', { name: /continue/i })).toBeVisible();
}

test.describe('nopCommerce registered checkout and order history', () => {
  test('should register a user, checkout as registered customer, and verify order history', async ({ page }) => {
    const email = randomEmail();
    await registerUser(page, email);

    const productPage = new NopCommerceProductPage(page);
    await productPage.goto();
    await productPage.chooseProcessor('2.2 GHz Intel Pentium Dual-Core E2200');
    await productPage.chooseRam('8GB [+$60.00]');
    await productPage.chooseHdd('400 GB [+$100.00]');
    await productPage.chooseOs('Vista Premium [+$60.00]');
    await productPage.chooseSoftware('Microsoft Office [+$50.00]');
    await productPage.chooseSoftware('Total Commander [+$5.00]');
    await productPage.addToCart();
    await productPage.expectAddedToCart();

    const cartPage = new NopCommerceCartPage(page);
    await cartPage.goto();
    await cartPage.expectProductVisible('Build your own computer');
    await cartPage.acceptTermsAndCheckout();

    const checkoutPage = new NopCommerceCheckoutPage(page);
    await checkoutPage.fillBillingAddress({
      firstName: 'Registered',
      lastName: 'Customer',
      email,
      country: 'United States',
      state: 'Alabama',
      city: 'Birmingham',
      address1: '200 Registered Ave',
      zip: '35203',
      phoneNumber: '2055550101',
    });
    await checkoutPage.continueFromBilling();

    await checkoutPage.chooseShippingMethod('Next Day Air ($0.00)');
    await checkoutPage.choosePaymentMethod('Credit Card');
    await checkoutPage.fillPaymentInformation({
      cardholderName: 'Registered Customer',
      cardNumber: '4111111111111111',
      expireMonth: '12',
      expireYear: '2025',
      cardCode: '123',
    });
    await checkoutPage.confirmOrder();
    await checkoutPage.expectOrderComplete();

    const accountPage = new NopCommerceAccountPage(page);
    await accountPage.gotoOrderHistory();
    await accountPage.expectOrderHistoryContains('Build your own computer');
  });
});
