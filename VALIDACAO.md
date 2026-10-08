# Estado de validação — revisão de 08/10/2026

Horários e datas referem-se ao horário de Brasília. Execuções realizadas no Windows da candidata, com Node.js 24.21.0, Cypress 16.1.1 e Chrome 154 em modo headless. Alvo: https://analista-teste.seatecnologia.com.br/.

## Execução padrão — 07/10, saída recebida às 23h36

Comando: npm.cmd test -- --browser chrome.

| Cenário | Resultado | Interpretação |
| --- | --- | --- |
| Nome obrigatório vazio | Aprovado | Bloqueio e foco no campo |
| Alternância da opção de EPI | Aprovado | Campos ocultados e restaurados |
| CPF com menos de 11 caracteres | Aprovado | Bloqueio de comprimento; não valida dígitos verificadores |
| GET /employees com nomes preenchidos | Falha | HTTP 200 e array; IDs sem nome: 5ad7, 6d9e, ca3f, 8f00 |
| Contador e nomes na interface | Falha | Exceção da aplicação: Cannot read properties of undefined (reading 'employee'); comparação não concluída |
| Filtro de ativos e limpeza | Falha | Mesma exceção da aplicação; verificações não concluídas |

Resultado do comando: 6 cenários, 3 aprovados e 3 falhas. O Cypress gerou três screenshots de falha. A saída original enviada pela candidata está em evidencias/execucao_padrao_07OUT.txt.

## Suíte de defeitos — 07/10–08/10, resultado recebido às 00h02

Comando: npm.cmd run test:defeitos -- --browser chrome.

Resultado: 0 aprovados, 1 falha e 2 pendentes.

- Botão Adicionar outra atividade: esperado type=button, observado type=submit; falhou após timeout de 15 segundos.
- CPF inválido e fechamento por atividade: pendentes por it.skip, pois executarCadastros não foi habilitado. Não foram exercitados nessa execução.
- Um screenshot de falha foi gerado no computador da candidata; ainda não incluído neste pacote.

Antes desse reteste, a suíte falhou ao carregar porque Cypress.env() foi removido no Cypress 16. A leitura foi corrigida para Cypress.expose('executarCadastros') === true e o comando opcional foi migrado para --expose. Essa falha de automação é anterior à execução dos cenários e não entra no total consolidado.

## Total consolidado de duas execuções

9 cenários: 3 aprovados, 4 falhas e 2 pendentes. Duas das falhas representam interrupção por exceção da aplicação antes da conclusão das asserções de comparação. Não há aprovação integral do sistema.

## Consulta manual à API e acesso — 07/10

O JSON enviado às 22h48 contém 47 registros, 43 com isActive estritamente true. A quantidade corresponde a essa amostra e não deve ser fixada em testes futuros.

Há dois registros sem state (ca3f, 8f00) e dois com employee sem nome (5ad7, 6d9e). Esses dados são compatíveis com o tipo de exceção observado; a causa completa da tela vazia não foi isolada.

A listagem abriu na janela anônima. Nos dois prints complementares de Request Headers não aparecem Authorization nem Cookie. Um print anterior documenta GET /employees com HTTP 200 e Content-Type application/json, em outra captura. Não se presume que todas as capturas sejam do mesmo pedido.

## Validação desta revisão de arquivos

O pacote mantém as asserções das execuções recebidas. Alterações adicionais: comentário --expose, comando opcional em package.json, formatação de API e documentação. Sintaxe dos arquivos JavaScript e JSON conferida localmente. Isso não equivale a uma nova execução E2E; não foi feita outra execução no ambiente do assistente.

## Limitações

Ambiente compartilhado; dados podem mudar. Não se sabe como todos os registros foram criados. Não houve teste final dos cenários que criam cadastros nem cobertura completa de segurança, anexos ou edição. O erro 502 foi relatado em tentativas anteriores, mas não explica por si só as exceções registradas nas execuções atuais.
