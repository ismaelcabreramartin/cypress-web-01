/********* CADASTRO *********/

// Seletores usados neste módulo (centralizados para facilitar manutenção)
const seletores = {
  signupNome: '[data-qa="signup-name"]',
  signupEmail: '[data-qa="signup-email"]',
  signupBotao: '[data-qa="signup-button"]',
  linkDeletarConta: 'a[href="/delete_account"]'
};

// Verificar que os campos de signup (nome e email) estão visíveis
function verificarCamposSignup() {
  cy.get(seletores.signupNome).should('be.visible');
  cy.get(seletores.signupEmail).should('be.visible');
}

// Iniciar o cadastro: preencher nome e email e clicar em Signup
function iniciarCadastro(nome, email) {
  cy.get(seletores.signupNome).type(nome);
  cy.get(seletores.signupEmail).type(email);
  cy.get(seletores.signupBotao).click();
}

// Preencher o formulário completo de cadastro e criar a conta
function preencherCadastro(dados) {
  // Informações da conta
  cy.get('#id_gender2').check();
  cy.get('[data-qa="password"]').type(dados.senha);
  cy.get('[data-qa="days"]').select(dados.diaNascimento);
  cy.get('[data-qa="months"]').select(dados.mesNascimento);
  cy.get('[data-qa="years"]').select(dados.anoNascimento);
  cy.get('#newsletter').check();
  cy.get('#optin').check();

  // Informações de endereço
  cy.get('[data-qa="first_name"]').type(dados.primeiroNome);
  cy.get('[data-qa="last_name"]').type(dados.sobrenome);
  cy.get('[data-qa="company"]').type(dados.empresa);
  cy.get('[data-qa="address"]').type(dados.endereco);
  cy.get('[data-qa="address2"]').type(dados.endereco2);
  cy.get('[data-qa="country"]').select(dados.pais);
  cy.get('[data-qa="state"]').type(dados.estado);
  cy.get('[data-qa="city"]').type(dados.cidade);
  cy.get('[data-qa="zipcode"]').type(dados.cep);
  cy.get('[data-qa="mobile_number"]').type(dados.celular);

  // Finalizar: criar a conta
  cy.get('[data-qa="create-account"]').click();
}

// Verificar que o cadastro foi efetuado com sucesso:
// URL de conta criada, mensagem "Account Created!" e botão Continue visíveis
function verificarCadastroSucesso() {
  cy.url().should('include', '/account_created');
  cy.contains('Account Created!').should('be.visible');
  cy.get('[data-qa="continue-button"]').should('be.visible');
}

/* Verificar mensagem de erro de cadastro com email já existente */
function verificarMensagemDeErroCadastroEmailExistente() {
  cy.get('.signup-form > form > p')
      .should('exist')
      .should('be.visible')
      .should('contain', 'Email Address already exist!')
      .and('contain.text', 'Email Address already exist!');
}

/* DELETAR CONTA */

// Deletar a conta do usuário criado (para não poluir o banco de dados)
function deletarConta() {
  cy.get(seletores.linkDeletarConta).click();
}

// Verificar que a conta foi deletada: mensagem "Account Deleted!" e botão Continue visíveis
function verificarContaDeletada() {
  cy.contains('Account Deleted!').should('be.visible');
}

module.exports = {
  verificarCamposSignup,
  iniciarCadastro,
  preencherCadastro,
  verificarCadastroSucesso,
  verificarMensagemDeErroCadastroEmailExistente,
  deletarConta,
  verificarContaDeletada
};