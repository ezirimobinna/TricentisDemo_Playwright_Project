import { expect } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.registerLink = page.getByRole('link', { name: 'Register' });
    this.loginLink = page.getByRole('link', { name: 'Log in' });
    this.logoutLink = page.getByRole('link', { name: 'Log out' });
    this.booksLink = page.getByRole('link', { name: 'Books' }).first();
  }

  async goto() {
    await this.page.goto('/');
  }

  async openRegistration() {
    await this.registerLink.click();
  }

  async openLogin() {
    await this.loginLink.click();
  }

  async openBooks() {
    await this.booksLink.click();
  }

  async logout() {
    await this.logoutLink.click();
  }

  async expectLoggedIn() {
    await expect(this.logoutLink).toBeVisible();
  }

  async expectLoggedOut() {
    await expect(this.loginLink).toBeVisible();
  }
}