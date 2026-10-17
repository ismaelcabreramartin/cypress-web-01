/********* CHECKOUT *********/

// Seletores usados neste módulo (centralizados para facilitar manutenção)
const seletores = {
    linkCarrinho: '.nav > :nth-child(3) > a',
    linkVerCarrinhoModal: '#cartModal u',
    tabelaCarrinho: '.cart_info',
    botaoProceedToCheckout: '.col-sm-6 > .btn',
    tituloEnderecos: 'h2',
    enderecoEntrega: '#address_delivery',
    enderecoCobranca: '#address_invoice',
    tituloRevisaoPedido: 'h2',
    quantidadeItem: '.cart_info .cart_quantity'
};

// Função auxiliar (interna, não exportada): verifica que o bloco de endereço
// mostra todos os dados do usuário cadastrado
function verificarDadosDoEndereco(seletorBloco, dados) {
  cy.get(seletorBloco).should('be.visible');

  [
    `${dados.primeiroNome} ${dados.sobrenome}`,
    dados.empresa,
    dados.endereco,
    dados.endereco2,
    dados.cidade,
    dados.estado,
    dados.cep,
    dados.pais,
    dados.celular
  ].forEach((valor) => {
    cy.get(seletorBloco).should('contain.text', valor);
  });
}

// Clicar em "View Cart" no modal de produto adicionado
function acessarCarrinhoPeloModal() {
  cy.contains(seletores.linkVerCarrinhoModal, 'View Cart').click();
}

// Verificar que a página do carrinho carregou:
// URL do carrinho e tabela de itens visível
function verificarPaginaDoCarrinhoVisivel() {
  cy.url().should('include', '/view_cart');
  cy.get(seletores.tabelaCarrinho).should('be.visible');
}

// Clicar em "Proceed To Checkout"
function iniciarCheckout() {
  cy.contains(seletores.botaoProceedToCheckout, 'Proceed To Checkout').click();
}

// Verificar que a seção "Address Details" está visível
function verificarPaginaDeEnderecosVisivel() {
  cy.contains(seletores.tituloEnderecos, 'Address Details').should('be.visible');
}

// Verificar que o endereço de entrega ("Your delivery address") corresponde aos dados do cadastro
function verificarEnderecoDeEntrega(dados) {
  verificarDadosDoEndereco(seletores.enderecoEntrega, dados);
}

// Verificar que o endereço de cobrança ("Your billing address") corresponde aos dados do cadastro
function verificarEnderecoDeCobranca(dados) {
  verificarDadosDoEndereco(seletores.enderecoCobranca, dados);
}

// Verificar a seção "Review Your Order": produto, categoria, preço, quantidade e totais
// (produto padrão: Blue Top, Women > Tops, Rs. 500, quantidade 1)
function verificarRevisaoDoPedido({
  nome = 'Blue Top',
  categoria = 'Women > Tops',
  preco = 'Rs. 500',
  quantidade = '1',
  total = 'Rs. 500'
} = {}) {
  cy.contains(seletores.tituloRevisaoPedido, 'Review Your Order').should('be.visible');
  cy.get(seletores.tabelaCarrinho).should('be.visible');

  [nome, categoria, preco, 'Total Amount', total].forEach((valor) => {
    cy.get(seletores.tabelaCarrinho).should('contain.text', valor);
  });

  cy.get(seletores.quantidadeItem).should('contain.text', quantidade);
}

module.exports = {
  acessarCarrinhoPeloModal,
  verificarPaginaDoCarrinhoVisivel,
  iniciarCheckout,
  verificarPaginaDeEnderecosVisivel,
  verificarEnderecoDeEntrega,
  verificarEnderecoDeCobranca,
  verificarRevisaoDoPedido
};