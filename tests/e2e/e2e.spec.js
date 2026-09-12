import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../pages/RegisterPage.js';
import { LoginPage } from '../../pages/LoginPage.js';
import { ListingPage } from '../../pages/ListingPage.js';
import { CartPage } from '../../pages/CartPage.js';
import { CheckoutPage } from '../../pages/CheckoutPage.js';
import {
  createUniqueUser,
  createCheckoutData
} from '../../utils/testData.js';

test.describe(
  'Demo Web Shop E2E @e2e @smoke @authorization',
  () => {
    test('should complete Sign Up to Logout flow', async ({ page }) => {
      const user = createUniqueUser();
      const checkoutData = createCheckoutData();

      const registerPage = new RegisterPage(page);
      const loginPage = new LoginPage(page);
      const listingPage = new ListingPage(page);
      const cartPage = new CartPage(page);
      const checkoutPage = new CheckoutPage(page);

      await test.step('Navigate to the registration page', async () => {
        await registerPage.goto();
      });

      await test.step(
        'Register a new user with a unique email',
        async () => {
          await registerPage.register(user);
        }
      );

      await test.step('Verify registration is successful', async () => {
        await expect(
          page.getByText('Your registration completed')
        ).toBeVisible();
      });

      await test.step('Continue after registration', async () => {
        await registerPage.continue();
      });

      await test.step('Log out after registration', async () => {
        await page.getByRole('link', {
          name: 'Log out'
        }).click();
      });

      await test.step('Navigate to the login page', async () => {
        await loginPage.goto();
      });

      await test.step(
        'Login with the newly registered user',
        async () => {
          await loginPage.login(user.email, user.password);
        }
      );

      await test.step('Verify user is logged in', async () => {
        await expect(
          page.getByRole('link', {
            name: user.email
          })
        ).toBeVisible();

        await expect(
          page.getByRole('link', {
            name: 'Log out'
          })
        ).toBeVisible();
      });

      await test.step(
        'Navigate directly to the Books listing page',
        async () => {
          await listingPage.goto();
        }
      );

      await test.step(
        'Verify the Books listing page is displayed',
        async () => {
          await listingPage.expectBooksListing();
        }
      );

      await test.step('Add the first product to the cart', async () => {
        await listingPage.addFirstProductToCart();
      });

      await test.step('Navigate to the shopping cart', async () => {
        await cartPage.goto();
      });

      await test.step(
        'Verify one product is in the cart',
        async () => {
          await cartPage.expectItemCount(1);
        }
      );

      await test.step(
        'Accept the terms and proceed to checkout',
        async () => {
          await cartPage.acceptTerms();
          await cartPage.checkout();
        }
      );

      await test.step('Verify the checkout page', async () => {
        await checkoutPage.expectCheckoutPage();
      });

      await test.step('Fill the billing address', async () => {
        await checkoutPage.fillBillingAddress(checkoutData);
      });

      await test.step('Continue to shipping method', async () => {
        await checkoutPage.continueBilling();
      });

      await test.step('Select In-Store Pickup', async () => {
        await checkoutPage.selectInStorePickup();
      });

      await test.step('Continue to payment method', async () => {
        await checkoutPage.continueShipping();
      });

      await test.step('Continue to payment information', async () => {
        await checkoutPage.continuePayment();
      });

      await test.step('Continue to confirm order', async () => {
        await checkoutPage.continuePaymentInformation();
      });

      await test.step('Confirm the order', async () => {
        await checkoutPage.confirmOrder();
      });

      await test.step(
        'Verify the order is successfully completed',
        async () => {
          await checkoutPage.expectOrderCompleted();
        }
      );

      await test.step('Return to the home page', async () => {
        await checkoutPage.returnHome();
      });

      await test.step('Log out', async () => {
        await page.getByRole('link', {
          name: 'Log out'
        }).click();
      });

      await test.step('Verify user is logged out', async () => {
        await expect(
          page.getByRole('link', {
            name: 'Log in'
          })
        ).toBeVisible();
      });
    });
  }
);