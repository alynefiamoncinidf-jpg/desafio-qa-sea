# Estado de validação — 03/10/2026

- Sintaxe: node --check passou no arquivo de configuração e nas duas suítes.
- Seletores: nomes de inputs inspecionados no DOM real pelo navegador.
- Aplicativo Cypress: instalação tentou baixar a versão 16.1.1, mas o arquivo não pôde ser descompactado (arquivo inválido ou truncado).
- Execução E2E: NÃO realizada neste ambiente. Não há contagem de testes aprovados.
- Pacote npm instalado separadamente sem baixar o aplicativo para gerar o lockfile. No computador da candidata, usar npm ci sem CYPRESS_INSTALL_BINARY=0.
- Próxima validação: npm ci, npm test e npm run test:defeitos; registrar saída e evidências reais.
- Antes da entrega: conferir as regras do PDF original e revisar os casos de defeitos.
