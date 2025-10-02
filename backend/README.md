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
