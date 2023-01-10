/* eslint-disable no-undef */

describe('Sign in', () => {
    beforeEach(() => {
        cy.visit('/sign-in');
    });

    it('visit sign in page correctly', () => {
        cy.visit('/sign-in');
    });

    it('sign in form should be visible', () => {
        cy.get('.signIn_title__QLaUa').should('have.text', 'Logowanie');

        cy.get('#email').should('exist');

        cy.get('#password').should('exist');
    });

    it('user should be able to sign in', () => {
        cy.fixture('user').then((user) => {
            const { login, password } = user;

            cy.get('#email').focus().type(login);

            cy.get('#password').focus().type(password);

            cy.get('.button_root_violetGradientAppearance__cQ9Yp')
                .click()
                .url('/dashboard');
        });
    });

    it('form fields should be validating', () => {
        cy.fixture('user').then((user) => {
            const { password } = user;

            cy.get('#password').focus().type(password);

            cy.get('.button_root_violetGradientAppearance__cQ9Yp')
                .click()
                .url('/sign-in');
        });
    });
});
