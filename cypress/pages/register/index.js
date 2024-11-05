import { faker } from '@faker-js/faker';

class Register {
    registerUser() {
        const signUpEmail = faker.internet.email();

        cy.get('[data-qa="signup-name"]').type(Cypress.env('signUpName'));
        cy.get('[data-qa="signup-email"]').type(signUpEmail);
        cy.contains('button', 'Signup').click(); 

        cy.get('#id_gender2').check();
        cy.get('[data-qa="password"]').type(Cypress.env('password'), { log: false })
        cy.get('[data-qa="days"]').select('5'); 
        cy.get('[data-qa="months"]').select('November'); 
        cy.get('[data-qa="years"]').select('1994');
        cy.get('input[type=checkbox]#newsletter').check();
        cy.get('input[type=checkbox]#optin').check();7
        cy.get('[data-qa="first_name"]').type('Tester');
        cy.get('[data-qa="last_name"]').type('QA Paloma');
        cy.get('[data-qa="company"]').type('Teste Company');
        cy.get('[data-qa="address"]').type('Av. Teste, 15');
        cy.get('[data-qa="address2"]').type('Complemento 10');
        cy.get('[data-qa="country"]').select('United States');
        cy.get('[data-qa="state"]').type('Califórnia');
        cy.get('[data-qa="city"]').type('SLos Angeles');
        cy.get('[data-qa="zipcode"]').type('90001');
        cy.get('[data-qa="mobile_number"]').type('(13) 90000-0000');

        cy.get('[data-qa="create-account"]').click();

        return this

    }

    startRegister(userEmail) {    
        cy.get('[data-qa="signup-name"]').type(Cypress.env('signUpName'));
        cy.get('[data-qa="signup-email"]').type(userEmail);
        cy.contains('button', 'Signup').click(); 

        return this
    }

    assertRegister() {
        cy.url().should('includes', 'account_created');
        cy.get('[data-qa="account-created"]').should('be.visible');
        cy.get('[data-qa="continue-button"]').click();
        cy.get('i.fa-user').parents().should('contain', Cypress.env('signUpName'));

        return this
    }

    
}


export default new Register()