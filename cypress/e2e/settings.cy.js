import "../support/commands";
import HomePage from "../support/pageObjects/HomePage";
import LoginPage from "../support/pageObjects/LoginPage";
import SettingsPage from "../support/pageObjects/SettingsPage";

const settingsPage = new SettingsPage();
const homePage = new HomePage();
const newProfilePicUrl = "https://api.realworld.io/images/profile-pic.jpg";
const newBioText = "Software QA | Automation | Cypress";
const newUsername2 = "newUsername";
const resetProfilePicUrl = "https://api.realworld.io/images/smiley-cyrus.jpg";
const resetBioText = "Hi Welcome to my Blog!";
const newEmailId2 = "newemail@ymail.com";

let randomPart;
let newEmailId;
let newUsername;
const newPassword = "Test123#";
let newToken;

describe("Settings tests", () => {
  before(() => {
    cy.loadApp();
  });
  after(() => {
    cy.logout();
    cy.loadApp();
    cy.loginWithValues(newEmailId, Cypress.env("newPassword"));
    //revert settings
    homePage.getSettings().click({ force: true });
    settingsPage.getProfilePicUrlInput().clear().type(resetProfilePicUrl);
    settingsPage
      .getUsernameInput()
      .clear()
      .type(Cypress.env("username"), { force: true });
    settingsPage.getBioInput().clear().type(resetBioText);
    settingsPage.getEmailInput().clear().type(Cypress.env("emailId"));
    settingsPage.getPasswordInput().clear().type(Cypress.env("password"));
    settingsPage.getSubmitButton().click();
    cy.waitForApiResponse("putUser");
    cy.waitForApiResponse("getProfile");
    cy.waitForApiResponse("getArticlesByAuthor");
    homePage.getUsernameText().should("have.text", Cypress.env("username"));
    cy.logout();
  });

  it("update settings", () => {
    cy.login();
    homePage.getSettings().click();
    settingsPage.getProfilePicUrlInput().clear().type(newProfilePicUrl);
    settingsPage.getUsernameInput().clear().type(newUsername);
    settingsPage.getBioInput().clear().type(newBioText);
    settingsPage.getEmailInput().clear().type(newEmailId);
    settingsPage.getPasswordInput().clear().type(Cypress.env("newPassword"));
    settingsPage.getSubmitButton().click();
    cy.waitForApiResponse("putUser");
    cy.waitForApiResponse("getProfile");
    cy.waitForApiResponse("getArticlesByAuthor");
    homePage.getUsernameText().should("have.text", newUsername);
  });

  it("Login with a user created via API and  update settings", () => {
    cy.intercept("GET", "**/api.realworld.io/api/tags").as("getTags");
    cy.intercept(
      "GET",
      "**/api.realworld.io/api/articles/feed?limit=10&offset=0"
    ).as("getFeed");

    //login with new user via API user
    cy.apiLogin();

    //const token = Cypress.env("authToken");

    //cy.wait("@getTags");
    //cy.wait("@getFeed");

    //homePage.getSettings().should("be.visible");
    settingsPage.getProfilePicUrlInput().should("be.visible");
  });
});
