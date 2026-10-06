function nomesParaComparar(registros) {
  const semNome = registros.filter(
    r => typeof r.state?.employee?.name !== 'string' ||
      !r.state.employee.name.trim()
  );

  if (semNome.length) {
    cy.log(
      'Sem nome, fora da comparação por nome: ' +
      semNome.map(r => r.id).join(', ')
    );
  }

  return registros
    .filter(r => !semNome.includes(r))
    .map(r => r.state.employee);
}

describe('API e comparação com a listagem', () => {
  it('GET employees retorna funcionários com nome preenchido', () => {
    cy.request('/employees').then(({ status, body }) => {
      expect(status).to.equal(200);
      expect(body).to.be.an('array');

      const idsSemNome = body
        .filter(r =>
          typeof r.state?.employee?.name !== 'string' ||
          !r.state.employee.name.trim()
        )
        .map(r => r.id);

      expect(
        idsSemNome,
        'IDs de funcionários sem nome: ' + idsSemNome.join(', ')
      ).to.be.empty;
    });
  });

  it('compara o contador e os nomes disponíveis com a tela', () => {
    cy.intercept('GET', '**/employees').as('listar');
    cy.visit('/');

    cy.wait('@listar').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.be.an('array');

      const registros = response.body;
      const ativos = registros.filter(
r => r.state?.employee?.isActive === true      ).length;

      cy.contains(
        new RegExp(`Ativos\\s*${ativos}\\s*/\\s*${registros.length}`)
      ).should('be.visible');

      nomesParaComparar(registros).forEach(funcionario => {
        cy.contains(funcionario.name).should('be.visible');
      });
    });
  });

  it('filtra ativos e restaura os nomes disponíveis ao limpar', () => {
    cy.intercept('GET', '**/employees').as('listar');
    cy.visit('/');

    cy.wait('@listar').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.be.an('array');

      const funcionarios = nomesParaComparar(response.body);
      const nomesAtivos = funcionarios
        .filter(e => e.isActive === true)
        .map(e => e.name);

      const nomesInativos = funcionarios
        .filter(e =>
          e.isActive === false && !nomesAtivos.includes(e.name)
        )
        .map(e => e.name);

      cy.contains('button', 'Ver apenas ativos').click();

      nomesAtivos.forEach(nome => {
        cy.contains(nome).should('be.visible');
      });

      nomesInativos.forEach(nome => {
        cy.contains(nome).should('not.exist');
      });

      cy.contains('button', 'Limpar filtros').click();

      funcionarios.forEach(funcionario => {
        cy.contains(funcionario.name).should('be.visible');
      });
    });
  });
});