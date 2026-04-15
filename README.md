# BBC Sport Comment Testing Automation

## Project Overview

This project automates and documents testing for BBC Sport article comments using:

- Playwright
- JavaScript
- Cucumber
- Gherkin feature files
- Page Object Model (POM)

The repository includes both:

- Automated test cases for validating comment visibility and comment-related UI behaviour
- Manual test cases for checks that are better verified by a human tester, such as account/session-dependent scenarios

The current implementation dynamically discovers BBC Sport article links from the live site and checks whether an article supports comments before running the relevant scenarios.

## Tech Stack

- **Playwright**  
  Playwright controls the browser and interacts with BBC Sport pages, including navigation, scrolling, and UI validation.

- **JavaScript**  
  The project is implemented in JavaScript only, as required.

- **Cucumber**  
  Cucumber runs the BDD scenarios and connects Gherkin steps to executable automation code.

- **Gherkin**  
  Feature files are written in a readable `Given / When / Then` format so tests are easy to review by both technical and non-technical stakeholders.

- **Page Object Model**  
  POM keeps page locators and reusable browser actions separate from step definitions, making the test suite cleaner and easier to maintain.

## Project Structure

```text
bbc-sport-comments/
├── features/
│   ├── automated/
│   │   ├── comments-disabled.feature
│   │   ├── comments-signin.feature
│   │   └── comments-visible.feature
│   └── manual/
│       └── manual-comment-tests.feature
├── fixtures/
│   └── articles.json
├── pages/
│   ├── ArticlePage.js
│   ├── BasePage.js
│   ├── HomePage.js
│   └── SportPage.js
├── reports/
│   ├── cucumber-report.html
│   └── cucumber-report.json
├── step-definitions/
│   ├── comments.steps.js
│   └── hooks.js
├── utils/
│   └── findArticleWithComments.js
├── package-lock.json
├── package.json
├── cucumber.js
├── playwright.config.js
└── README.md
```

### Folder Purpose

- **features/automated/**  
  Contains the automated Gherkin scenarios executed by Cucumber.

- **features/manual/**  
  Contains manual Gherkin scenarios tagged with `@manual` for human execution.

- **fixtures/**  
  Stores test data such as article URLs and fixture values used by the test suite.

- **pages/**  
  Contains Page Object Model classes that encapsulate page locators and browser actions.

- **reports/**  
  Stores generated Cucumber reports, including HTML and JSON output.

- **step-definitions/**  
  Contains the Cucumber step implementations and hooks for browser setup and teardown.

- **utils/**  
  Contains reusable support logic, including dynamic article discovery and comment detection.

## Installation

Install project dependencies with:

```bash
npm install
```

Install Playwright browsers if needed:

```bash
npx playwright install
```

### Important Packages Used

Based on the current project configuration, the main packages are:

- **@playwright/test**  
  Used for Playwright browser automation and assertions.

- **playwright**  
  Installed in the project dependency tree and used to provide browser binaries and CLI support.

- **@cucumber/cucumber**  
  Used to run Cucumber feature files and step definitions.

This project does **not currently include** `multiple-cucumber-html-reporter` or `cucumber-html-reporter` as direct dependencies. Reporting is currently handled through Cucumber's built-in format output configured in `cucumber.js`.

## Gherkin Format

This project uses Gherkin for writing test scenarios in a readable BDD format:

```gherkin
Given ...
When ...
Then ...
```

### Scenario Types

- **Automated scenarios**  
  These are executable and live in `features/automated/`.

- **Manual scenarios**  
  These are documentation-style scenarios tagged with `@manual` and live in `features/manual/`.

### Example

```gherkin
Scenario: Article with comments enabled displays the comments section
  Given the user opens a BBC Sport article with comments enabled
  When the user scrolls to the comments section
  Then the comments section should be visible
  And the page should display the text "Join the conversation"
```

The automated scenarios validate live BBC Sport behaviour. The manual scenarios describe checks that a human tester should perform.

## Running Automated Tests

The current `package.json` scripts support the following commands.

Run the default automated suite:

```bash
npm test
```

Run the automated suite in headed mode:

```bash
npm run test:headed
```

There is also a duplicate headed script currently present in the project:

```bash
npm run test:one
```

Run automated scenarios directly with Cucumber:

```bash
npx cucumber-js
```

Run only non-manual scenarios:

```bash
npx cucumber-js --tags "not @manual"
```

## Automated Test Results

The current project generates:

- **Console output** during execution
- **Cucumber HTML report** at:

```text
reports/cucumber-report.html
```

- **Cucumber JSON report** at:

```text
reports/cucumber-report.json
```

### Notes on Failure Artifacts

The current `playwright.config.js` includes Playwright settings such as:

- `screenshot: "only-on-failure"`
- `trace: "retain-on-failure"`

However, this project runs tests through Cucumber hooks rather than the Playwright Test runner, so dedicated screenshot, trace, and video folders are not fully wired as standalone report directories in the current implementation.

As the project stands today:

- HTML and JSON Cucumber reports are generated in `reports/`
- Playwright is configured with failure-related settings
- There is **no dedicated videos folder configured**
- Additional hook logic would be needed if you want screenshots and traces saved explicitly per failed Cucumber scenario

## Running Manual Tests

Manual tests do **not** run as part of the normal automated regression flow.

They are located in:

```text
features/manual/
```

These scenarios are intended as human-readable test documentation and should be executed by a tester manually.

Exclude manual scenarios during automated execution with:

```bash
npx cucumber-js --tags "not @manual"
```

You can also run the manual profile with:

```bash
npx cucumber-js -p manual
```

In the current project, these manual scenarios have placeholder step definitions and are expected to show as **pending**, because they are intentionally not fully automated.

## Assumptions

- BBC article URLs may change over time
- Comment availability depends on live BBC Sport content
- Selectors may need updating if BBC changes page structure or comment components
- Tests assume the user is not logged in unless otherwise specified
- Dynamic article discovery depends on the current state of links available on `https://www.bbc.co.uk/sport`

## Limitations

- Tests do not create, submit, edit, or delete comments
- Manual scenarios are not automated
- BBC live content may occasionally make tests unstable
- Articles that support comments today may not support them later
- Dynamic selectors against a live media website may occasionally require maintenance

## Getting Started Summary

1. Clone or download the repository
2. Run:

```bash
npm install
```

3. Install browsers if required:

```bash
npx playwright install
```

4. Run the automated suite:

```bash
npm test
```

5. Open the generated HTML report after execution:

```text
reports/cucumber-report.html
```

This repository is structured to be easy for another developer, reviewer, or assessor to install, run, and evaluate locally.
