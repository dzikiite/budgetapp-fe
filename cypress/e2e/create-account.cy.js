/* eslint-disable no-undef */

import { generateRandomString } from '../support/generateRandomString';

describe('Create account', () => {
    beforeEach(() => {
        cy.visit('/create-account');
    });

    it('visit create account page correctly', () => {
        cy.visit('/create-account');
    });

    it('create account form should be visible', () => {
        cy.get('.createAccount_title__4-p6E').should(
            'have.text',
            'Rejestracja'
        );

        cy.get('#lastname').should('exist');

        cy.get('password').should('exist');
    });

    it('user should be able to create account', () => {
        cy.get('#firstname').focus().type(generateRandomString());

        cy.get('#lastname').focus().type(generateRandomString());

        cy.get('#email').focus().type(`${generateRandomString()}@example.com`);

        cy.get('#password').focus().type(generateRandomString());

        cy.get('.button_root_violetGradientAppearance__cQ9Yp')
            .click()
            .url('/dashboard');
    });

    it('form should be validated correctly', () => {
        cy.get('#firstname').focus().type(generateRandomString());

        cy.get('#lastname').focus().type(generateRandomString());

        cy.get('#password').focus().type(generateRandomString());

        cy.get('.button_root_violetGradientAppearance__cQ9Yp')
            .click()
            .url('/create-account');
    });
});
