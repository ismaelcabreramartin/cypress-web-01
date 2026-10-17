/// (ajuda o cypress a reconhecer os comandos do cypress e automcomplete os comandos do cypress no editor de código)
/// <reference types="cypress" /> 
require('cypress-xpath');

describe('Automation Exercise Test Suite - XPATH', () => {
  it('Teste 01__xpath - Cadastrar um novo usuário com sucesso', () => {
    cy.visit('https://www.automationexercise.com/');
    //cy.get('a[href="/login"]').click();
    cy.xpath("//a[normalize-space()='Signup / Login']").click();

    //const timestamp = new Date().getTime();

    //cy.get('[data-qa="signup-name"]').type('PGATS Aut01');
    cy.xpath("//input[@placeholder='Name']")
      .clear()
      .type("PGATS Aut01");
        
    //cy.get('[data-qa="signup-email"]').type(`pgats.aut01-${Date.now()}@example.com`);
    cy.xpath("//input[@data-qa='signup-email']")
      .clear()
      .type(`pgats.aut01-${Date.now()}@example.com`);
    
    //cy.get('[data-qa="signup-button"]').click();
    cy.xpath("//button[normalize-space()='Signup']").click();

    // radio buttons
    //cy.get('#id_gender2').check(); // seleciona o radio button "Mrs."
    cy.xpath("//input[@id='id_gender2']").check(); // seleciona o radio button "Mrs."

    //cy.get('[data-qa="password"]').type('123456');
    cy.xpath("//input[@id='password']").type('123456');

    // Selects e Combo Boxes - select
    //cy.get('[data-qa="days"]').select('1');
    cy.xpath("//select[@id='days']").select('1');

    // Adicionar mês e ano
    //cy.get('[data-qa="months"]').select('January');
    cy.xpath("//select[@id='months']").select('January');
    //cy.get('[data-qa="years"]').select('1990');
    cy.xpath("//select[@id='years']").select('1990');

    // checkboxes -> check
    //cy.get('#newsletter').check();
    cy.xpath("//input[@id='newsletter']").check();
    //cy.get('#optin').check();
    cy.xpath("//input[@id='optin']").check();

    // Demais campos do formulário
    //cy.get('[data-qa="first_name"]').type('PGATS');
    cy.xpath("//input[@id='first_name']").type('PGATS');
    //cy.get('[data-qa="last_name"]').type('Aut01'); 
    cy.xpath("//input[@id='last_name']").type('Aut01');
    //cy.get('[data-qa="company"]').type('PGATS Company');
    cy.xpath("//input[@id='company']").type('PGATS Company');
    //cy.get('[data-qa="address"]').type('123 Main St');
    cy.xpath("//input[@id='address1']").type('123 Main St');
    //cy.get('[data-qa="address2"]').type('Apt 4B');
    cy.xpath("//input[@id='address2']").type('Apt 4B');
    //cy.get('[data-qa="country"]').select('United States');
    cy.xpath("//select[@id='country']").select('United States');
    //cy.get('[data-qa="state"]').type('Florida');
    cy.xpath("//input[@id='state']").type('Florida');
    //cy.get('[data-qa="city"]').type('Miami');
    cy.xpath("//input[@id='city']").type('Miami');
    //cy.get('[data-qa="zipcode"]').type('33101');
    cy.xpath("//input[@id='zipcode']").type('33101');
    //cy.get('[data-qa="mobile_number"]').type('+1 305-555-1234');
    cy.xpath("//input[@id='mobile_number']").type('+1 305-555-1234');
    //cy.get('[data-qa="create-account"]').click();
    cy.xpath("//button[normalize-space()='Create Account']").click();

    // cy.get() -> elementos baseados em css selector
    // cy.contains() -> elementos baseados em texto


    cy.contains('Account Created!').should('be.visible');
    cy.xpath("//a[normalize-space()='Continue']").should('be.visible');
  });

  it('Teste 02_xpath - Login User with correct email and password', () => {
    cy.visit('https://www.automationexercise.com/');
    //cy.get('a[href="/login"]').click();
    cy.xpath("//a[normalize-space()='Signup / Login']").click();

    // Assertion
    cy.xpath("//h2[normalize-space()='Login to your account']").should('be.visible');
    cy.xpath("//input[@data-qa='login-email']").should('be.visible');
    cy.xpath("//input[@placeholder='Password']").should('be.visible');

    //cy.get('[data-qa="login-email"]').type('pgats.aut01@test.com');
    cy.xpath("//input[@data-qa='login-email']").type('pgats.aut01@test.com');

    //cy.get('[data-qa="login-password"]').type('123456');
    cy.xpath("//input[@data-qa='login-password']").type('123456');

    //cy.get('[data-qa="login-button"]').click();
    cy.xpath("//button[normalize-space()='Login']").click();

    // Assertion
    cy.xpath("//b[normalize-space()='PGATS AUTO01']").should('contain' , 'PGATS AUTO01');
    cy.xpath("//i[@class='fa fa-user']").should('be.visible');
    cy.xpath("//a[normalize-space()='Logout']").should('be.visible');
  });

  it('Teste 03_xpath - Login User with incorrect email and password', () => {
    cy.visit('https://www.automationexercise.com/');
    //cy.get('a[href="/login"]').click();
    cy.xpath("//a[normalize-space()='Signup / Login']").click();

    //cy.get('[data-qa="login-email"]').type('pgats.aut01@test.com');
    cy.xpath("//input[@data-qa='login-email']").type('pgats.aut01@test.com');

    //cy.get('[data-qa="login-password"]').type('123458');
    cy.xpath("//input[@data-qa='login-password']").type('123458');

    // Click on the login button
    //cy.get('[data-qa="login-button"]').click();
    cy.xpath("//button[normalize-space()='Login']").click();

    // Verificar que a mensagem de erro apareceu
    cy.xpath("//p[normalize-space()='Your email or password is incorrect!']")
      .should('be.visible');
  });

  it('Teste 04_xpath - Logout User', () => {
    cy.visit('https://www.automationexercise.com/');
    //cy.get('a[href="/login"]').click();
    cy.xpath("//a[normalize-space()='Signup / Login']").click();

    // Assertion
    cy.xpath("//h2[normalize-space()='Login to your account']").should('be.visible');
    cy.xpath("//input[@data-qa='login-email']").should('be.visible');
    cy.xpath("//input[@placeholder='Password']").should('be.visible');

    //cy.get('[data-qa="login-email"]').type('pgats.aut01@test.com');
    cy.xpath("//input[@data-qa='login-email']").type('pgats.aut01@test.com');

    //cy.get('[data-qa="login-password"]').type('123456');
    cy.xpath("//input[@data-qa='login-password']").type('123456');

    // Click on the login button
    //cy.get('[data-qa="login-button"]').click();
    cy.xpath("//button[normalize-space()='Login']").click();

    // Assertion
    cy.xpath("//b[normalize-space()='PGATS AUTO01']").should('contain' , 'PGATS AUTO01');
    cy.xpath("//i[@class='fa fa-user']").should('be.visible');
    cy.xpath("//a[normalize-space()='Logout']").should('be.visible');
    
    // Logout
    //cy.get('a[href="/logout"]').click();
    cy.xpath("//a[normalize-space()='Logout']").click();

    // Assertion
    cy.xpath("//h2[normalize-space()='Login to your account']").should('be.visible');
  });

  it('Teste 05_xpath - Register User with existing email', () => {
    cy.visit('https://www.automationexercise.com/');
    //cy.get('a[href="/login"]').click();
    cy.xpath("//a[normalize-space()='Signup / Login']").click();

    //const timestamp = new Date().getTime();

    //cy.get('[data-qa="signup-name"]').type('PGATS Aut01');
    cy.xpath("//input[@placeholder='Name']")
      .clear()
      .type("PGATS Aut01");
        
    //cy.get('[data-qa="signup-email"]').type(`pgats.aut01-${Date.now()}@example.com`);
    cy.xpath("//input[@data-qa='signup-email']")
      .clear()
      .type(`pgats.aut01@test.com`);
    
    //cy.get('[data-qa="signup-button"]').click();
    cy.xpath("//button[normalize-space()='Signup']").click();

    // Verificar que a mensagem de erro apareceu
    cy.xpath("//p[normalize-space()='Email Address already exist!']")
      .should('be.visible');
  });
});