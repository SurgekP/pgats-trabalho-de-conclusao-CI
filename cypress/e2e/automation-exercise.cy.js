
import register from '../pages/register';

import login from '../pages/login';

import menu from '../pages/menu';

import { faker } from '@faker-js/faker';

describe('Automation Exercise', () => {

    beforeEach(() => {
        cy.visit('/');
    });
        const signUpName = 'Tester QA Paloma'
        const password = 'Pa@12345'

        Cypress.env('signUpName', signUpName);
        Cypress.env('password', password);

    it('Test Case 1: Register User', () => {
        
        menu.toGoSignUp();

        register.registerUser().assertRegister();
        
    });


    it('Test Case 2: Login User with correct email and password', () => {

        menu.toGoSignUp();
        
        login.loginUser('tester-qa.1723386032963-paloma@yopmail.com', Cypress.env('password') ).assertLogin();
             
    });

    it('Test Case 3: Login User with incorrect email and password', () => {

        menu.toGoSignUp();

        login.loginUser('tester-ERROR.paloma@yopmail.com', 'Xx000#');
        
        cy.get(`.login-form form p`).contains('Your email or password is incorrect!').should('be.visible');
    });

    it('Test Case 4: Logout User', () => {

        menu.toGoSignUp();
        
        login.loginUser('tester-qa.1723386032963-paloma@yopmail.com', Cypress.env('password') ).assertLogin();
        
        menu.toGoLogout();
        cy.url().should('includes', 'login');
        cy.contains("Login to your account").should("be.visible");

    });

    it('Test Case 5: Register User with existing email', () => {
        
        menu.toGoSignUp();

        register.startRegister('tester-qa.1723386032963-paloma@yopmail.com')

        cy.get(`.signup-form form p`).should('be.visible').and('contain', 'Email Address already exist!')
    });

    it('Test Case 6: Contact Us Form', () => {
        const signUpEmail = faker.internet.email();

        menu.toGoContactUs();
        
        cy.url().should('includes', 'contact_us');
        cy.get(`.contact-form h2`).should('be.visible').and('have.text', 'Get In Touch');
        cy.get('[data-qa="name"]').type(Cypress.env('signUpName'));
        cy.get('[data-qa="email"]').type(signUpEmail);
        cy.get('[data-qa="subject"]').type('Assunto Teste');
        cy.get('[data-qa="message"]').type('Mensagem Teste. Favor, verificar se é possível alterar o meu e-mail de cadastro.');
        cy.fixture('test_img.jpg').as('arquivo')
        cy.get('input[type="file"]').selectFile('@arquivo')
        cy.get('[data-qa="submit-button"]').click();
        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.');
        cy.contains('a.btn.btn-success', 'Home').click();
        cy.url().should('eq', 'https://automationexercise.com/');

    });

    it('Test Case 8: Verify All Products and product detail page', () => {
        
        menu.toGoProducts();

        cy.url().should('contain', 'products');
        cy.get('.title').should('be.visible').and('contain', 'All Products');
        cy.get('.single-products').should('be.visible').and('have.length.at.least', 1).first().parent().contains('View Product').click();
        cy.get('.product-information > h2').should('be.visible');
        cy.get('.product-information p').should('be.visible').and('have.length', 4);
        cy.get('.product-information span span').should('be.visible');

    });

    it('Test Case 9: Search Product', () => {
        
        menu.toGoProducts();

        cy.url().should('contain', 'products');
        cy.get('.title').should('be.visible').and('contain', 'All Products');
        cy.get('input#search_product').type('Shirt');
        cy.get('button#submit_search').click();
        cy.get('.title').should('be.visible').and('contain', 'Searched Products');
        cy.get('.single-products').should('be.visible').and('have.length.at.least', 1)
    });

    it('Test Case 10: Verify Subscription in home page', () => {

        const signUpEmail = faker.internet.email();

        cy.get('.single-widget').contains('Subscription').should('be.visible');
        cy.get('input#susbscribe_email').scrollIntoView().type(signUpEmail);
        cy.get('button#subscribe').click();

        cy.contains('You have been successfully subscribed!').should('be.visible');
    });

    it('Test Case 15: Place Order: Register before Checkout', () => {

        menu.toGoSignUp();

        register.registerUser().assertRegister();

        menu.toGoProducts();
        cy.url().should('includes', 'products');

        cy.get('.title').should('be.visible').and('contain', 'All Products');

        cy.get('.single-products').should('be.visible').and('have.length.at.least', 1).first().parent().contains('Add to cart').click();

        cy.get('.modal-title').contains('Added').should('be.visible');
        cy.get('.text-center').contains('Your product has been added to cart.').should('be.visible');
        cy.contains('button', 'Continue Shopping').click();

        cy.get('.single-products').should('be.visible').and('have.length.at.least', 2).first().parent().contains('Add to cart').click();

        cy.get('.modal-title').contains('Added').should('be.visible');
        cy.get('.text-center').contains('Your product has been added to cart.').should('be.visible');
        cy.contains('button', 'Continue Shopping').click();

        menu.toGoCart();
        cy.url().should('contain', 'view_cart');

        cy.contains(`Proceed To Checkout`).should('be.visible').click();
        cy.url().should('includes', 'checkout');
        cy.get('.heading').should('be.visible').and('contain', 'Address Details')

        cy.get('#address_delivery').should('be.visible').and('contain', 'Your delivery address');

        cy.get('#address_invoice').should('be.visible').and('contain', 'Your billing address');

        cy.get('.heading').contains('Review Your Order').should('be.visible');
        cy.get('p').contains('Rs. 1000').should('be.visible');

        cy.get('.form-control').type('Test Case 10: Checkout para finalização da compra');
        cy.get('a[href$=payment]').click();  
        cy.url().should('includes', 'payment');

        cy.get('[data-qa="name-on-card"]').type(Cypress.env('signUpName'));
        cy.get('[data-qa="card-number"]').type(faker.finance.creditCardNumber());
        cy.get('[data-qa="cvc"]').type(faker.finance.creditCardCVV());
        cy.get('[data-qa="expiry-month"]').type(11);
        cy.get('[data-qa="expiry-year"]').type(2034);
        cy.get('[data-qa="pay-button"]').click();

        cy.url().should('contain', 'payment_done');
        cy.get('[data-qa="order-placed"]').contains('Order Placed!').should('be.visible');
        
        menu.toGoAccount(); 

        cy.url().should('includes', 'delete_account');
        cy.get('[data-qa="account-deleted"]').should('be.visible');
        cy.get('[data-qa="continue-button"]').click();
        cy.url().should('eq', 'https://automationexercise.com/');
    });
});

