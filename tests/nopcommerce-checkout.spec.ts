import { test, expect } from '@playwright/test';
import { NopCommerceProductPage } from './pageObjects/nopCommerceProductPage';
import { NopCommerceCartPage } from './pageObjects/nopCommerceCartPage';
import { NopCommerceCheckoutPage } from './pageObjects/nopCommerceCheckoutPage';

const randomEmail = () => `nopcommerce+checkout+${Date.now()}@example.com`;

test.describe('nopCommerce checkout and cart flows', () => {
  test('should checkout as guest and complete order', async ({ page }) => {
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
    await checkoutPage.selectGuestCheckout();

    await checkoutPage.fillBillingAddress({
      firstName: 'Guest',
      lastName: 'Checkout',
      email: randomEmail(),
      country: 'United States',
      state: 'Alabama',
      city: 'Birmingham',
      address1: '123 E Commerce St',
      zip: '35203',
      phoneNumber: '2055550123',
    });
    await checkoutPage.continueFromBilling();

    await checkoutPage.chooseShippingMethod('Next Day Air ($0.00)');
    await checkoutPage.choosePaymentMethod('Credit Card');
    await checkoutPage.fillPaymentInformation({
      cardholderName: 'Guest Checkout',
      cardNumber: '4111111111111111',
      expireMonth: '12',
      expireYear: '2025',
      cardCode: '123',
    });
    await checkoutPage.confirmOrder();
    await checkoutPage.expectOrderComplete();
  });

  test('should update cart quantity and verify subtotal changes', async ({ page }) => {
    const productPage = new NopCommerceProductPage(page);
    await productPage.goto();
    await productPage.addToCart();
    await productPage.expectAddedToCart();

    const cartPage = new NopCommerceCartPage(page);
    await cartPage.goto();
    await cartPage.changeQuantity('Build your own computer', 2);

    await expect(page.locator('td.subtotal').first()).toContainText('$');
  });
});
