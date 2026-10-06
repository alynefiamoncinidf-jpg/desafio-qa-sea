# Desafio QA SEA — Cypress

Primeira versão da automação baseada na exploração real de 03/10/2026.
Alvo: https://analista-teste.seatecnologia.com.br/

## Como executar no seu computador

Instale Node.js LTS e abra a pasta deste projeto no VS Code. No terminal:

```bash
npm install
npm run cy:open
```

No Cypress, escolha **E2E Testing**, o navegador e `formulario.cy.js`.
Para executar sem a janela interativa:

```bash
npm test
```

Para demonstrar os defeitos sem criar cadastros:

```bash
npm run test:defeitos
```

Para executar também os dois testes que enviam formulários:

```bash
npm run test:cadastros
```

Esse último comando pode criar até dois funcionários fictícios por execução
enquanto os bugs estiverem presentes. Não há limpeza automática: não foi
confirmado um fluxo seguro de exclusão. Use no ambiente do desafio.

## Cenários e interpretação

| Cenário | Expectativa |
| --- | --- |
| Nome vazio | Envio bloqueado e foco no nome |
| Não usa EPI | Campos de EPI somem e reaparecem ao desmarcar |
| CPF curto | Validação de comprimento bloqueia envio |
| Tipo do botão de atividade | Deve ser button; observado submit, portanto falha esperada |
| CPF 11111111111 | Deve rejeitar; cadastro aceito na exploração |
| Adicionar outra atividade | Deve manter formulário; salvou e fechou na exploração |

Os testes de defeitos afirmam o comportamento esperado e podem ficar vermelhos.
Não alteramos as expectativas para esconder problemas. CPF inválido é diferente
de CPF curto: 11 caracteres não garantem dígitos verificadores válidos.
Os dois casos com cadastro ficam pendentes por padrão (it.skip).
Os seletores input[name=...] foram inspecionados no formulário real.
Checkbox único é uma dependência desta versão; revisar se a tela mudar.

## O que explicar na apresentação

- `describe`: reúne cenários da mesma funcionalidade.
- `beforeEach`: abre a página e o formulário antes de cada cenário.
- `cy.get`: localiza um elemento por seletor.
- `cy.contains`: localiza pelo texto exibido.
- `type`, `click`, `check`: simulam ações da pessoa usuária.
- `should` e `expect`: verificam o resultado esperado.
- Não usamos pausas fixas. Cypress repete as verificações até o timeout.
- Não escondemos erros de JavaScript com uncaught:exception.

## Limites desta versão

Não cobre ainda edição, anexos, API, segurança, duplicidade isolada ou
persistência de nascimento futuro. A exploração aceitou envio com data futura,
mas a data gravada ainda precisa ser confirmada. As regras de negócio devem
ser confrontadas com o desafio antes da entrega final.
Veja VALIDACAO.md para o estado real de execução deste projeto.

## Atualização de 04/10 — execução no Windows

A suíte padrão agora inclui formulário e API/listagem (6 testes).

1. Extraia este pacote em uma NOVA pasta.
2. No VS Code, abra a pasta que contém package.json.
3. Abra Terminal > Novo terminal.
4. Execute `npm ci` e aguarde.
5. Execute `npx cypress open`, escolha E2E Testing e Chrome.
6. Execute formulario.cy.js e api-listagem.cy.js, um por vez.
7. Para executar os seis pelo terminal: `npm test -- --browser chrome`.

`test:defeitos` fica separado: verifica expectativa que pode falhar no sistema atual.
`test:cadastros` pode criar dados de teste; execute apenas se quiser reproduzir esses defeitos.
Não grave no Cypress Cloud: a execução local já atende a este projeto.

### O que você deve entender
- describe agrupa cenários; it define um cenário.
- cy.visit abre a tela; cy.get localiza campo; click clica.
- should/expect comparam resultado observado com esperado.
- cy.request consulta a API diretamente.
- cy.intercept observa a consulta feita pela tela, sem substituir a resposta.
- cy.wait aguarda essa consulta.
- Os números não são fixados em 7: os testes calculam a partir da resposta atual.
- Teste que falha precisa ser investigado: pode ser defeito, automação ou ambiente.

Leia RETESTE_04OUT.md para resultados manuais e limitações. Sintaxe validada; execução atualizada ainda pendente no Windows.
