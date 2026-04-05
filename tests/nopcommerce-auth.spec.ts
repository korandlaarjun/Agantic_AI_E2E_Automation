import { test, expect } from '@playwright/test';
import { NopCommerceRegistrationPage } from './pageObjects/nopCommerceRegistrationPage';
import { NopCommerceLoginPage } from './pageObjects/nopCommerceLoginPage';

const randomEmail = () => `nopcommerce+${Date.now()}@example.com`;
const password = 'P@ssword123!';

test.describe('nopCommerce user registration and login flows', () => {
  test('should register a new user successfully', async ({ page }) => {
    const registerPage = new NopCommerceRegistrationPage(page);
    await registerPage.goto();

    await registerPage.chooseGender('female');
    await registerPage.fillPersonalDetails({
      firstName: 'Test',
      lastName: 'User',
      email: randomEmail(),
      company: 'Test Company',
      subscribe: true,
    });
    await registerPage.fillPassword(password);
    await registerPage.submit();

    await expect(page.getByText('Your registration completed')).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole('link', { name: /continue/i })).toBeVisible();
  });

  test('should login with valid registered credentials', async ({ page }) => {
    const email = randomEmail();
    const registerPage = new NopCommerceRegistrationPage(page);
    await registerPage.goto();
    await registerPage.chooseGender('male');
    await registerPage.fillPersonalDetails({
      firstName: 'Login',
      lastName: 'User',
      email,
      company: 'Login Company',
    });
    await registerPage.fillPassword(password);
    await registerPage.submit();
    await expect(page.getByText('Your registration completed')).toBeVisible({ timeout: 15000 });

    const loginPage = new NopCommerceLoginPage(page);
    await loginPage.goto();
    await loginPage.login(email, password, true);

    await expect(page.getByRole('link', { name: /log out/i })).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole('link', { name: /my account/i })).toBeVisible();
  });

  test('should show error for invalid login credentials', async ({ page }) => {
    const loginPage = new NopCommerceLoginPage(page);
    await loginPage.goto();
    await loginPage.login('invalid@example.com', 'WrongPassword!');

    await expect(page.getByText(/login was unsuccessful/i)).toBeVisible();
    await expect(page.getByText(/no customer account found/i)).toBeVisible();
  });
});
