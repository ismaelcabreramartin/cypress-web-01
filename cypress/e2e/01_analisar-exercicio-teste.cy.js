describe('Cadastrar entradas e saídas com bugs', () => {
  it('Cadastrar uma nova transação de entrada - falha 1', () => {
    cy.visit("https://devfinance-agilizei.netlify.app")
 
    cy.contains("Nova Transação").click()
    cy.get("#description").type("Mesada")
    cy.get("#amount").type(100)
    cy.get("#date").type("2023-02-01")

    // Atualizado o codigo aqui
    // cy.contains("Salvar").contains().get().click()
    cy.get('button').click()

  });

  it('Cadastrar uma nova transação de entrada - falha 2', () => {
    cy.visit("https://devfinance-agilizei.netlify.app")

    cy.contains("Nova Transação").click()
    // Atualizado o codigo aqui 
    // cy.get("#description").sendKeys("Mesada")
    // cy.get("#amount").sendKeys(100)
    // cy.get("#date").sendKeys("2023-02-01")

    cy.get("#description").type("Mesada")
    cy.get("#amount").type(100)
    cy.get("#date").type("2023-02-01")

    // Atualizado o codigo aqui
    // cy.contains("Add").click()
    cy.get('button').click()
        
    cy.get("tbody tr").should("have.length", 1)
  });  

  it('Cadastrar uma nova transação de entrada - falha 3', () => {
    // Precisa abrir a página web antes de clicar no botão "Nova Transação"
    cy.visit("https://devfinance-agilizei.netlify.app")

    cy.contains("Nova Transação").click()
    cy.get("#description").type("Mesada")
    cy.get("#amount").type(100)

    // atualizado o codigo aqui, formato da data estava errado, precisa ser no formato yyyy-mm-dd
    // cy.get("#date").type("02/01/2023")
    cy.get("#date").type("2023-02-01")

    cy.contains("Salvar").click()
    
//    cy.get("tbody tr").should("have.length", 1)
  });

  it('Cadastrar uma nova transação de entrada - falha 4', () => {
    cy.visit("https://devfinance-agilizei.netlify.app")

    // Atualizado o codigo aqui, precisa abrir a página web antes e depois clicar no botão "Nova Transação" antes de incluir os dados
    /*cy.get("#amount").type(100)
    cy.get("#description").type("Mesada")
    cy.get("#date").type("2023-02-01")*/

    cy.contains("Nova Transação").click()

    cy.get("#description").type("Mesada")
    cy.get("#amount").type(100)
    cy.get("#date").type("2023-02-01")
    
    cy.contains("Salvar").click()

    cy.get("tbody tr").should("have.length", 1)
  });

  it('Cadastrar uma nova transação de entrada - falha 5', () => {
    cy.visit("https://devfinance-agilizei.netlify.app")

    // Actualizado o codigo aqui, o nome do botão "Nova Transación" estava errado, precisa ser "Nueva Transação"
    // cy.contains("Nueva Transación").click()
    cy.contains("Nova Transação").click()

    cy.get("#description").type("Mesada")
    cy.get("#amount").type(100)
    cy.get("#date").type("2023-02-01")

    cy.contains("Salvar").click()

    cy.get(".alert").should("not.exist")
  });

  // Este teste estava sendo pulado porque tinha o comando it.skip
  it('Cadastrar uma nova transação de entrada - falha 6', () => {
    // Precisa abrir a página web antes de clicar no botão "Nova Transação"
    cy.visit("https://devfinance-agilizei.netlify.app")

    cy.contains("Nova Transação").click()
    cy.get("#description").type("Mesada")
    cy.get("#amount").type(100)
    cy.get("#date").type("2023-02-01")

    cy.contains("Salvar").click()

    // Atualiado o codigo aqui
    // cy.get("tbody tr").should("have.length", 100)
    cy.get("tbody tr").should("have.length", 1)
  });
}); 