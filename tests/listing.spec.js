import { test } from '@playwright/test';
import { ListingPage } from '../pages/ListingPage.js';

test.describe('Listing Page @listing @smoke', () => {
  test('should display the Books listing page', async ({ page }) => {
    const listing = new ListingPage(page);

    await test.step('Navigate directly to the Books listing page', async () => {
      await listing.goto();
    });

    await test.step(
      'Verify the Computing and Internet product is displayed',
      async () => {
        await listing.expectBooksListing();
      }
    );
  });
});