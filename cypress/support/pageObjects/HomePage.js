class HomePage {
  getSignInButton() {
    return cy.get(".nav-link").contains("Sign in");
  }

  getHomeButton() {
    return cy.get(".nav-link").contains("Home");
  }

  getProfilePic() {
    return cy.get(".user-pic");
  }

  getSettings() {
    return cy.get(".nav-link").contains("Settings");
  }

  getBioText() {
    return cy.get("p.ng-binding");
  }

  getUsernameText() {
    return cy.get("h4.ng-binding");
  }
}
export default HomePage;
