import { test } from '@playwright/test';
import { ListingPage } from '../pages/ListingPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import { createCheckoutData } from '../utils/testData.js';

test.describe('Checkout @checkout @smoke', () => {
  test('should complete checkout using an authenticated session', async ({ page }) => {
    const checkoutData = createCheckoutData();

    const listing = new ListingPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await test.step('Navigate directly to the Books listing page', async () => {
      await listing.goto();
    });

    await test.step('Add the first book to the shopping cart', async () => {
      await listing.addFirstProductToCart();
    });

    await test.step('Navigate directly to the shopping cart', async () => {
      await cart.goto();
      await cart.expectItemCount(1);
    });

    await test.step('Accept the terms and open checkout', async () => {
      await cart.acceptTerms();
      await cart.checkout();
    });

    await test.step('Complete billing information', async () => {
      await checkout.fillBillingAddress(checkoutData);
      await checkout.continueBilling();
    });

    await test.step('Select in-store pickup', async () => {
      await checkout.selectInStorePickup();
      await checkout.continueShipping();
    });

    await test.step('Continue to payment method', async () => {
      await checkout.continuePayment();
    });

    await test.step('Continue to payment information', async () => {
      await checkout.continuePaymentInformation();
    });

    await test.step('Confirm the order', async () => {
      await checkout.expectCheckoutPage();
      await checkout.confirmOrder();
    });

    await test.step('Verify successful order completion', async () => {
      await checkout.expectOrderCompleted();
    });
  });
});