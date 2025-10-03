# MiniEcommerce — Backend

API backend do projeto MiniEcommerce, construído com NestJS, TypeScript e TypeORM (Postgres).

Este repositório contém a lógica do servidor: módulos de autenticação, usuários, produtos, categorias, pedidos, pagamentos e migrações de banco.

## Requisitos

- Node.js 18+ (recomendo usar a versão LTS)
- pnpm (ou npm/yarn, mas os scripts foram testados com pnpm)
- PostgreSQL (local ou em container)

## Instalação

1. Instale dependências:

```bash
pnpm install
```

2. Crie um arquivo `.env` na raiz com as variáveis de ambiente (exemplo abaixo).

3. Rode migrations (ver seção "Banco de Dados / Migrations") ou execute o app em modo dev.

## Variáveis de ambiente (exemplo .env)

Crie um `.env` na raiz com pelo menos as variáveis abaixo:

```
# App
PORT=3001

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=mini_ecommerce
DB_AUTOLOAD_ENTITIES=true
DB_SYNCHRONIZE=false

# JWT
JWT_SECRET=uma_chave_forte_aqui
JWT_EXPIRES_IN=3600
JWT_ISSUER=mini-ecommerce
JWT_AUDIENCE=mini-ecommerce-client
JWT_REFRESH_TOKEN=uma_chave_refresh
JWT_REFRESH_TOKEN_EXPIRES_IN=604800
```

Observações:

- Nunca exponha valores sensíveis em repositórios públicos.
- `DB_SYNCHRONIZE` deve ser `false` em produção.

## Scripts úteis

- `pnpm run start`: inicia o servidor (produção via nest)
- `pnpm run start:dev`: inicia em modo watch (desenvolvimento)
- `pnpm run build`: compila o projeto para `dist/`
- `pnpm run lint`: roda e corrige ESLint
- `pnpm run format`: formata o código com Prettier
- `pnpm run test`: roda os testes unitários (Jest)
- `pnpm run test:e2e`: roda testes end-to-end
- `pnpm run test:cov`: gera coverage

## Banco de dados e migrations

Este projeto usa TypeORM com um arquivo de data-source em `src/database/data-source.ts`.

- Criar nova migration:

```bash
pnpm exec typeorm-ts-node-commonjs migration:create <MigrationName>
```

- Gerar migration a partir do esquema atual:

```bash
pnpm exec typeorm-ts-node-commonjs migration:generate --data-source src/database/data-source.ts <MigrationName>
```

- Rodar migrations:

```bash
pnpm exec typeorm-ts-node-commonjs migration:run --data-source src/database/data-source.ts
```

- Reverter última migration:

```bash
pnpm exec typeorm-ts-node-commonjs migration:revert --data-source src/database/data-source.ts
```

## Testes

Unit e integração com Jest. Para rodar todos os testes:

```bash
pnpm run test
```

Para rodar testes E2E:

```bash
pnpm run test:e2e
```

## Como rodar em desenvolvimento

1. Configure `.env` com credenciais do banco.
2. Rode o banco (p.ex. via Docker) e as migrations.
3. Inicie o servidor em modo dev:

```bash
pnpm run start:dev
```

A API ficará disponível em <http://localhost:3001> por padrão (porta via `PORT`).

## Observações para desenvolvedores

- O projeto utiliza módulos organizados por feature (`src/*.module.ts`).
- Autenticação baseada em JWT (veja `src/common/config/jwt-config.ts`).
- A configuração do banco está em `src/common/config/database-config.ts` e `src/database/data-source.ts`.

## Pendências / O que falta ser feito

Esta seção lista os itens pendentes detectados no código-fonte, recomendações de implementação, prioridade e passos sugeridos para resolver cada um.

Resumo dos checks automáticos (executado localmente):

- Testes unitários (Jest): 14 suítes, 15 testes — TODOS passaram (executado em 03/10/2025).
  - Comando usado: `pnpm run test`

Itens encontrados (TODOs / observações no código)

