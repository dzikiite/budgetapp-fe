/* eslint-disable no-undef */

import { generateRandomString } from '../support/generateRandomString';

describe('Categories', () => {
    beforeEach(() => {
        cy.visit('/sign-in');

        cy.fixture('user').then((user) => {
            const { login, password } = user;

            cy.get('#email').focus().type(login);

            cy.get('#password').focus().type(password);

            cy.get('.button_root_violetGradientAppearance__cQ9Yp').click();

            cy.wait(1000);

            cy.saveLocalStorage();

            cy.visit('/categories');
        });
    });

    it('visit categories page correctly', () => {
        cy.visit('/categories');
    });

    it('manage categories button should be visible', () => {
        cy.get(
            '.categories_button__2DSKZ > .button_root_navyBlueSquareAppearance__0NAsf'
        ).should('exist');
    });

    it('user should be able to add category', () => {
        cy.get(
            '.categories_button__2DSKZ > .button_root_navyBlueSquareAppearance__0NAsf'
        ).click();

        cy.wait(50);

        cy.get(
            '.manageCategories_heading__1raaR > .button_root_navyBlueSquareAppearance__0NAsf'
        ).click();

        cy.wait(50);

        cy.get('.add_title__byVwM').should('have.text', 'Dodaj kategorię');

        const categoryName = generateRandomString();

        cy.get('#name').focus().type(categoryName);

        cy.get('[type="submit"]').click({ force: true });

        cy.wait(100);

        cy.get(
            '.categories_button__2DSKZ > .button_root_navyBlueSquareAppearance__0NAsf'
        ).should('be.visible');
    });

    // TODO: Remove category
});
