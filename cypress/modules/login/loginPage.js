/********* LOGIN ************/

// Seletores usados neste módulo (centralizados para facilitar manutenção)
const seletores = {
  linkLogin: 'a[href="/login"]',
  linkLogout: "a[href='/logout']",
  emailLogin: '[data-qa="login-email"]',
  senhaLogin: '[data-qa="login-password"]',
  botaoLogin: '[data-qa="login-button"]',
  erroLogin: '.login-form > form > p'
};

// Função auxiliar (interna, não exportada): verifica se uma mensagem de erro
// está visível e contém o texto esperado
function verificarMensagemDeErro(seletor, texto) {
  cy.get(seletor)
    .should('be.visible')
    .and('contain', texto);
}

// Acessar a página de login
function acessarPaginaDeLogin() {
  cy.visit('/');
  cy.get(seletores.linkLogin).click();
  cy.contains('Login to your account').should('be.visible');
}

// Preencher login com email e senha e clicar no botão de login
function preencherLogin(email, senha) {
  cy.get(seletores.emailLogin).type(email);
  cy.get(seletores.senhaLogin).type(senha);
  cy.get(seletores.botaoLogin).click();
}

// Verificar que o login foi efetuado com sucesso:
// mostra "Logged in as <nome>" (nome padrão: PGATS AUTO01) e o link de logout fica visível
function verificarLoginFoiEfetuadoComSucesso(nomeUsuario) {
  cy.contains('a', 'Logged in as')
    .should('be.visible')
    .find('b')
    .should('contain', nomeUsuario);

  cy.get(seletores.linkLogout).should('be.visible');
}

// Verificar mensagem de erro de login inválido (email ou senha incorretos)
function verificarMensagemDeErroLoginInvalido() {
  verificarMensagemDeErro(seletores.erroLogin, 'Your email or password is incorrect!');
}

/* LOGOUT */

// Efetuar logout clicando no link de logout
function efetuarLogout() {
  cy.get(seletores.linkLogout)
    .should('be.visible')
    .click();
}

// Verificar que o logout foi efetuado com sucesso:
// volta para a tela de login, link de login visível e link de logout ausente
function verificarCamposLoginVisiveis() {
  // Assertion
    cy.contains('Login to your account').should('be.visible');
    cy.get(seletores.emailLogin).should('be.visible');
    cy.get(seletores.senhaLogin).should('be.visible');
}

// Verificar que o logout foi efetuado com sucesso:
// volta para a tela de login, link de login visível e link de logout ausente
function verificarLogoutEfetuadoComSucesso() {
  cy.contains('Login to your account').should('be.visible');
  cy.get(seletores.linkLogin).should('be.visible');
  cy.get(seletores.linkLogout).should('not.exist');
}

module.exports = {
  acessarPaginaDeLogin,
  preencherLogin,
  verificarLoginFoiEfetuadoComSucesso,
  verificarMensagemDeErroLoginInvalido,
  efetuarLogout,
  verificarLogoutEfetuadoComSucesso,
  verificarCamposLoginVisiveis
};