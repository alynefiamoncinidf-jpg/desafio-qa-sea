// Esta suíte verifica comportamentos esperados. Bugs atuais podem causar falhas.
// Os casos que enviam formulários só rodam com --expose executarCadastros=true.
const testeComCadastro = Cypress.expose('executarCadastros') === true ? it : it.skip;
function preencherFuncionario(cpf, nascimento = '1990-01-01') {
  const nome = `QA AUTO ${Date.now()} ${Cypress._.random(1000, 9999)}`;
  cy.get('input[name="name"]').type(nome);
  cy.get('input[name="cpf"]').type(cpf);
  cy.get('input[name="birthDay"]').type(nascimento);
  cy.get('input[name="rg"]').type('RG-TESTE');
  return nome;
}

describe('Cadastro de funcionário — regressão dos achados', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.contains('button', '+ Adicionar Funcionário').click();
    cy.contains('h2', 'Adicionar Funcionário').should('be.visible');
  });

  it('Adicionar outra atividade não deve ser botão de envio', () => {
    cy.contains('button', /^Adicionar outra atividade$/).should(($botao) => {
      expect($botao[0].type).to.equal('button');
    });
  });

  testeComCadastro('não deve salvar funcionário com CPF inválido', () => {
    // Sequência repetida: CPF sabidamente inválido e fictício.
    preencherFuncionario('11111111111');
    cy.get('input[type="checkbox"]').check();
    cy.contains('button', /^Salvar$/).click();
    // O formulário deve permanecer aberto para corrigir o CPF.
    cy.contains('h2', 'Adicionar Funcionário').should('be.visible');
    // Texto de erro deve ser incluído na asserção após confirmar a regra/UX.
  });

  testeComCadastro('Adicionar outra atividade não deve fechar o cadastro', () => {
    preencherFuncionario('11111111111');
    cy.get('input[name="caNumber"]').type('12345');
    cy.contains('button', /^Adicionar outra atividade$/).click();
    cy.contains('h2', 'Adicionar Funcionário').should('be.visible');
    // Uma nova atividade deve gerar mais de um seletor de atividade.
    cy.contains('Selecione a atividade:').should('be.visible');
  });
});
