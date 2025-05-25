# 🧪 API Test Suite

This repository contains a robust suite of automated tests to ensure the reliability, correctness, and resilience of the backend API endpoints. These tests act as the first line of defense against regressions, bugs, and unexpected behaviors in the API layer of the application.

## 🎯 Purpose

The goal of this test suite is to:

- Validate the **functional behavior** of all major API endpoints.
- Ensure **data integrity** and accurate response structures.
- Provide **fast feedback** during development and CI/CD processes.
- Test how the API responds to both **valid and invalid requests**.
- Increase confidence during **refactoring** or deploying new features.

## 📋 Scope of Testing

The test cases in `apiTest.test.ts` cover:

- **Status Code Checks**: Validating success (200, 201), failure (4xx), and server error (5xx) responses.
- **Data Validation**: Ensuring that returned data matches expected formats or schemas.
- **Authentication/Authorization**: Verifying access control mechanisms.
- **CRUD Operations**: Testing Create, Read, Update, Delete operations across various resources.
- **Edge Cases**: Handling unexpected input, missing fields, invalid routes, etc.
- **Timeouts & Failures**: Verifying API robustness under failure conditions.
- **Request Chaining** is followed to make use of a request from a api call as a request to another api call.

## ⚙️ Technologies Used

- **Node.js**: Runtime for executing test cases.
- **TypeScript**: Strong typing and clear structure for test logic.
- **@playwright/test**: Powerful testing framework with snapshot and mocking support.
- **APIRequest interface** : For issuing HTTP requests in tests.

## 🚀 Getting Started

### 1. Prerequisites

- Node.js (v14+)
- npm or yarn
- `ts-node` (if running directly via TypeScript)

### 2. Install Dependencies
- npx init playwright@latest (in bash or terminal or cmd prompt)

### 3. Run All Test Cases
- npx playwright test (in bash or terminal or cmd prompt)

### 4. Other Useful Commands
- npx playwright test "filename.ts" --> to run specific test files.
- npx playwright test --project=chromium --> Runs the tests only on Desktop Chrome.
- npx playwright test --debug -->  Runs the tests in debug mode.
- npx playwright codegen --> Auto generate tests with Codegen.
- npx playwright test --headed --> Run tests in headed browsers.
- npx playwright test --workers=1 --> Disable parallelization.
- npx playwright test --reporter=dot --> For choosing reporter.

### 5. Continuous Integration (CI/CD)
Integrating this test suite with your CI/CD pipeline is highly recommended. This ensures that every push, merge request, or deployment is validated against a stable and tested API contract.

Example CI tools supported:

- GitHub Actions
- Azure DevOps
- Zenkins
### sample GitHub Action snippet:
--yaml
- name: Install dependencies
  run: npm ci

- name: Run tests
  run: npx playwright test
                    
### 6. Contribution Guide
- Fork the repository.
- Create a new branch: feature/your-test-name.
- Add or modify test cases in apiTest.test.ts.
- Ensure all tests pass: npm test.
- Open a Pull Request with a clear description of your changes.

### 7. Best Practices To Be Followed
- Follow a Modular Folder Structure
Organize code by features or components:
<!-- -
tests/
  └─ login.spec.ts
  └─ checkout.spec.ts
pages/
  └─ loginPage.ts
  └─ checkoutPage.ts
fixtures/
  └─ testData.ts
utils/
  └─ helpers.ts
  - -->

- Page Object Model (POM)
Use the Page Object Model to encapsulate page interactions. This promotes reuse and keeps test files clean.

- Use Custom Test Fixtures
Leverage Playwright's powerful fixture system to share setup/teardown logic and context.

- Centralize Configuration
Use playwright.config.ts to define:
---> Browsers/devices
---> Test retries
---> Base URL
---> Timeouts
---> Parallelization

- Avoid Hardcoding
- Write Atomic & Independent Tests
Each test should be:Isolated, Self-validating and Able to run in parallel or alone.

- Use Hooks Judiciously
Use beforeEach, afterEach, etc., sparingly and only for common setup logic. Avoid side effects.

- Test What Matters
Focus on core workflows and user value; avoid over-testing UI visuals unless critical (use visual regression tools if needed).

- Use expect Smartly
Avoid overly strict expectations (e.g., exact text when toContainText is sufficient). This reduces flakiness.

- Enable HTML Reports
Playwright provides various types of report viewer like dot, line, list, HTML, Json etc.,

- Debug Failing Tests with Trace Viewer
Enable tracing for flaky/complex scenarios.

- Use Test Retries for Flaky Tests
In playwright.config.ts,  helps rerun failed tests before marking them as failed.

- CI/CD Integration
--> Run Tests Headless in CI
Use headless mode in CI pipelines for speed. Enable full mode (headless: false) for debugging only.
--> Run in Parallel Across Browsers
Test in Chromium, Firefox, WebKit simultaneously to ensure cross-browser compatibility.
--> Integrate with GitHub Actions, GitLab CI, etc.
Example GitHub Actions snippet

### 8. Advanced Tips
- Use test tagging: Run tests by tag (@smoke, @regression)
- Mock APIs with page.route() for faster and isolated tests
- Use environment configs to separate staging, prod, dev environments

### 9. Source Code Management
- git init
- git add filenames
- git commit -m "my commit"
- git branch -M main
- git remote add origin https://github.com/satztesting1990/playwright_api_testing.git
- git push -u origin main
- git pull origin main
