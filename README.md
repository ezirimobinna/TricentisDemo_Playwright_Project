# Tricentis Demo Web Shop - Playwright

JavaScript Playwright automation project for https://demowebshop.tricentis.com/.

## Requirements covered

- Unique registration email generated for every run
- Page Object Model
- Descriptive `test.step()` descriptions
- `describe` blocks and tags
- Separate feature/page test files
- Dedicated E2E test file
- Direct navigation to required URLs for non-authorization navigation
- Custom reporter with optional webhook POST
- GitHub Actions `workflow_dispatch`
- Headless execution
- Parallel execution by default

## Install

```bash
npm install
npx playwright install chromium
```

## Run

```bash
npm test
npm run registration
npm run login-test
npm run listing
npm run checkout
npm run e2e
npm run report
```

The standalone login and checkout tests expect `TEST_USER_EMAIL` and `TEST_USER_PASSWORD`.

The E2E test creates a unique user during the run, then logs that new user in and completes the purchase flow.

## Notification

Set `NOTIFY_WEBHOOK_URL` to an endpoint that accepts a JSON POST. The custom reporter sends the final Playwright result summary when all tests finish.

## GitHub Actions

Push the repository to GitHub and use:

Actions -> Playwright Tests -> Run workflow

Optional inputs:
- `@smoke`
- `@registration`
- `@listing`
- `@checkout`
- `@e2e`

Leave the inputs blank to run all tests.
