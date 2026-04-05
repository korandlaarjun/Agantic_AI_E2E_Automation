import { test, expect } from '@playwright/test';
import { NopCommerceHomePage } from './pageObjects/nopCommerceHomePage';

const baseUrl = 'https://demo.nopcommerce.com/';

test.describe('nopCommerce demo store', () => {
  test.beforeEach(async ({ page }) => {
    const home = new NopCommerceHomePage(page);
    await home.goto();
  });

  test('homepage loads and displays featured products', async ({ page }) => {
    await expect(page).toHaveURL(baseUrl);
    await expect(page.getByText(/welcome to our store/i)).toBeVisible();
    await expect(page.getByRole('link', { name: 'Electronics' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Apparel' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Digital downloads' })).toBeVisible();
  });

  test('search returns relevant product results', async ({ page }) => {
    const home = new NopCommerceHomePage(page);
    await home.search('computer');
    await page.waitForTimeout(2000);
    await expect(page).toHaveURL(/search/);
    await expect(page.getByRole('link', { name: /build your own computer/i })).toBeVisible();
  });

  test('category navigation opens electronics page', async ({ page }) => {
    const home = new NopCommerceHomePage(page);
    await home.openCategory('Electronics');
    await page.waitForTimeout(2000);
    await expect(page).toHaveURL(/electronics/);
    await expect(page.locator('body')).toContainText(/electronics/i);
  });

  test('add featured product to cart and verify cart page', async ({ page }) => {
    const home = new NopCommerceHomePage(page);
    const productName = 'Build your own computer';

    await home.addProductToCart(productName);
    await expect(page.getByText(/The product has been added to your shopping cart/i)).toBeVisible({ timeout: 10000 });

    await home.goToCart();
    await expect(page).toHaveURL(/cart/);
    await expect(page.locator('h1')).toContainText(/shopping cart/i);
    await expect(page.getByRole('link', { name: productName })).toBeVisible();
  });

  test('login page is accessible from header', async ({ page }) => {
    const home = new NopCommerceHomePage(page);
    await home.openLoginPage();

    await expect(page).toHaveURL(/login/);
    await expect(page.getByRole('heading', { name: /welcome, please sign in!/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /register/i })).toBeVisible();
  });
});
