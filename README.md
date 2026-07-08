# Moxymind QA Technical Task

This project contains Playwright end-to-end and API automation tests for a simple frontend application and a backend API suite.

## Project structure

- tests/frontend: UI tests for the SauceDemo-style login and inventory flows
- tests/backend: API tests for ReqRes endpoints
- tests/frontend/pages: Page Object Model classes used by UI tests
- playwright.config.ts: Playwright configuration and browser projects

## Prerequisites

- Node.js
- npm

## Install dependencies

```bash
npm install
```

## Backend token setup

The backend API tests use a local environment variable named REQRES_API_TOKEN. Create a local .env file in the project root and add your token there:

```env
REQRES_API_TOKEN=your_token_here
```


## Run tests

Run all tests:

```bash
npm run test:all
```

Run frontend tests:

```bash
npm run test:frontend
```

Run backend tests:

```bash
npm run test:backend
```

Run tests in headed mode:

```bash
npm run test:frontend:headed
npm run test:backend:headed
```

Open the Playwright report:

```bash
npm run report:show
```

## Notes

- The backend tests use the ReqRes public API and validate response status, payload content, and basic performance expectations.
- The frontend tests use Playwright page objects to keep selectors and interactions organized.
