class LoginPage {
  getEmailInputField() {
    return cy.get("input[type=email]");
  }

  getPasswordInputField() {
    return cy.get("input[type=password]");
  }

  getSignInButton() {
    return cy.get("button[type=submit]");
  }

  getErrorMessage() {
    return cy.get(".error-messages");
  }
}
export default LoginPage;
