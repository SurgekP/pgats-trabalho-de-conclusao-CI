

class Login {
    loginUser(emailUser, password) { 
        cy.get('[data-qa="login-email"]').type(emailUser);
        cy.get('[data-qa="login-password"]').type(password, { log: false });
        cy.get('[data-qa="login-button"]').click();

        return this
    }

    assertLogin() {
        cy.get('i.fa-user').parent().should('be.visible', Cypress.env('signUpName'));

        return this
    }
}

export default new Login()