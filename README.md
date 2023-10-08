# Project Name - conduit

conduit is the UI test suite for conduit web application, implmented using cypress.

## Prerequisites

- Download and install Node v14 or above.

## Installation

- Run from root directory.

  #### `npm start`

## How to run the tests ?

- To run tests in cypress test runner - dekstop.

  1. ### `npm run e2e-desktop`

  2. Select 'E2E Testing' from the pop-up
  3. Select the desired browser (chrome/electron/firefox)
  4. Select the test suite (i.e. login.cy.js/settings.cy.js)

- To run tests in cypress test runner - mobile.

  1. ### `npm run e2e-mobile`

  2. Select 'E2E Testing' from the pop-up
  3. Select the desired browser (chrome/electron/firefox)
  4. Select the test suite (i.e. login.cy.js/settings.cy.js)

- To run the test in CLI.

  ### `npm run e2e`

- For cross browser testing. (Dafault browser is Chrome)

  - To run tests in firefox

  ### `npm run e2e-firefox`

  - To run tests in edge

  ### `npm run e2e-edge`

## Project Structure

    cypress/
    ├─ fixtures	  			        Contains exernal static data to be used by tests
        ├─example.json		        Configurations like URL, username etc.
    ├─ e2e 			                Test suites comprising of single/multiple tests
    ├─ pageObjects			        Page object classes with locators and functions
    ├─ support				        Support files
        ├─commands.js    		    Custom commands
        ├─e2e.js		            Runs before every single spec file
        ├─pageObjects		        Page object classes with locators and functions
    ├─ cypress.desktop.config.js	Configurations to run tests in desktop
    ├─ cypress.mobile.config.js	    Configurations to run tests in mobile
