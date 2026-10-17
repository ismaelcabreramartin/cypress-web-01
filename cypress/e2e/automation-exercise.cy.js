/// (ajuda o cypress a reconhecer os comandos do cypress e automcomplete os comandos do cypress no editor de código)
/// <reference types="cypress" /> 

describe('Automation Exercise Test Suite', () => {
  it('Teste 01 - Cadastrar um novo usuário com sucesso', () => {
    cy.visit('https://www.automationexercise.com/');
    cy.get('a[href="/login"]').click();

    cy.contains('Login to your account').should('be.visible');
    cy.get('[data-qa="signup-name"]').should('be.visible');
    cy.get('[data-qa="signup-email"]').should('be.visible');

    cy.get('[data-qa="signup-name"]').type('PGATS Aut01');
    cy.get('[data-qa="signup-email"]').type(`pgats.aut01-${Date.now()}@example.com`);
    cy.get('[data-qa="signup-button"]').click();

    cy.contains('Enter Account Information').should('be.visible');

    cy.get('#id_gender2').check();
    cy.get('[data-qa="password"]').type('123456');
    cy.get('[data-qa="days"]').select('1');
    cy.get('[data-qa="months"]').select('January');
    cy.get('[data-qa="years"]').select('1990');
    cy.get('#newsletter').check();
    cy.get('#optin').check();

    cy.get('[data-qa="first_name"]').type('PGATS');
    cy.get('[data-qa="last_name"]').type('Aut01');
    cy.get('[data-qa="company"]').type('PGATS Company');
    cy.get('[data-qa="address"]').type('123 Main St');
    cy.get('[data-qa="address2"]').type('Apt 4B');
    cy.get('[data-qa="country"]').select('United States');
    cy.get('[data-qa="state"]').type('Florida');
    cy.get('[data-qa="city"]').type('Miami');
    cy.get('[data-qa="zipcode"]').type('33101');
    cy.get('[data-qa="mobile_number"]').type('+1 305-555-1234');

    cy.get('[data-qa="create-account"]').click();

    cy.url().should('include', '/account_created');
    cy.contains('Account Created!').should('be.visible');
    cy.get('[data-qa="continue-button"]').should('be.visible');
  });

  it('Teste 02 - Login User with correct email and password', () => {
    // Acessar a página de login
    cy.visit('https://www.automationexercise.com/');
    cy.get('a[href="/login"]').click();

    // Assertion
    cy.contains('Login to your account').should('be.visible');
    cy.get('[data-qa="login-email"]').should('be.visible');
    cy.get('[data-qa="login-password"]').should('be.visible');

    // ACT
    cy.get('[data-qa="login-email"]').type('pgats.aut01@test.com');
    cy.get('[data-qa="login-password"]').type('123456');

    // 
    cy.get('[data-qa="login-button"]').click();

    cy.url().should('include', '/');

    // Assertion
    cy.get('a > b').should('contain' , 'PGATS AUTO01');
    cy.contains('Logged in as').should('be.visible');
    cy.get('a[href="/logout"]').should('be.visible');
  });

  it('Teste 03 - Login User with incorrect email and password', () => {
    // Acessar a página de login
    cy.visit('https://www.automationexercise.com/');
    cy.get('a[href="/login"]').click();

    // Verificar que a tela de login carregou
    cy.contains('Login to your account').should('be.visible');

    // Preencher credenciais inválidas
    cy.get('[data-qa="login-email"]').type('pgats.aut01@test01.com');
    cy.get('[data-qa="login-password"]').type('123458');

    // Clicar no botão de login
    cy.get('[data-qa="login-button"]').click();

    // Verificar que a mensagem de erro apareceu
    cy.contains('.login-form > form > p', 'Your email or password is incorrect!')
      .should('be.visible');
    
  });

  it('Teste 04 - Logout User', () => {
    // Acessar a página principal
    cy.visit('https://www.automationexercise.com/');

    // Acessar a página de login
    cy.get('a[href="/login"]').click();

    // Verificar que a tela de login carregou
    cy.contains('Login to your account').should('be.visible');

    // Preencher credenciais válidas
    cy.get('[data-qa="login-email"]').type('pgats.aut01@test.com');
    cy.get('[data-qa="login-password"]').type('123456');

    // Clicar no botão de login
    cy.get('[data-qa="login-button"]').click();

    // Verificar que o usuário ficou logado
    cy.contains('Logged in as').should('be.visible');
    cy.get('a[href="/logout"]').should('be.visible');

    // Realizar logout
    cy.get('a[href="/logout"]')
      .should('be.visible')
      .click();

    // Verificar que voltou para a página de login
    cy.contains('Login to your account').should('be.visible');
    cy.get('a[href="/login"]').should('be.visible');
     cy.get('a[href="/logout"]')
      .should('not.exist')
  });

  it('Teste 05 - Register User with existing email', () => {
    // Acessar a página principal
    cy.visit('https://www.automationexercise.com/');

    // Acessar a página de login
    cy.get('a[href="/login"]').click();

    // Verificar que a tela de login carregou
    cy.contains('Login to your account').should('be.visible');

    // Verificar que os campos de signup estão visíveis
    cy.get('[data-qa="signup-name"]').should('be.visible');
    cy.get('[data-qa="signup-email"]').should('be.visible');

    // Preencher com um email já existente
    cy.get('[data-qa="signup-name"]').type('PGATS Aut01');
    cy.get('[data-qa="signup-email"]').type('pgats.aut01@test.com');

    // Clicar em signup
    cy.get('[data-qa="signup-button"]').click();

    // Verificar a mensagem de erro
    cy.contains('.signup-form > form > p','Email Address already exist!')
      .should('be.visible');
  });
});