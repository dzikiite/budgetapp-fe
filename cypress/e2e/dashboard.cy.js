/* eslint-disable no-undef */

describe('Dashboard', () => {
    beforeEach(() => {
        cy.visit('/sign-in');

        cy.fixture('user').then((user) => {
            const { login, password } = user;

            cy.get('#email').focus().type(login);

            cy.get('#password').focus().type(password);

            cy.get('.button_root_violetGradientAppearance__cQ9Yp').click();

            cy.wait(1000);

            cy.saveLocalStorage();

            cy.visit('dashboard');
        });
    });

    it('visit dashboard page correctly', () => {
        cy.visit('/dashboard');
    });

    it('navigation menu should be visible', () => {
        cy.get('.mainNavigation_root__Rs2sO').should('exist');
    });

    it('add budget button should be visible', () => {
        cy.get('.button_root_navyBlueSquareAppearance__0NAsf').should('exist');
    });
});
