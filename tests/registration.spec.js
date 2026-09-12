import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage.js';
import { createUniqueUser } from '../utils/testData.js';

test.describe(
  'Registration @registration @authorization @smoke',
  () => {
    test('should register a new user with a unique email', async ({ page }) => {
      const register = new RegisterPage(page);
      const user = createUniqueUser();

      await test.step(
        'Navigate directly to the registration page',
        async () => {
          await register.goto();
        }
      );

      await test.step(
        'Complete sign up with a unique email address',
        async () => {
          await register.register(user);
        }
      );

      await test.step(
        'Verify the registration was successful',
        async () => {
          await expect(
            page.getByText('Your registration completed')
          ).toBeVisible();
        }
      );

      await test.step(
        'Continue after successful registration',
        async () => {
          await register.continue();
        }
      );
    });
  }
);