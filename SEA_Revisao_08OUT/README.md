# Desafio QA SEA — Cypress

Autoria: Alyne Fiamoncini. Revisão: 08/10/2026.

Alvo: https://analista-teste.seatecnologia.com.br/

Automação de validações do formulário, integridade da listagem e comparação entre interface e API. As expectativas representam o comportamento esperado; falhas são investigadas e registradas em VALIDACAO.md.

## Instalação

Pré-requisitos: Node.js e Google Chrome instalados. Ambiente das execuções registradas: Windows, Node.js 24.21.0, Cypress 16.1.1 e Chrome 154.

Abra a pasta que contém package.json no VS Code e use Terminal > Novo Terminal. Instale as dependências conforme o lockfile:

```sh
npm ci
```

No PowerShell, se houver bloqueio do script npm.ps1, use npm.cmd no lugar de npm.

## Execução

```sh
# Interface interativa
npm run cy:open

# Formulário e API/listagem: seis cenários
npm test -- --browser chrome

# Suíte de defeitos: um cenário habilitado e dois pendentes
npm run test:defeitos -- --browser chrome

# Apenas API/listagem
npm run test:api -- --browser chrome
```

Na interface do Cypress, escolha E2E Testing, Chrome e o arquivo desejado. A execução local não exige Cypress Cloud.

Comando opcional que habilita dois cenários com envio de formulários:

```sh
npm run test:cadastros -- --browser chrome
```

Esse comando pode criar até dois registros fictícios por execução. Não há limpeza automática: não foi confirmado um fluxo seguro de exclusão. Execute apenas no ambiente do desafio. Os dois cenários têm asserções parciais, descritas abaixo, e não foram executados no reteste final.

## Cobertura e resultados

| Arquivo | Cobertura | Último resultado comprovado |
| --- | --- | --- |
| formulario.cy.js | Nome obrigatório, alternância de EPI, CPF curto | 07/10: 3 aprovados |
| api-listagem.cy.js | Nome na API, contador/nomes, filtro/limpeza | 07/10: 3 falhas; duas interrompidas por exceção da aplicação |
| defeitos.cy.js | Tipo do botão de atividade; dois cenários de envio opcionais | 07/10–08/10: 1 falha e 2 pendentes |

São duas execuções distintas: seis cenários na suíte padrão e três na suíte de defeitos. Total consolidado: 3 aprovados, 4 falhas e 2 pendentes. A falha inicial de carregamento por Cypress.env() foi corrigida e não entra nessa contagem.

## Decisões e limites

- cy.request consulta a API diretamente; cy.intercept observa a resposta usada pela tela, sem substituí-la.
- Quantidades são calculadas com os dados retornados, pois o ambiente é compartilhado e mutável.
- O teste de integridade aponta registros sem nome. Na comparação por nome, esses registros são registrados no log e excluídos; isso não resolve a inconsistência e não transforma o teste de integridade em aprovação.
- Nomes duplicados limitam a comparação: ela não garante correspondência individual por ID. Inativos com nome igual ao de um ativo são excluídos da verificação negativa.
- A configuração não suprime exceções da aplicação. A falha em contador/filtro não comprova divergência de contagem nem conclusão das verificações.
- O botão de atividade é verificado pela propriedade DOM type. Encontrar submit não comprova, sozinho, cadastro ou fechamento.
- Os dois cenários opcionais verificam permanência do formulário; não confirmam ausência de persistência pela API, mensagem específica de CPF ou criação de uma segunda atividade. O uso de vários dados inválidos também limita o isolamento da causa.
- Seletores dependem dos textos e nomes dos campos; a seleção do checkbox presume um único checkbox no formulário.
- Não há cobertura automatizada completa de edição, anexos, segurança, exclusão, duplicidade ou nascimento futuro.

## Documentação

- VALIDACAO.md: execuções e interpretação.
- RELATORIO_REVISAO.md: achados prioritários, evidências e limites.
- PLANO_E_ESTRATEGIA.md: premissas, prioridades e próximos testes.
- DIARIO_IA.md: uso de IA e correções.
- RETESTE_04OUT.md: histórico de 04/10, não representa o estado atual.

O documento original do desafio deve ser consultado para confirmar regras de negócio. As premissas não substituem requisitos explícitos.
