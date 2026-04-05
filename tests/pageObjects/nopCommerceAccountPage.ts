import { expect, type Page, type Locator } from '@playwright/test';

export class NopCommerceAccountPage {
  readonly page: Page;
  readonly myAccountLink: Locator;
  readonly orderHistoryLink: Locator;
  readonly logoutLink: Locator;
  readonly orderHistoryTable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.myAccountLink = page.getByRole('link', { name: /my account/i });
    this.orderHistoryLink = page.getByRole('link', { name: /order history/i });
    this.logoutLink = page.getByRole('link', { name: /log out/i });
    this.orderHistoryTable = page.locator('table.order-list');
  }

  async gotoMyAccount() {
    await this.myAccountLink.click();
  }

  async gotoOrderHistory() {
    if (await this.orderHistoryLink.isVisible()) {
      await this.orderHistoryLink.click();
    } else {
      await this.page.goto('https://demo.nopcommerce.com/order/history');
    }
  }

  async logout() {
    await this.logoutLink.click();
  }

  async expectOrderHistoryContains(productName: string) {
    await this.orderHistoryTable.scrollIntoViewIfNeeded();
    await this.orderHistoryTable.isVisible();
    await this.page.getByText(productName).scrollIntoViewIfNeeded();
    await expect(this.page.getByText(productName)).toBeVisible();
  }
}
