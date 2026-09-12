import { test as setup, expect } from '@playwright/test';
import fs from 'fs';

const authFile = 'playwright/.auth/user.json';

setup('authenticate user', async ({ page }) => {
  const id = `${Date.now()}${Math.floor(Math.random() * 1000)}`;

  const email = `amos.dave.${id}@example.com`;
  const password = 'Password123!';

  await page.goto('/register');

  await page.getByRole('radio', {
    name: 'Male',
    exact: true
  }).check();

  await page.getByRole('textbox', {
    name: 'First name:'
  }).fill('Amos');

  await page.getByRole('textbox', {
    name: 'Last name:'
  }).fill('Dave');

  await page.getByRole('textbox', {
    name: 'Email:'
  }).fill(email);

  await page.getByRole('textbox', {
    name: 'Password:',
    exact: true
  }).fill(password);

  await page.getByRole('textbox', {
    name: 'Confirm password:'
  }).fill(password);

  await page.getByRole('button', {
    name: 'Register'
  }).click();

  await expect(
    page.getByText('Your registration completed')
  ).toBeVisible();

  await page.getByRole('button', {
    name: 'Continue'
  }).click();

  await page.getByRole('link', {
    name: 'Log out'
  }).click();

  await page.getByRole('link', {
    name: 'Log in'
  }).click();

  await page.getByRole('textbox', {
    name: 'Email:'
  }).fill(email);

  await page.getByRole('textbox', {
    name: 'Password:'
  }).fill(password);

  await page.getByRole('button', {
    name: 'Log in'
  }).click();

  await expect(
    page.getByRole('link', {
      name: 'Log out'
    })
  ).toBeVisible();

  // Save authenticated session
  fs.mkdirSync('playwright/.auth', {
    recursive: true
  });

  await page.context().storageState({
    path: authFile
  });
});