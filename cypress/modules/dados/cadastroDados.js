const { faker } = require('@faker-js/faker');

const PAISES_DISPONIVEIS = [
  'India',
  'United States',
  'Canada',
  'Australia',
  'Israel',
  'New Zealand',
  'Singapore'
];

// Gera um conjunto de dados aleatórios para o cadastro de usuário.
// O e-mail leva um timestamp para evitar colisão com contas já existentes no site.
function gerarDadosCadastro() {
  const primeiroNome = faker.person.firstName();
  const sobrenome = faker.person.lastName();

  // Remove caracteres especiais (ex.: apóstrofo em "O'Connor") para o e-mail ficar válido
  const parteEmail = `${primeiroNome}.${sobrenome}`.replace(/[^a-zA-Z0-9.]/g, '').toLowerCase();

  return {
    nome: `${primeiroNome} ${sobrenome}`,
    email: `${parteEmail}.${Date.now()}@example.com`,
    senha: faker.internet.password({ length: 10 }),

    // Data de nascimento (dia até 28 para valer em qualquer mês)
    diaNascimento: String(faker.number.int({ min: 1, max: 28 })),
    mesNascimento: faker.date.month(),            // ex.: "January"
    anoNascimento: String(faker.number.int({ min: 1960, max: 2000 })),

    primeiroNome,
    sobrenome,
    empresa: faker.company.name(),
    endereco: faker.location.streetAddress(),
    endereco2: faker.location.secondaryAddress(),
    estado: faker.location.state(),
    pais: faker.helpers.arrayElement(PAISES_DISPONIVEIS),
    cidade: faker.location.city(),
    cep: faker.location.zipCode(),
    celular: faker.phone.number()
  };
}

module.exports = {
  gerarDadosCadastro
};