/* eslint-disable no-undef */

describe('Homepage', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('visit app', () => {
        cy.visit('/');
    });

    it('sign in button exists', () => {
        cy.get('.button_root_navyBlueAppearance__Zbbyh').should(
            'have.text',
            'Zaloguj się'
        );
    });

    it('redirect to sign in page', () => {
        cy.get('.button_root_navyBlueAppearance__Zbbyh')
            .click()
            .url('/sign-in');
    });

    it('redirect to create account page', () => {
        cy.get('.button_root_violetOutlineAppearance__P6L8m')
            .click()
            .url('/create-account');
    });
});
