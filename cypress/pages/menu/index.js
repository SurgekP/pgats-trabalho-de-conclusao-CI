
class Menu {
    toGoContactUs() {
        cy.get('a[href$=contact_us]').click();  

        return this
    }

    toGoProducts() {
        cy.contains(`Products`).click();

        return this
    }

    toGoSignUp() {
        cy.contains(`Signup`).click();

        return this
    }

    toGoCart() {
        cy.contains(`Cart`).click();  

        return this
    }

    toGoLogout() {
        cy.get('a[href$=logout]').click(); 

        return this
    }

    toGoAccount() {
        cy.get('a[href="/delete_account"]').click(); 

        return this
    }
}

export default new Menu()