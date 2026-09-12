import { expect } from '@playwright/test';

export class RegisterPage {
  constructor(page) {
    this.page = page;
    this.maleRadio = page.getByRole('radio', { name: 'Male', exact: true });
    this.firstName = page.getByRole('textbox', { name: 'First name:' });
    this.lastName = page.getByRole('textbox', { name: 'Last name:' });
    this.email = page.getByRole('textbox', { name: 'Email:' });
    this.password = page.getByRole('textbox', { name: 'Password:', exact: true });
    this.confirmPassword = page.getByRole('textbox', { name: 'Confirm password:' });
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.registrationResult = page.locator('.result');
  }

  async goto() {
    await this.page.goto('/register');
  }

  async register(user) {
    await this.maleRadio.check();
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.email.fill(user.email);
    await this.password.fill(user.password);
    await this.confirmPassword.fill(user.password);
    await this.registerButton.click();
  }

  async expectRegistrationSuccess() {
    await expect(this.registrationResult).toContainText('Your registration completed');
  }

  async continue() {
    await this.continueButton.click();
  }
}