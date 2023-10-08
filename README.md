# Project Name - conduit

conduit is the UI test suite for conduit web application, implemented using cypress.

## Prerequisites

- Download and install Node v14 or above.

## Installation

- Run from the root directory.

```
npm install
```

## How to run the tests?

- To run tests in Cypress test runner - desktop.

  1. ### `npm run e2e-desktop`

  2. Select 'E2E Testing' from the pop-up
  3. Select the desired browser (chrome/electron/firefox)
  4. Select the test suite (i.e. login.cy.js/settings.cy.js)

- To run tests in Cypress test runner - mobile.

  1. ### `npm run e2e-mobile`

  2. Select 'E2E Testing' from the pop-up
  3. Select the desired browser (chrome/electron/firefox)
  4. Select the test suite (i.e. login.cy.js/settings.cy.js)

- To run the test in CLI.

  ### `npm run e2e`

- For cross-browser testing. (Default browser is Chrome)

  - To run tests in Firefox

  ### `npm run e2e-firefox`

  - To run tests in Edge

  ### `npm run e2e-edge`

## Project Structure

    cypress/
    ├─ fixtures	  			          Contains external static data to be used by tests
        ├─example.json		        Configurations like URL, username etc.
    ├─ e2e 			                  Test suites comprising single/multiple tests
    ├─ support				            Support files
        ├─commands.js    		      Custom commands
        ├─e2e.js		              Runs before every single spec file
        ├─pageObjects		          Page object classes with locators and functions
    ├─ cypress.desktop.config.js	Configurations to run tests on desktop
    ├─ cypress.mobile.config.js	  Configurations to run tests in mobile
