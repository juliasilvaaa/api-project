// Describe - Espoco maior do teste
describe("Teste login", () => {
  const strapiUrl = "https://sbtnews-cms-dev.sbtlab.io/admin/";

  const inputEmail = 'input[name="email"]'
  const inputPassword = 'input[name="password"]'
  const ButtonLogin = '.sc-cPiKLX'

  // It são os testes individuais
  // ' ' - Primeiro parametro
  it("login bem sucedido", () => {
    cy.visit(strapiUrl);

    // Get no input com name 'email', inserindo text no campo de entrada
    cy.get(inputEmail).type("jupsilva@sbt.com.br");

    cy.get(inputPassword).type("261206Ju@");

    cy.get(ButtonLogin).click();

    // Pegando a url que estamos, 'should' e deve incluir o /admin (direcionando para a url esperada)
    cy.url().should("include", "/admin");
  });

  // Verificar se o campo esta indo vazio, e a mensagem de erro é a mesma
  it("campos vazios", () => {
    cy.visit(strapiUrl);

    cy.get(inputEmail);

    cy.get(inputPassword);
    cy.get(ButtonLogin).click();

    // Be-visible - Afirma que um elemento está visivel e 'contain' contém um texto especifico
    // cy.get('#\:r4\:-error').should("be-visible").and("contain", "This value is required.");
    cy.contains("This value is required.").should("be.visible");
  });

  // Senha errada, E-mail errado
  it("Invalid Credential", () => {
    cy.visit(strapiUrl);
    cy.get(inputEmail).type("jupsilva@sbt.com.br");

    cy.get(inputPassword).type('senha123', { sensitive: true } as any);
    cy.get(ButtonLogin).click();

    cy.get("#global-form-error").should("be.visible");
  });

  // Uso de e-mail invalido
  it("Invalid E-mail", () => {
    cy.visit(strapiUrl);
    cy.get(inputEmail).type("jupsilva@");

    cy.get(inputPassword).type("senha123");
    cy.get(ButtonLogin).click();

    cy.get("#\\:r4\\:-error").should("be.visible");
  });
});
