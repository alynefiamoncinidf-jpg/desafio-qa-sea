// Cenários sem envio de cadastro. Cada teste começa em uma página nova.
describe('Cadastro de funcionário — funcionamento básico', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.contains('button', '+ Adicionar Funcionário').click();
    cy.contains('h2', 'Adicionar Funcionário').should('be.visible');
  });

  it('bloqueia o envio quando o nome está vazio', () => {
    cy.contains('button', /^Salvar$/).click();
    cy.get('input[name="name"]').should(($campo) => {
      expect($campo[0].validity.valueMissing).to.equal(true);
    });
    cy.focused().should('have.attr', 'name', 'name');
    cy.contains('h2', 'Adicionar Funcionário').should('be.visible');
  });

  it('oculta os campos de EPI e os restaura ao desmarcar a opção', () => {
    cy.get('input[name="caNumber"]').should('be.visible');
    cy.get('input[type="checkbox"]').check();
    cy.get('input[name="caNumber"]').should('not.exist');
    cy.contains('Selecione o EPI:').should('not.exist');
    cy.get('input[type="checkbox"]').uncheck();
    cy.get('input[name="caNumber"]').should('be.visible');
    cy.contains('Selecione o EPI:').should('be.visible');
  });

  it('bloqueia CPF com menos de 11 caracteres antes do envio', () => {
    cy.get('input[name="name"]').type('QA TESTE SEM ENVIO');
    // Teclas nativas: a validação minlength depende de uma edição do usuário.
    cy.get('input[name="cpf"]').focus();
    cy.press('1');
    cy.press('2');
    cy.press('3');
    cy.press(Cypress.Keyboard.Keys.TAB);
    cy.get('input[name="cpf"]').should(($campo) => {
      expect($campo[0].validity.tooShort).to.equal(true);
    });
    cy.contains('button', /^Salvar$/).click();
    cy.focused().should('have.attr', 'name', 'cpf');
    cy.contains('h2', 'Adicionar Funcionário').should('be.visible');
  });
});
