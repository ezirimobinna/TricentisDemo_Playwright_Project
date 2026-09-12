import { expect } from '@playwright/test';

export class ListingPage {
  constructor(page) {
    this.page = page;

    this.computingAndInternet = page.getByRole('link', {
      name: 'Computing and Internet',
      exact: true
    });

    this.addToCartButtons = page.getByRole('button', {
      name: 'Add to cart'
    });

    this.shoppingCartLink = page.getByRole('link', {
      name: /Shopping cart \(1\)/
    });
  }

  async goto() {
    await this.page.goto('/books');
  }

  async expectBooksListing() {
    await expect(this.computingAndInternet).toBeVisible();
  }

  async addFirstProductToCart() {
    await this.addToCartButtons.first().click();

    await expect(this.shoppingCartLink).toBeVisible();
  }
}