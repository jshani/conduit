import "../support/commands";
import HomePage from "../support/pageObjects/HomePage";
import LoginPage from "../support/pageObjects/LoginPage";

const homePage = new HomePage();
const loginPage = new LoginPage();

describe("Login tests", () => {
  beforeEach(() => {
    cy.loadApp();
  });

  it("login as a user", () => {
    cy.login();
    cy.logout();
  });

  it("can not login with incorrect credentials", () => {
    homePage.getSignInButton().click();
    loginPage.getEmailInputField().type(Cypress.env("emailId"));
    loginPage.getPasswordInputField().type(Cypress.env("newPassword"));
    loginPage.getSignInButton().click();
    loginPage.getErrorMessage().should("be.visible");
  });
});
