import { expect } from '@playwright/test';

export class CheckoutPage {
  constructor(page) {
    this.page = page;

    this.country = page.getByLabel('Country:');

    this.city = page.getByRole('textbox', {
      name: 'City:'
    });

    this.address = page.getByRole('textbox', {
      name: 'Address 1:'
    });

    this.postalCode = page.getByRole('textbox', {
      name: 'Zip / postal code:'
    });

    this.phone = page.getByRole('textbox', {
      name: 'Phone number:'
    });

    this.billingContinueButton = page
      .locator('#opc-billing')
      .getByRole('button', {
        name: 'Continue'
      });

    this.shippingContinueButton = page
      .locator('#opc-shipping')
      .getByRole('button', {
        name: 'Continue'
      });

    this.paymentContinueButton = page
      .locator('#opc-payment_method')
      .getByRole('button', {
        name: 'Continue'
      });

    this.paymentInformationContinueButton = page
      .locator('#opc-payment_info')
      .getByRole('button', {
        name: 'Continue'
      });

    this.pickup = page.getByRole('checkbox', {
      name: 'In-Store Pickup'
    });

    this.confirmButton = page.getByRole('button', {
      name: 'Confirm'
    });

    this.successMessage = page.getByText(
      'Your order has been successfully processed!',
      { exact: true }
    );

    this.orderNumber = page.getByText('Order number:');
  }

  async expectCheckoutPage() {
    await expect(
      this.page.getByRole('heading', {
        name: 'Checkout'
      })
    ).toBeVisible();
  }

  async fillBillingAddress(data) {
    await this.country.selectOption(data.country);
    await this.city.fill(data.city);
    await this.address.fill(data.address);
    await this.postalCode.fill(data.postalCode);
    await this.phone.fill(data.phone);
  }

  async continueBilling() {
    await this.billingContinueButton.click();
  }

  async continueShipping() {
    await this.shippingContinueButton.click();
  }

  async continuePayment() {
    await this.paymentContinueButton.click();
  }

  async continuePaymentInformation() {
    await this.paymentInformationContinueButton.click();
  }

  async selectInStorePickup() {
    await this.pickup.check();
  }

  async confirmOrder() {
    await this.confirmButton.click();

    await this.page.waitForURL('**/checkout/completed/');
  }

  async expectOrderCompleted() {
    await expect(
      this.page.getByText(
        'Your order has been successfully processed!',
        { exact: true }
      )
    ).toBeVisible();

    await expect(this.orderNumber).toBeVisible();
  }

  async returnHome() {
    await this.page
      .getByRole('button', {
        name: 'Continue'
      })
      .click();
  }
}