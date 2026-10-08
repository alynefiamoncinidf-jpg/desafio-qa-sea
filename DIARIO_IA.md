# Diário de uso de IA

Alyne Fiamoncini — desafio QA SEA — 03/10 a 08/10/2026.

## Onde e por que usei

Usei ChatGPT/Codex para apoiar a exploração pelo navegador compartilhado, organizar hipóteses e casos, interpretar JSON e saídas do Cypress, preparar JavaScript e revisar documentação. Como iniciante em automação, também usei explicações sobre API, seletores e asserções para compreender e apresentar o trabalho. A exploração, execução no Windows e coleta de evidências tiveram minha participação.

## Erros e correções

A primeira versão do teste acessava employee em registro sem state. Corrigimos o acesso na automação com encadeamento opcional, mantendo visíveis as exceções do sistema. Selecionar um arquivo foi inicialmente tratado de forma mais ampla do que a evidência permitia; corrigimos a conclusão: seleção não comprova envio ou armazenamento. O fechamento do formulário também não prova persistência em todas as repetições.

A suíte de defeitos usava Cypress.env(), incompatível com Cypress 16.1.1. A execução revelou o erro; consultamos a documentação oficial e migramos a leitura para Cypress.expose() e o comando opcional para --expose. O reteste executou o cenário habilitado e encontrou type=submit no botão de atividade. Uma cópia enviada de package.json ainda continha --env; a revisão de entrega corrige o comando.

## Como validei e limites

No Windows, a execução padrão de 07/10 registrou 3 aprovados e 3 falhas. O reteste da suíte de defeitos de 07/10–08/10 registrou 1 falha e 2 pendentes. Duas falhas da suíte padrão interromperam comparações por exceção da aplicação. Não considero as verificações interrompidas como concluídas. Os dois cenários com envio permaneceram desativados e possuem asserções parciais que exigem revisão antes de habilitação.

Conferi JSON, cabeçalhos e gravação manual. As conclusões distinguem observação, hipótese e premissa. O acesso na janela anônima é evidência de comportamento, mas a classificação de segurança depende da política prevista para o desafio. O código gerado com IA não é prova de execução nem de experiência anterior: apresentarei o que compreendi, o que corrigi e o que ainda precisa ser testado.
