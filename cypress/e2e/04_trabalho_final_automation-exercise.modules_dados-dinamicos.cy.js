/// (ajuda o cypress a reconhecer os comandos do cypress e automcomplete os comandos do cypress no editor de código)
/// <reference types="cypress" /> 

// Vou importar as funções do arquivo cadastro/index.js

const cadastro = require('../modules/cadastro/cadastroPage.js');
const login = require('../modules/login/loginPage.js');
const produtos = require('../modules/Produtos/produtosPage.js');
const checkout = require('../modules/checkout/checkoutPage.js');
const cartao = require('../modules/pagamento/pagamentoPage.js');

/* Importar dados dinâmicos */
const { gerarDadosCadastro } = require('../modules/dados/cadastroDados.js');

const dados = gerarDadosCadastro();

describe('Automation Exercise Test Suite', () => {
  let usuarios;

  before(() => {
    cy.fixture('usuarios').then((dados) => {
      usuarios = dados;
    });
  });

  it('Teste 01 - TC01 Cadastrar um novo usuário com sucesso', () => {
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

  it('Teste 02 - TC02 Login User with correct email and password', () => {
    // Acessar a página de login
    login.acessarPaginaDeLogin()

    // Assertion
    login.verificarCamposLoginVisiveis()

    // ACT
    /* Preencher Login */
    login.preencherLogin(dados.email, dados.senha);

    cy.url().should('include', '/');

    // Assertion
    /* Verificar Login foi efetuado com sucesso */
    login.verificarLoginFoiEfetuadoComSucesso(dados.nome);
  });

  it('Teste 03 - TC03 Login User with incorrect email and password', () => {
    // Acessar a página de login
    login.acessarPaginaDeLogin()

    // Verificar que a tela de login carregou
    cy.contains('Login to your account').should('be.visible');

    // Preencher credenciais inválidas
    login.preencherLogin(dados.email, 'senha_invalida');

    // Verificar que a mensagem de erro apareceu
    login.verificarMensagemDeErroLoginInvalido();

  });

  it('Teste 04 - TC04 Logout User', () => {
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

  it('Teste 05 - TC05 Register User with existing email', () => {
    // Acessar a página principal
    login.acessarPaginaDeLogin()

    // Verificar que os campos de signup estão visíveis
    cadastro.verificarCamposSignup()

    // Preencher com um email já existente
    cadastro.iniciarCadastro(dados.nome, dados.email);

    // Verificar a mensagem de erro
    cadastro.verificarMensagemDeErroCadastroEmailExistente()
  });

  it('Teste 06 - TC08 Verify All Products and product detail page', () => {
    const usuario = usuarios.find(u => u.perfil === 'Comum');

    // Acessar a página de login
    login.acessarPaginaDeLogin()

    // Assertion
    login.verificarCamposLoginVisiveis()

    // ACT
    /* Preencher Login */
    login.preencherLogin(usuario.email, usuario.senha);

    cy.url().should('include', '/');

    // Assertion
    /* Verificar Login foi efetuado com sucesso */
    login.verificarLoginFoiEfetuadoComSucesso(usuario.nome);

    // Acessar a página de produtos
    produtos.acessarPaginaDeProdutos();

    // Verificar que a página de produtos carregou
    produtos.verificarPaginaDeProdutosVisivel();

    // Verifica o primeiro produto da lista
    produtos.acessarDetalhesDoPrimeiroProduto();

    // Verificar os detalhes do produto
    produtos.verificarDetalhesDoProduto();
  });

  it('Teste 07 - TC09 Search Product', () => {
    // Acessar a página principal
    cy.visit('/');

    // Acessar a página de produtos
    produtos.acessarPaginaDeProdutos();

    // Verificar que a página de produtos carregou
    produtos.verificarPaginaDeProdutosVisivel();

    // Verificar que o campo de busca e o botão de busca estão visíveis
    produtos.verificarCampoDeBuscaVisivel();

    // Pesquisar por um produto específico
    produtos.buscarProduto('Men Tshirt');
  });

  it('Teste 08 - TC10 Verify Subscription in home page', () => {
    // Acessar a página principal
    cy.visit('/');

    // Acessar a página de produtos
    produtos.acessarPaginaDeProdutos();

    // Verificar que a página de produtos carregou
    produtos.verificarPaginaDeProdutosVisivel();

    // Rolar até o próprio elemento (geralmente a melhor opção)
    produtos.verificarSubscriptionVisivel();

    // Preencher o campo de e-mail de subscription
    produtos.preencherEmailDeSubscription('test@example.com');
  });

  it('Teste 09 - TC15 Place Order: Register before Checkout', () => {
    const dadosCompra = gerarDadosCadastro();
    // Acessar a página de login
    login.acessarPaginaDeLogin()

    // Verificar que os campos de signup estão visíveis
    cadastro.verificarCamposSignup()

    /* INICIAR CADASTRO */
    //cadastro.iniciarCadastro("PGATS Aut01", `pgats.aut01-${Date.now()}@example.com`);
    cadastro.iniciarCadastro(dadosCompra.nome, dadosCompra.email);

    /* PREENCHER CADASTRO */
    cadastro.preencherCadastro(dadosCompra);

    /* VERIFICAR CADASTRO COM SUCESSO */
    cadastro.verificarCadastroSucesso();

    // Acessar a página de produtos
    produtos.acessarPaginaDeProdutos();

    // Verificar que a página de produtos carregou
    produtos.verificarPaginaDeProdutosVisivel();

    cy.get('.features_items .product-image-wrapper')
      .first()
      .find('.add-to-cart')
      .first()
      .click({ force: true });

    // Verificar que o modal de produto adicionado ao carrinho está visível
    produtos.verificarProdutoAdicionadoAoCarrinho();

    // Clicar no botão "View Cart" no modal
    checkout.acessarCarrinhoPeloModal();

    // Verificar que a página de carrinho carregou
    checkout.verificarPaginaDoCarrinhoVisivel();

    // Clicar no botão "Proceed To Checkout"
    checkout.iniciarCheckout();

    // Verificar que a página de endereços carregou
    checkout.verificarPaginaDeEnderecosVisivel();

    // Verificar que o endereço de entrega corresponde aos dados do cadastro
    checkout.verificarEnderecoDeEntrega(dadosCompra);

    // Verificar que o endereço de cobrança corresponde aos dados do cadastro
    checkout.verificarEnderecoDeCobranca(dadosCompra);

    // Verificar a seção "Review Your Order"
    checkout.verificarRevisaoDoPedido();

    // Enter description in comment text area and click 'Place Order'
    cy.get('.form-control').type('Testando o checkout de pagamento com o Cypress');
    cy.get(':nth-child(7) > .btn').click();

    // Verificar que a página de pagamento carregou
    cy.url().should('include', '/payment');

    // Preencher os dados do cartão de pagamento
    cartao.verificarPaginaDePagamentoVisivel();
    cartao.preencherDadosDoPagamento();

    // Clicar em "Pay and Confirm Order"
    cartao.confirmarPagamento();

    // Verificar que o pedido foi confirmado
    cartao.verificarPedidoConfirmado();

    // Deletar a conta do usuário
    cadastro.deletarConta();
    cadastro.verificarContaDeletada();

  });

  it('Teste 10 - TC16 Place Order: Login before Checkout', () => {
    // Acessar a página de login
    login.acessarPaginaDeLogin()

    // Assertion
    login.verificarCamposLoginVisiveis()

    // ACT
    /* Preencher Login */
    login.preencherLogin(dados.email, dados.senha);

    cy.url().should('include', '/');

    // Assertion
    /* Verificar Login foi efetuado com sucesso */
    login.verificarLoginFoiEfetuadoComSucesso(dados.nome);

    // Acessar a página de produtos
    produtos.acessarPaginaDeProdutos();

    // Verificar que a página de produtos carregou
    produtos.verificarPaginaDeProdutosVisivel();

    cy.get('.features_items .product-image-wrapper')
      .first()
      .find('.add-to-cart')
      .first()
      .click({ force: true });

    // Verificar que o modal de produto adicionado ao carrinho está visível
    produtos.verificarProdutoAdicionadoAoCarrinho();

    // Clicar no botão "View Cart" no modal
    checkout.acessarCarrinhoPeloModal();

    // Verificar que a página de carrinho carregou
    checkout.verificarPaginaDoCarrinhoVisivel();

    // Clicar no botão "Proceed To Checkout"
    checkout.iniciarCheckout();

    // Verificar que a página de endereços carregou
    checkout.verificarPaginaDeEnderecosVisivel();

    // Verificar que o endereço de entrega corresponde aos dados do cadastro
    checkout.verificarEnderecoDeEntrega(dados);

    // Verificar que o endereço de cobrança corresponde aos dados do cadastro
    checkout.verificarEnderecoDeCobranca(dados);

    // Verificar a seção "Review Your Order"
    checkout.verificarRevisaoDoPedido();

    // Enter description in comment text area and click 'Place Order'
    cy.get('.form-control').type('Testando o checkout de pagamento com o Cypress');
    cy.get(':nth-child(7) > .btn').click();

    // Verificar que a página de pagamento carregou
    cy.url().should('include', '/payment');

    // Preencher os dados do cartão de pagamento
    cartao.verificarPaginaDePagamentoVisivel();
    cartao.preencherDadosDoPagamento();

    // Clicar em "Pay and Confirm Order"
    cartao.confirmarPagamento();

    // Verificar que o pedido foi confirmado
    cartao.verificarPedidoConfirmado();

    // Deletar a conta do usuário
    cadastro.deletarConta();
    cadastro.verificarContaDeletada();

  });

});


