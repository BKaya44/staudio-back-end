// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
Cypress.Commands.add('login', () => {
    cy.request({
        method:'POST', 
        url:'http://127.0.0.1:8000/api/user/authorize',
        body: {
            username: Cypress.env('api_username'),
            password: Cypress.env('api_password')
        },
      })
      .as('loginResponse')
      .then((response) => {
        Cypress.env('token', response.body.token); 
        return response;
      })
      .its('status')
      .should('eq', 200);
  })
  