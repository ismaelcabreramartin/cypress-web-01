/********* PRODUTOS *********/

// Seletores usados neste módulo (centralizados para facilitar manutenção)
const seletores = {
  linkProdutos: 'a[href="/products"]',
  tituloPagina: '.features_items .title',
  listaProdutos: '.features_items',
  itemProduto: '.features_items .product-image-wrapper',
  linkVerProduto: 'a[href^="/product_details"]',
  detalhesProduto: '.product-information',
  nomeProduto: '.product-information h2',
  campoBusca: '#search_product',
  botaoBusca: '#submit_search',
  tituloSubscription: '.single-widget h2',
  campoEmailSubscription: '#susbscribe_email',
  campoBotaoSubscription: '#subscribe',
  modalCarrinho: '#cartModal',
  conteudoModalCarrinho: '#cartModal .modal-content'
};

// Acessar a página de produtos pelo menu
function acessarPaginaDeProdutos() {
  cy.get(seletores.linkProdutos).click();
}

// Verificar que a página "All Products" carregou:
// título visível, lista visível e com pelo menos um produto
function verificarPaginaDeProdutosVisivel() {
  cy.get(seletores.tituloPagina)
    .should('be.visible')
    .and('contain', 'All Products');

  cy.get(seletores.listaProdutos).should('be.visible');
  cy.get(seletores.itemProduto).should('have.length.greaterThan', 0);
}

// Clicar em "View Product" do primeiro produto da lista
function acessarDetalhesDoPrimeiroProduto() {
  cy.get(seletores.itemProduto)
    .first()
    .find(seletores.linkVerProduto)
    .click();
}

// Verificar a página de detalhes do produto:
// nome, categoria, preço, disponibilidade, condição e marca
function verificarDetalhesDoProduto() {
  cy.get(seletores.detalhesProduto).should('be.visible');
  cy.get(seletores.nomeProduto).should('be.visible');

  ['Category:', 'Availability:', 'Condition:', 'Brand:'].forEach((campo) => {
    cy.contains(`${seletores.detalhesProduto} p`, campo).should('be.visible');
  });

  cy.get(seletores.detalhesProduto).should('contain.text', 'Rs.');
}

// Verificar que o campo de busca e o botão de busca estão visíveis
function verificarCampoDeBuscaVisivel() {
  cy.get(seletores.campoBusca).should('be.visible');
  cy.get(seletores.botaoBusca).should('be.visible');
}

// Buscar um produto pelo nome e clicar no botão de busca
// (nome padrão: Stylish Dress)
function buscarProduto(nomeProduto) {
  cy.get(seletores.campoBusca).type(nomeProduto);
  cy.get(seletores.botaoBusca).click();

  // Verificar que a página de produtos carregou com os resultados da busca
    cy.get('.features_items').contains(nomeProduto).should('be.visible');
}

// Rolar até a seção Subscription e verificar que o título e o campo de e-mail estão visíveis
function verificarSubscriptionVisivel() {
  cy.contains(seletores.tituloSubscription, 'Subscription')
    .scrollIntoView()
    .should('be.visible');

  cy.get(seletores.campoEmailSubscription).should('be.visible');
}

// Digitar o e-mail no campo de Subscription (e-mail padrão: test@example.com)
function preencherEmailDeSubscription(email = 'test@example.com') {
  cy.get(seletores.campoEmailSubscription).type(email);
  cy.get(seletores.campoBotaoSubscription).click();
  
  // Verificar que a mensagem de sucesso está visível
  cy.get('.alert-success')
    .should('be.visible')
    .and('contain', 'You have been successfully subscribed!');
}

// Verificar que o modal de produto adicionado ao carrinho está visível
// e mostra a mensagem de confirmação
function verificarProdutoAdicionadoAoCarrinho() {
  cy.get(seletores.modalCarrinho).should('be.visible');
  cy.get(seletores.conteudoModalCarrinho)
    .should('contain.text', 'Your product has been added to cart.');
}

module.exports = {
  acessarPaginaDeProdutos,
  verificarPaginaDeProdutosVisivel,
  acessarDetalhesDoPrimeiroProduto,
  verificarDetalhesDoProduto,
  verificarCampoDeBuscaVisivel,
  buscarProduto,
  verificarSubscriptionVisivel,
  preencherEmailDeSubscription,
  verificarProdutoAdicionadoAoCarrinho
};