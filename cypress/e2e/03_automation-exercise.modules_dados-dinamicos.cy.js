/// (ajuda o cypress a reconhecer os comandos do cypress e automcomplete os comandos do cypress no editor de código)
/// <reference types="cypress" /> 

// Vou importar as funções do arquivo cadastro/index.js

const cadastro = require('../modules/cadastro/cadastroPage.js');
const login = require('../modules/login/loginPage.js');

/* Importar dados dinâmicos */
const { gerarDadosCadastro } = require('../modules/dados/cadastroDados.js');

const dados = gerarDadosCadastro();

describe('Automation Exercise Test Suite', () => {
  it('Teste 01 - Cadastrar um novo usuário com sucesso', () => {
    // Acessar a página de login
    login.acessarPaginaDeLogin()

    // Verificar que os campos de signup estão visíveis
    cadastro.verificarCamposSignup()

    /* INICIAR CADASTRO */
    //cadastro.iniciarCadastro("PGATS Aut01", `pgats.aut01-${Date.now()}@example.com`);
    cadastro.iniciarCadastro(dados.nome, dados.email);

    /* PREENCHER CADASTRO */
    cadastro.preencherCadastro(dados);

    /* VERIFICAR CADASTRO COM SUCESSO */
    cadastro.verificarCadastroSucesso();

  });

  it('Teste 02 - Login User with correct email and password', () => {
    // Acessar a página de login
    login.acessarPaginaDeLogin()

    // Assertion
    cy.contains('Login to your account').should('be.visible');
    cy.get('[data-qa="login-email"]').should('be.visible');
    cy.get('[data-qa="login-password"]').should('be.visible');

    // ACT
    /* Preencher Login */
    login.preencherLogin(dados.email, dados.senha);

    cy.url().should('include', '/');

    // Assertion
    /* Verificar Login foi efetuado com sucesso */
    login.verificarLoginFoiEfetuadoComSucesso(dados.nome);
  });

  it('Teste 03 - Login User with incorrect email and password', () => {
    // Acessar a página de login
    login.acessarPaginaDeLogin()

    // Verificar que a tela de login carregou
    cy.contains('Login to your account').should('be.visible');

    // Preencher credenciais inválidas
    login.preencherLogin(dados.email, 'senha_invalida');

    // Verificar que a mensagem de erro apareceu
    login.verificarMensagemDeErroLoginInvalido();

  });

  it('Teste 04 - Logout User', () => {
    // Acessar a página principal
    login.acessarPaginaDeLogin()
    
    // Verificar que a tela de login carregou
    cy.contains('Login to your account').should('be.visible');

    // Preencher credenciais válidas
    login.preencherLogin(dados.email, dados.senha);

    // Verificar que o usuário ficou logado
    login.verificarLoginFoiEfetuadoComSucesso(dados.nome);

    // Realizar logout
    login.efetuarLogout();

    // Verificar que voltou para a página de login
    login.verificarLogoutEfetuadoComSucesso();

  });

  it('Teste 05 - Register User with existing email', () => {
    // Acessar a página principal
    login.acessarPaginaDeLogin()

    // Verificar que os campos de signup estão visíveis
    cadastro.verificarCamposSignup()

    // Preencher com um email já existente
    cadastro.iniciarCadastro(dados.nome, dados.email);

    // Verificar a mensagem de erro
    cadastro.verificarMensagemDeErroCadastroEmailExistente()
  });
});