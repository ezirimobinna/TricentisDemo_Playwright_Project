import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

test.describe('Login @login @authorization @smoke', () => {
  test('should login with valid credentials', async ({ page }) => {
    test.skip(
      !process.env.TEST_USER_EMAIL ||
      !process.env.TEST_USER_PASSWORD,
      'Set TEST_USER_EMAIL and TEST_USER_PASSWORD.'
    );

    const login = new LoginPage(page);

    await test.step('Navigate directly to the login page', async () => {
      await login.goto();
    });

    await test.step('Login with valid credentials', async () => {
      await login.login(
        process.env.TEST_USER_EMAIL,
        process.env.TEST_USER_PASSWORD
      );
    });

    await test.step('Verify the user is logged in', async () => {
      await expect(
        page.getByRole('link', {
          name: 'Log out'
        })
      ).toBeVisible();
    });
  });
});