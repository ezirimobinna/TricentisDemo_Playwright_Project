import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 60_000,
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: undefined,

  reporter: [
    ['html'],
    ['list'],
    ['./reporters/CustomReporter.js']
  ],

  use: {
    baseURL: 'https://demowebshop.tricentis.com/',
    headless: true,
    headed: false,
    trace: 'on-first-retry'
  },

  projects: [
    // 1. Creates the authenticated session
    {
      name: 'setup',
      testMatch: /auth\.js/
    },

    // 2. Tests that require an authenticated user
    {
      name: 'chromium-authenticated',
      testIgnore: /e2e\/.*\.spec\.js/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json'
      },
      dependencies: ['setup']
    },

    // 3. E2E flow that performs its own Sign Up → Login
    {
      name: 'chromium-e2e',
      testMatch: /e2e\/.*\.spec\.js/,
      use: {
        ...devices['Desktop Chrome']
      },
      dependencies: ['setup']
    }
  ]
});