1) Proteção e autorização nas rotas de Categoria (Prioridade: Alto)
 - Arquivos: `src/category/category.controller.ts`, `src/category/category.service.ts`.
 - Observação encontrada: comentários "TODO: Falta pegar o token do usuário logado para fazer a atualização" nas rotas `update` e `remove`.
 - O que falta: garantir que somente usuários autenticados (e com os papéis apropriados) possam atualizar ou remover categorias. Também é recomendável extrair o usuário autenticado para auditoria.
 - Sugestão de implementação:
   - Aplicar o guard de autenticação nas rotas (ex.: `@UseGuards(AuthGuard)` ou usar guard global já existente).
   - Implementar checagem de roles (ex.: `roles-guard.guard.ts` ou `auth-and-policy.guard.ts`) para limitar a ação a administradores.
   - Adicionar um decorator `@CurrentUser()` (ou usar `@Req()`) para passar o usuário ao service quando necessário.
 - Testes sugeridos: unit tests para controller/service cobrindo comportamento com e sem autenticação; E2E tests validando 401/403.

2) Auditoria de alterações (Prioridade: Médio)
 - Arquivos afetados: services que modificam dados (categories, products, orders, etc.).
 - O que falta: registrar qual usuário criou/atualizou/deletou registros (campos tipo `createdBy` / `updatedBy` ou tabela de audit).
 - Sugestão: adicionar campos opcionais nas entidades ou utilizar uma tabela de auditoria e popular esses campos a partir do token do usuário autenticado.

3) Testes E2E para fluxos protegidos (Prioridade: Médio)
 - Situação atual: existem testes unitários passando. Recomenda-se aumentar cobertura com testes de integração/E2E para endpoints que dependem de autenticação e banco.
 - Sugestão: criar suites E2E (ex.: `test/e2e`) usando `supertest` e um banco de teste (container Postgres ou SQLite em memória) para validar fluxos completos.

4) `.env.example` e `docker-compose.yml` (Prioridade: Baixo-Médio)
 - Observação: README já descreve as variáveis de ambiente. Adicionar um `.env.example` e um `docker-compose.yml` facilitaria o setup local.
 - Sugestão: incluir `docker-compose.yml` com serviços `db` (postgres) e instruções para subir o app em desenvolvimento.

5) CI / GitHub Actions (Prioridade: Baixo)
 - O que falta: pipeline de CI para rodar lint, build e testes automaticamente em PRs.
 - Sugestão: workflow que rode `pnpm install`, `pnpm run lint:check`, `pnpm run test:cov` em Node 18.x.

6) Documentação de roles/políticas (Prioridade: Médio)
 - O que falta: especificar quais roles existem (ex: admin, user) e quais ações cada role pode executar. Isso ajuda a implementar os guards/roles de forma consistente.

Priorização resumida

- Alto: proteger rotas de escrita (ex.: category update/delete) e garantir autenticação/authorization correta.
- Médio: adicionar testes E2E para rotas protegidas, auditoria de alterações, documentação de roles.
- Baixo: `.env.example`, `docker-compose.yml`, CI (a prioridade do CI pode subir conforme o fluxo de trabalho da equipe).

Passos sugeridos (rápido start)

1. Implementar proteção nas rotas de categoria:
 - Atualizar `src/category/category.controller.ts`: aplicar guards e extrair usuário.
 - Atualizar `src/category/category.service.ts`: aceitar informação do usuário e gravar auditoria se necessário.
2. Escrever testes unitários cobrindo comportamento com usuário autenticado e sem autenticado (esperar 401/403).
3. Adicionar testes E2E que validem o fluxo completo contra um banco de testes.
4. Adicionar `.env.example` e opcionalmente `docker-compose.yml` para facilitar execução local.
5. Criar um workflow de CI para rodar lint/test/build em PRs.

Observação: se preferir, posso abrir PR(s) implementando as proteções nas rotas de categoria + testes correspondentes. Informe se prefere que eu implemente apenas a proteção simples (usar guard existente) ou a solução completa com roles + auditoria + testes E2E.

## Contribuição

1. Fork este repositório.
2. Crie uma branch feature: `git checkout -b feat/nova-funcionalidade`.
3. Abra um merge request com descrição clara.

## License

Este repositório está marcado como UNLICENSED no `package.json`. Atualize se desejar uma licença específica.

## Contato

Para dúvidas, abra uma issue neste repositório ou entre em contato com os mantenedores.

---

Se quiser, posso também adicionar um `.env.example` e um `docker-compose.yml` para facilitar execução com Docker — quer que eu adicione isso?
