# Estado de validação — atualizado em 06/10/2026

## Ambiente de execução

Testes executados no computador da candidata, em Windows,
com Cypress e navegador Chrome, contra o sistema:
https://analista-teste.seatecnologia.com.br/

## Resultados registrados

### formulario.cy.js — 05/10/2026

Resultado: 3 testes aprovados, sem falhas.

- Bloqueio do salvamento com nome obrigatório vazio.
- Ocultação e restauração dos campos de EPI ao alternar a opção.
- Bloqueio de CPF com menos de 11 caracteres.

Esses resultados correspondem à execução daquela data.
Não representam aprovação de todas as validações do formulário.

### api-listagem.cy.js — 06/10/2026

Resultado da execução após a correção: 3 testes com falha.

1. Nome preenchido:
   A consulta GET /employees respondeu HTTP 200 e retornou
   46 registros. O teste identificou 4 registros sem nome
   preenchido no caminho state.employee.name.

2. Comparação do contador e dos nomes com a tela:
   Inicialmente, o próprio teste falhou ao acessar employee
   em um registro sem state. O acesso foi corrigido para
   r.state?.employee?.isActive === true.
   Na nova execução, o teste calculou 43 ativos entre 46 registros,
   mas foi interrompido por uma exceção da aplicação:
   Cannot read properties of undefined (reading 'employee').
   A comparação com a tela não foi concluída.

3. Filtro de ativos:
   Foi registrada uma exceção da aplicação após clicar em
   "Ver apenas ativos", também relacionada ao acesso a employee.
   A verificação do filtro e da limpeza não foi concluída.

As exceções da aplicação foram mantidas visíveis nos testes.

### defeitos.cy.js

Execução ainda não confirmada por evidência.
Não contabilizado como aprovado ou reprovado.

## Bloqueios e limitações

- Em 06/10/2026, por volta das 19h02, foi observado erro HTTP 502
  no acesso manual ao sistema, impedindo a confirmação manual
  do comportamento encontrado na automação.
- A captura recebida dessa tentativa mostra apenas o endereço;
  falta uma captura que também mostre a mensagem 502.
- O ambiente possui dados compartilhados e mutáveis.
  Quantidades e registros podem mudar entre execuções.
- Consultar dados inconsistentes não comprova como foram criados.
- Não houve aprovação integral da suíte nem do sistema.

## Pendências

- Confirmar manualmente o impacto da exceção quando o site voltar.
- Executar a suíte defeitos.cy.js e registrar o resultado.
- Organizar as evidências e atualizar a documentação no GitHub.