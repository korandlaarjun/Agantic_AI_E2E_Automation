import { test, expect, type Locator } from '@playwright/test';
import { NopCommerceProductPage } from './pageObjects/nopCommerceProductPage';

const viewports = [
  { name: 'desktop', width: 1920, height: 1080 },
  { name: 'mobile', width: 390, height: 844 },
];

test.describe('nopCommerce Build Your Own Computer product flow', () => {
  for (const viewport of viewports) {
    test(`should load product page and add to cart on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });

      const productPage = new NopCommerceProductPage(page);
      await productPage.goto();

      await expect(productPage.productTitle).toHaveText(/build your own computer/i);
      await expect(productPage.processorDropdown).toBeVisible();
      await expect(productPage.ramDropdown).toBeVisible();
      await expect(productPage.addToCartButton).toBeVisible();

      await productPage.processorDropdown.scrollIntoViewIfNeeded();
      await productPage.processorDropdown.selectOption({ label: '2.2 GHz Intel Pentium Dual-Core E2200' });
      await productPage.ramDropdown.scrollIntoViewIfNeeded();
      await productPage.ramDropdown.selectOption({ label: '8GB [+$60.00]' });

      await productPage.chooseHdd('400 GB [+$100.00]');
      await productPage.chooseOs('Vista Premium [+$60.00]');
      await productPage.chooseSoftware('Microsoft Office [+$50.00]');
      await productPage.chooseSoftware('Total Commander [+$5.00]');

      await productPage.addToCart();
      await productPage.expectAddedToCart();
      await expect(page.getByRole('link', { name: /shopping cart/i })).toBeVisible();
    });
  }

  test('should ensure product options are accessible and responsive', async ({ page }) => {
    const productPage = new NopCommerceProductPage(page);
    await productPage.goto();

    await productPage.processorDropdown.scrollIntoViewIfNeeded();
    await expect(productPage.processorDropdown).toBeVisible();
    await productPage.ramDropdown.scrollIntoViewIfNeeded();
    await expect(productPage.ramDropdown).toBeVisible();
    await productPage.addToCartButton.scrollIntoViewIfNeeded();
    await expect(productPage.addToCartButton).toBeVisible();
  });

  test('should validate product page DOM labels and content', async ({ page }) => {
    const productPage = new NopCommerceProductPage(page);
    await productPage.goto();

    await expect(page.getByRole('heading', { name: /build your own computer/i })).toBeVisible();
    await expect(page.getByText(/SKU:/i)).toBeVisible();
    await expect(page.getByText(/Free shipping/i)).toBeVisible();
    await expect(page.locator('p')).toContainText(/Fight back against cluttered workspaces/i);

    const priceText = await productPage.getPriceText();
    await expect(priceText).toMatch(/\$[\d,]+\.\d{2}/);
  });
});
