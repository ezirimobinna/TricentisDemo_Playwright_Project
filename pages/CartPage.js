import { expect } from '@playwright/test';

export class CartPage {
  constructor(page) {
    this.page = page;
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.terms = page.locator('#termsofservice');
    this.cartRows = page.locator('.cart-item-row');
  }

  async goto() {
    await this.page.goto('/cart');
  }

  async expectItemCount(count) {
    await expect(this.cartRows).toHaveCount(count);
  }

  async acceptTerms() {
    await this.terms.check();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}