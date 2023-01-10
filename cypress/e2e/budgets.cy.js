/* eslint-disable no-undef */

import { generateRandomString } from '../support/generateRandomString';

describe('Budgets', () => {
    beforeEach(() => {
        cy.visit('/sign-in');

        cy.fixture('user').then((user) => {
            const { login, password } = user;

            cy.get('#email').focus().type(login);

            cy.get('#password').focus().type(password);

            cy.get('.button_root_violetGradientAppearance__cQ9Yp').click();

            cy.wait(1000);

            cy.saveLocalStorage();

            cy.visit('/budgets');
        });
    });

    it('visit budgets page correctly', () => {
        cy.visit('/budgets');
    });

    it('user should be able to add new budget', () => {
        cy.get('.budgetItem_root__v5IOP')
            .its('length')
            .then((length) => {
                cy.get('#name').focus().type(generateRandomString());

                cy.get('.addBudget_buttonRoot__BDCt4').click();

                cy.get('.budgets_budgets__Ap42I')
                    .children()
                    .should('have.length', length + 1);
            });
    });
});
