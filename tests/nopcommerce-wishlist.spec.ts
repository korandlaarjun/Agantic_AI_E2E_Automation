import { test, expect } from '@playwright/test';
import { NopCommerceRegistrationPage } from './pageObjects/nopCommerceRegistrationPage';
import { NopCommerceLoginPage } from './pageObjects/nopCommerceLoginPage';

const randomEmail = () => `nopcommerce+wishlist+${Date.now()}@example.com`;
const password = 'P@ssword123!';

test.describe('nopCommerce wishlist and compare flows', () => {
  test('registered user can add product to wishlist', async ({ page }) => {
    const registerPage = new NopCommerceRegistrationPage(page);
    await registerPage.goto();
    await registerPage.chooseGender('female');
    await registerPage.fillPersonalDetails({
      firstName: 'Wishlist',
      lastName: 'User',
      email: randomEmail(),
      company: 'Wishlist Co',
      subscribe: true,
    });
    await registerPage.fillPassword(password);
    await registerPage.submit();
    await expect(page.getByText('Your registration completed')).toBeVisible({ timeout: 15000 });

    await page.goto('https://demo.nopcommerce.com/build-your-own-computer');
    await page.getByRole('button', { name: /add to wishlist/i }).click();
    await expect(page.getByText(/The product has been added to your wishlist/i)).toBeVisible({ timeout: 10000 });

    await page.goto('https://demo.nopcommerce.com/wishlist');
    await expect(page.getByRole('link', { name: /Build your own computer/i })).toBeVisible();
  });

  test('visitor can add products to compare list and open compare page', async ({ page }) => {
    await page.goto('https://demo.nopcommerce.com/build-your-own-computer');
    await page.getByRole('button', { name: /add to compare list/i }).click();
    await page.waitForTimeout(1500);

    await page.goto('https://demo.nopcommerce.com/compareproducts');
    await expect(page.getByText(/product comparison/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /Build your own computer/i })).toBeVisible();
  });
});
