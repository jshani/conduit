const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://angularjs.realworld.io/#/",
    specPattern: ["cypress/e2e/*.cy.js"],
    env: {
      username: "jshani",
      emailId: "shanimandila@gmail.com",
      password: "Test123#",
      newPassword: "Test123@",
    },

    requestTimeout: 6000,
    viewportWidth: 1280,
    viewportHeight: 800,
    defaultCommandTimeout: 5000,
    retries: 2,

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
