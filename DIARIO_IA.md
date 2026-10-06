# Diário de uso de IA — registro inicial

Data: 03/10/2026.

Foi usado ChatGPT para apoiar exploração pelo navegador remoto, identificar
seletores do formulário e preparar uma primeira automação Cypress e explicações.

Observações reais: cadastro vazio bloqueado; opção sem EPI oculta campos;
Adicionar outra atividade enviou cadastro; CPF repetido 11111111111 foi aceito.
Foram criados dois registros fictícios na exploração. A data futura não gerou
bloqueio visível, mas sua persistência não foi conferida.

A candidata ainda deve executar os testes, revisar resultados e compreender
cada asserção. O código preparado com apoio de IA não equivale a execução
confirmada nem a domínio prévio da ferramenta.

## Reteste 04/10
A IA ajudou a interpretar JSON e preparar testes de API. Corrigimos a conclusão precipitada de que seleção de arquivo comprova upload e distinguimos falha do Cypress de validação do navegador. A suíte usa teclas nativas para verificar CPF curto; alteração ainda precisa executar no Windows. A hipótese de persistência em toda repetição do botão de atividade não foi confirmada no reteste remoto.
