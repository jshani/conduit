import HomePage from "./pageObjects/HomePage";
import LoginPage from "./pageObjects/LoginPage";
import SettingsPage from "./pageObjects/SettingsPage";

const homePage = new HomePage();
const loginPage = new LoginPage();
const settingsPage = new SettingsPage();
let randomPart;
let newEmailId;
let newUsername;
let newToken;

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

Cypress.Commands.add("apiLogin", () => {
  randomPart = Math.random().toString(36).substring(2, 15);
  newEmailId = randomPart + "@gmail.com";
  newUsername = "shani" + randomPart;
  cy.request({
    method: "POST",
    url: "https://api.realworld.io/api/users",
    body: {
      user: {
        email: newEmailId,
        password: "Test123#",
        username: newUsername,
      },
    },
  }).should((response) => {
    expect(response.status).to.eq(201);
    expect(response.body.user).to.have.property("username").to.eq(newUsername);
    expect(response.body.user).to.have.property("email").to.eq(newEmailId);
  });
  cy.request({
    method: "POST",
    url: "https://api.realworld.io/api/users/login",
    body: {
      user: { email: newEmailId, password: newPassword },
    },
  }).then(({ body }) => {
    expect(body.user.token).to.be.a("string");
    //do we need bottom line
    cy.setCookie("token", body.user.token);
    window.localStorage.setItem("authToken", body.user.token);

    const authorizationToken = `Token ${body.user.token}`;
    cy.visit("https://angularjs.realworld.io/#/");

    cy.request({
      method: "GET",
      url: "https://api.realworld.io/api/user",
      headers: {
        authorization: authorizationToken,
      },
      body: {
        user: {
          bio: null,
          email: newEmailId,
          image: "https://api.realworld.io/images/smiley-cyrus.jpeg",
          token: newToken,
          username: newUsername,
        },
      },
    }).then(({ body }) => {
      expect(body.user.token).to.be.a("string");
      //cy.setCookie("token", response.body.user.token);
      cy.visit("https://angularjs.realworld.io/#/settings");
    });
  });
});
