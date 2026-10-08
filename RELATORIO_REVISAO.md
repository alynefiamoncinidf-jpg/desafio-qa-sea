# Relatório de revisão — desafio QA SEA

Alyne Fiamoncini — 08/10/2026. Ambiente: https://analista-teste.seatecnologia.com.br/.

## Achados prioritários comprovados no reteste

### D01 — Exceção da aplicação interrompe comparação e filtro

Severidade alta; prioridade P1. Na execução de 07/10, os cenários de comparação de contador/nomes e filtro foram interrompidos por Cannot read properties of undefined (reading 'employee'), originado do código da aplicação. Impacto: impede concluir o fluxo exercitado. Não está comprovada uma divergência numérica de contador.

Reprodução automatizada: executar npm test -- --browser chrome com os dados atuais; observar os dois cenários de api-listagem.cy.js. Esperado: aplicação mantém a lista utilizável e permite comparar/filtrar. Observado: exceção interrompe os testes. Evidência: evidencias/execucao_padrao_07OUT.txt. O estado compartilhado pode mudar a reprodução.

### D02 — Listagem retorna registros sem nome ou estrutura de funcionário

Severidade alta; prioridade P1. GET /employees responde 200 e retorna array, mas os IDs 5ad7, 6d9e, ca3f e 8f00 não apresentam nome preenchido. No JSON manual recebido em 07/10, ca3f e 8f00 contêm apenas ID, sem state; 5ad7 e 6d9e têm employee sem name.

Reprodução: consultar /employees e verificar state.employee.name; executar o primeiro cenário de api-listagem.cy.js. Esperado, pela premissa do cadastro: cada registro tem estrutura e nome utilizáveis. Observado: quatro registros inconsistentes. Impacto: integridade e tratamento da listagem. Não se comprovou como foram criados nem a relação causal completa com D01.

### D03 — Botão auxiliar tem tipo de envio

Severidade média; prioridade P1 para investigação do fluxo. Abra o cadastro e inspecione a propriedade type do botão Adicionar outra atividade. Esperado: button; observado no reteste recebido em 08/10: submit. A suíte defeitos.cy.js confirma essa diferença após 15 segundos.

Impacto potencial: acionamento de envio por uma ação auxiliar. Esta asserção estrutural não comprova persistência, fechamento ou criação de outra linha. Fechamento foi observado historicamente em algumas repetições, sem confirmação de persistência em todas elas. Dois testes comportamentais opcionais ficaram pendentes.

## Observações manuais e de API com limites

### O01 — Tela vazia após tentativa de salvar

Na gravação 2026-10-07 00-04-30.mp4, após Salvar, por volta de 58 segundos, a interface desaparece e permanece vazia até o fim, por volta de 78 segundos. Impacto observado alto; P1 para reprodução isolada. O formulário contém várias entradas inválidas e há anexo selecionado; causa e persistência do cadastro não foram confirmadas. Não há mensagem 502 visível nessa gravação.

### O02 — Dados inválidos persistidos

Amostras históricas de JSON incluem CPF com letras/símbolos e nascimento em 2030. A amostra de 07/10 inclui CPF composto por espaço (d6e3, fea1), usos de EPI como strings em vez de booleanos (2cfe, fd85) e valores de campos aparentemente deslocados. Impacto de integridade alto; P1. Consultar esses registros comprova os valores retornados, mas não prova criação direta pela API nem validação uniforme de todas as entradas. A regra de nascimento deve ser confirmada.

### O03 — Layout e inclusão de linhas

Sobreposições foram documentadas pela candidata em capturas históricas. A gravação e o reteste histórico não mostram claramente uma segunda linha após Adicionar EPI. Prioridade P2: reproduzir em viewport identificado e com dados válidos, registrando antes/depois. Textos Lorem ipsum e menus sem resposta clara são observações para confirmar com os requisitos, sem pressupor que cada item seja uma página implementada.

### S01 — Listagem acessível na janela anônima

A candidata abriu /employees em janela anônima, sem realizar login nessa sequência, e visualizou JSON com campos de nome, CPF, RG e nascimento. Captura às 23h13 de 07/10 mostra URL e indicador Anônima. Dois prints complementares de Request Headers, às 23h21 e 23h26, não mostram Authorization ou Cookie. Um print anterior documenta GET /employees, HTTP 200 e Content-Type application/json; ele não é identificado como o mesmo pedido da janela anônima.

Reprodução: abrir nova janela anônima; acessar /employees; observar resposta e cabeçalhos no Network após recarga. Política esperada de acesso ainda não fornecida: tratar como risco a validar, com P1 se essas informações deveriam ser restritas. Não se afirma presença de dados reais, violação legal, permissão de escrita, nem exploração de CORS. Evidências de cabeçalhos estão no diretório evidencias; a captura com dados identificadores foi mantida fora deste pacote destinado ao repositório.

## Execução e estratégia

Suíte padrão em 07/10: 3 aprovados e 3 falhas. Suíte de defeitos em 07/10–08/10: 1 falha e 2 pendentes. Não há aprovação integral. A suíte teve uma falha anterior do próprio código, Cypress.env() incompatível com versão 16, corrigida antes do reteste.

Próximos passos recomendados: cadastro positivo com persistência, isolamento da tela vazia, política de autorização, validações por um fator, inclusão de linhas e upload completo. Consulte PLANO_E_ESTRATEGIA.md e VALIDACAO.md.
