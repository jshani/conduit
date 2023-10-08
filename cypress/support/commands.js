import HomePage from "./pageObjects/HomePage";
import LoginPage from "./pageObjects/LoginPage";
import SettingsPage from "./pageObjects/SettingsPage";

const homePage = new HomePage();
const loginPage = new LoginPage();
const settingsPage = new SettingsPage();

Cypress.Commands.add("waitForApiResponse", (request) => {
  cy.intercept("POST", "**/api.realworld.io/api/users/login").as("login");
  cy.intercept("GET", "**/api.realworld.io/api/tags").as("getTags");
  cy.intercept("GET", "**/api.realworld.io/api/profiles/**").as("getProfile");
  cy.intercept("PUT", "**/api.realworld.io/api/user").as("putUser");
  cy.intercept("GET", "**/api.realworld.io/api/articles?author=**").as(
    "getArticlesByAuthor"
  );

  cy.wait(`@${request}`).then(({ response }) => {
    expect(response.statusCode).to.be.equal(200);
  });
});

Cypress.Commands.add("loadApp", () => {
  cy.visit("/");
});

Cypress.Commands.add("login", () => {
  homePage.getSignInButton().click();
  loginPage.getEmailInputField().type(Cypress.env("emailId"));
  loginPage.getPasswordInputField().type(Cypress.env("password"));
  loginPage.getSignInButton().click();
  cy.waitForApiResponse("login");
  homePage.getProfilePic().should("be.visible");
});

Cypress.Commands.add("loginWithValues", (username, password) => {
  homePage.getSignInButton().click();
  loginPage.getEmailInputField().type(username);
  loginPage.getPasswordInputField().type(password);
  loginPage.getSignInButton().click();
  cy.waitForApiResponse("login");
  homePage.getProfilePic().should("be.visible");
});

Cypress.Commands.add("logout", () => {
  homePage.getSettings().click({ force: true });
  settingsPage.getLogoutButton({ timeout: 7000 }).click();
  homePage.getSignInButton().should("be.visible");
});
