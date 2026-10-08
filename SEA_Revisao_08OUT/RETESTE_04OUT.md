# Reteste de 04/10/2026

## Confirmado no navegador compartilhado
- Lista: 7 registros, 1 ativo; coincide com JSON fornecido pela candidata.
- Filtro de ativos: exibe somente o registro ativo; limpar restaura lista.
- Nome vazio: navegador bloqueia envio e direciona foco ao nome.
- CPF de 3 caracteres digitado por teclado: navegador bloqueia por minlength.
- Não usa EPI: oculta campos e restaura ao desmarcar.
- Adicionar EPI com campos preenchidos e CA 12345: continua apenas um campo CA; não surgiu segunda linha. CA usado como dado de teste, sem confirmar sua validade regulatória.
- Adicionar outra atividade: fecha formulário e mostra lista. Nesta repetição a lista continuou em 7, portanto persistência do novo registro não confirmada.

## Evidência anterior via API fornecida pela candidata
- Teste Quebra persistido, com cargo vazio apesar de Cargo 01 visível antes do clique.
- Três registros com CPF aaaaa555@#$ e nascimento em 2030 persistidos.
- Datas futuras: esperado baseado na premissa de nascimento não futuro.
- Upload MP4: seleção comprovada; envio/armazenamento ainda não comprovados.
- Sobreposição visual: comprovada pelos prints da candidata.

## Limitações
- Erro 502 intermitente no navegador remoto interrompeu o reteste completo.
- Não foram retestadas todas as páginas, uploads, edição/exclusão ou autorização API.
- JSON de dados inválidos confirma armazenamento, mas não prova criação diretamente pela API.
- Código Cypress atualizado não executado neste ambiente: download do binário veio truncado.
- Execução anterior no Windows: 2 passaram e 1 falhou. A alteração do CPF usa cy.press (teclas nativas) e deve ser validada no Windows; não se afirma que a suíte inteira passa.

## Prioridades
1. Cadastro inesperado/fechamento por adicionar atividade e perda de cargo.
2. CPF inválido e nascimento futuro armazenados.
3. Inclusão de EPI sem uma segunda linha e quebras visuais.

Não é um relatório de conclusão integral. Pendências devem permanecer explícitas.