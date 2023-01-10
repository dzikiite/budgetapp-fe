/* eslint-disable no-undef */

describe('Statements', () => {
    beforeEach(() => {
        cy.visit('/sign-in');

        cy.fixture('user').then((user) => {
            const { login, password } = user;

            cy.get('#email').focus().type(login);

            cy.get('#password').focus().type(password);

            cy.get('.button_root_violetGradientAppearance__cQ9Yp').click();

            cy.wait(1000);

            cy.saveLocalStorage();

            cy.visit('/statements');
        });
    });

    it('visit statements page correctly', () => {
        cy.visit('/statements');
    });

    it('first chart shoud be visible if user has any budgets', () => {
        cy.get('.statementsMenu_root__DWbgq').then(($menu) => {
            if ($menu.children().length > 0) {
                cy.get('.canvasjs-chart-canvas').should('be.visible');
            } else cy.get('.canvasjs-chart-canvas').should('not.be.visible');
        });
    });
});
