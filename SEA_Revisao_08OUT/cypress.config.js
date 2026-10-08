const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://analista-teste.seatecnologia.com.br',
    supportFile: false,
    specPattern: 'cypress/e2e/**/*.cy.js',
  },
  viewportWidth: 1440,
  viewportHeight: 1000,
  defaultCommandTimeout: 15000,
  video: false,
  screenshotOnRunFailure: true,
  retries: 0,
});
