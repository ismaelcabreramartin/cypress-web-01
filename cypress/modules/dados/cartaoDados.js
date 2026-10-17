const { faker } = require('@faker-js/faker');

// Gera dados aleatórios de cartão de crédito para o pagamento (valores fictícios, só para teste).
// As chaves (nome, numero, cvc, mes, ano) são as mesmas que preencherDadosDoPagamento() recebe,
// então o objeto pode ser passado direto para ela.
// O nome pode ser informado para ficar igual ao do usuário cadastrado.
function gerarDadosCartao(nome = faker.person.fullName()) {
  const anoAtual = new Date().getFullYear();

  return {
    nome,

    // Remove hífens e espaços para ficar só com dígitos
    numero: faker.finance.creditCardNumber({ issuer: 'visa' }).replace(/\D/g, ''),
    cvc: faker.finance.creditCardCVV(),

    // Validade sempre no futuro: mês com 2 dígitos e ano entre o próximo e daqui a 8 anos
    mes: String(faker.number.int({ min: 1, max: 12 })).padStart(2, '0'),
    ano: String(faker.number.int({ min: anoAtual + 1, max: anoAtual + 8 }))
  };
}

module.exports = {
  gerarDadosCartao
};