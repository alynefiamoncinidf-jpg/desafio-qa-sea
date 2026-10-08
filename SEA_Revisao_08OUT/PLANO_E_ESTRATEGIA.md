# Plano e estratégia de testes

Alyne Fiamoncini — revisão de 08/10/2026.

## Objetivo e escopo

Avaliar cadastro e listagem de funcionários, validações essenciais, atividades/EPI, consistência UI/API e acesso à listagem. Usar exploração manual para descobrir riscos e Cypress para repetir verificações prioritárias. Ambiente: URL do desafio, Windows e Chrome; dados compartilhados.

## Premissas e dúvidas

Nome preenchido e identificadores coerentes são premissas para um cadastro utilizável. Nascimento não futuro e rejeição de CPF inválido são expectativas propostas, sujeitas à confirmação do negócio. CA 12345 é apenas dado de teste: não houve consulta de validade regulatória.

Confirmar com o responsável: campos obrigatórios, formato/dígitos de CPF, unicidade, idade mínima, relação entre atividade/EPI, formatos e limites dos anexos, comportamento dos menus e política de acesso da API. O cabeçalho de métodos permitidos não comprova permissão de escrita; o cabeçalho CORS não comprova exploração entre origens.

## Ordem aplicada e critérios

1. Explorar o fluxo principal e documentar ações, respostas e impactos.
2. Testar obrigatoriedade e comprimento, alternância de EPI e botões auxiliares.
3. Consultar GET /employees e comparar dados com contador/filtro da interface.
4. Observar acesso na janela anônima e request/response disponíveis.
5. Automatizar verificações repetíveis e registrar falhas reais.
6. Consolidar evidências, limitações e diário de IA.

Priorização: impacto na disponibilidade do cadastro/lista, integridade dos dados e acesso a informações, seguidos de consistência dos botões e apresentação visual. Concluir um caso exige resultado e evidência; bloqueios e pendências ficam explícitos.

## Próximos testes priorizados

| Prioridade | Teste | Motivo e situação |
| --- | --- | --- |
| P1 | Cadastro positivo isolado, sem anexo; conferir UI e GET por nome/ID | Falta confirmação final do fluxo completo e persistência; várias entradas inválidas na gravação impedem isolamento |
| P1 | Reproduzir falha da tela com cada estrutura incompleta | Investigar relação entre registros sem state e exceção sem assumir causalidade |
| P1 | Confirmar política de acesso, leitura por ID e autorização de escrita | Leitura na janela anônima observada; demais operações não testadas |
| P1 | CPF inválido/duplicado e data futura, um fator por caso | Separar validação de formato, dígitos, negócio e persistência |
| P2 | Adicionar atividade/EPI com dados válidos | Confirmar segunda linha e ausência de envio involuntário; automação atual só verifica tipo/permanência parcial |
| P2 | Anexos: extensão, MIME, tamanho, envio e armazenamento | Seleção de MP3/MP4 observada; upload não comprovado |
| P2 | Edição, exclusão e consistência por ID | Não cobertos; não há limpeza automatizada segura confirmada |
| P2 | Responsividade, teclado, contraste e nomes acessíveis | Exploração visual parcial; não há avaliação completa de acessibilidade |

Não cobertos em profundidade: carga, desempenho, múltiplos navegadores, todas as etapas/menus, cadeia completa de autorização e armazenamento de anexos. A seleção de cobertura considerou o prazo, a instabilidade observada e a necessidade de evidências verificáveis.
