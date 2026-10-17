/// (ajuda o cypress a reconhecer os comandos do cypress e automcomplete os comandos do cypress no editor de código)
/// <reference types="cypress" /> 

// Vou importar as funções do arquivo cadastro/index.js

const cadastro = require('../modules/cadastro/00cadastroPage.js');
const login = require('../modules/login/loginPage.js');

describe('Automation Exercise Test Suite', () => {
  it('Teste 01 - Cadastrar um novo usuário com sucesso', () => {
    // Acessar a página de login
    login.acessarPaginaDeLogin()

    // Verificar que os campos de signup estão visíveis
    cadastro.verificarCamposSignup()

    /* INICIAR CADASTRO */
    cadastro.iniciarCadastro("PGATS Aut01", `pgats.aut01-${Date.now()}@example.com`);

    /* PREENCHER CADASTRO */
    cadastro.preencherCadastro();

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
    login.preencherLogin("pgats.aut01@test.com", "123456");

    cy.url().should('include', '/');

    // Assertion
    /* Verificar Login foi efetuado com sucesso */
    login.verificarLoginFoiEfetuadoComSucesso();
  });

  it('Teste 03 - Login User with incorrect email and password', () => {
    // Acessar a página de login
    login.acessarPaginaDeLogin()

    // Verificar que a tela de login carregou
    cy.contains('Login to your account').should('be.visible');

    // Preencher credenciais inválidas
    login.preencherLogin("pgats.aut01@test01.com", "123456");

    // Verificar que a mensagem de erro apareceu
    login.verificarMensagemDeErroLoginInvalido();

  });

  it('Teste 04 - Logout User', () => {
    // Acessar a página principal
    login.acessarPaginaDeLogin()
    
    // Verificar que a tela de login carregou
    cy.contains('Login to your account').should('be.visible');

    // Preencher credenciais válidas
    login.preencherLogin("pgats.aut01@test.com", "123456");

    // Verificar que o usuário ficou logado
    login.verificarLoginFoiEfetuadoComSucesso()

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
    cadastro.iniciarCadastro("PGATS Aut01", "pgats.aut01@test.com");

    // Verificar a mensagem de erro
    cadastro.verificarMensagemDeErroCadastroEmailExistente()
  });
});

// Login com diferentes perfies de usuários (deletar depois)

const usuarios = [
  { 
    perfil: 'Admin',
    email: 'admin@automationexercise.com',
    senha: 'admin123'
  },
  { 
    perfil: 'Comum',
    email: 'pgats.aut01@test.com',
    senha: '123456'
  },
  { 
    perfil: 'Aluno',
    email: `pgats.aut01-${Date.now()}@example.com`,
    senha: '123456'
  }
];

function autenticarComPerfil(perfil) {
  const usuario = usuarios[perfil];

  cy.get().type(usuario.email);
  cy.get().type(usuario.senha);

  cy.get().click();
}
