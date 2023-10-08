class SettingsPage {
  getProfilePicUrlInput() {
    return cy.get('input[placeholder="URL of profile picture"]');
  }

  getUsernameInput() {
    return cy.get('input[placeholder="Username"]');
  }

  getBioInput() {
    return cy.get('textarea[placeholder="Short bio about you"]');
  }

  getEmailInput() {
    return cy.get('input[type="email"]');
  }

  getPasswordInput() {
    return cy.get('input[type="password"]');
  }

  getLogoutButton() {
    return cy.get(".btn").contains("Or click here to logout.");
  }

  getSubmitButton() {
    return cy.get("button[type=submit]");
  }
}
export default SettingsPage;
