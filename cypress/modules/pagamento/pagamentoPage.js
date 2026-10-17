/********* PAGAMENTO *********/

// Importar dados de cadastro (nome, email, senha, etc.) para uso nos testes
    const { gerarDadosCartao } = require('../dados/cartaoDados.js');

    const cartao = gerarDadosCartao();

// Seletores usados neste módulo (centralizados para facilitar manutenção)
const seletores = {
  nomeNoCartao: '[data-qa="name-on-card"]',
  numeroCartao: '[data-qa="card-number"]',
  cvc: '[data-qa="cvc"]',
  mesExpiracao: '[data-qa="expiry-month"]',
  anoExpiracao: '[data-qa="expiry-year"]',
  botaoPagar: '[data-qa="pay-button"]'
};

// Verificar que a página de pagamento carregou:
// URL de pagamento e campos do cartão visíveis
function verificarPaginaDePagamentoVisivel() {
  cy.url().should('include', '/payment');
  cy.get(seletores.nomeNoCartao).should('be.visible');
  cy.get(seletores.numeroCartao).should('be.visible');
  cy.get(seletores.botaoPagar).should('be.visible');
}

// Preencher os dados do cartão (cartão de teste padrão, sem valor real)
function preencherDadosDoPagamento({
  nome = cartao.nome,
  numero = cartao.numero,
  cvc = cartao.cvc,
  mes = cartao.mes,
  ano = cartao.ano
} = {}) {
  cy.get(seletores.nomeNoCartao).type(nome);
  cy.get(seletores.numeroCartao).type(numero);
  cy.get(seletores.cvc).type(cvc);
  cy.get(seletores.mesExpiracao).type(mes);
  cy.get(seletores.anoExpiracao).type(ano);
}

// Clicar em "Pay and Confirm Order"
function confirmarPagamento() {
  cy.get(seletores.botaoPagar).click();
}

// Verificar que o pedido foi confirmado:
// título "Order Placed!" e mensagem de confirmação visíveis
function verificarPedidoConfirmado() {
  cy.contains('Order Placed!').should('be.visible');
  cy.contains('Congratulations! Your order has been confirmed!').should('be.visible');
}

module.exports = {
  verificarPaginaDePagamentoVisivel,
  preencherDadosDoPagamento,
  confirmarPagamento,
  verificarPedidoConfirmado
};