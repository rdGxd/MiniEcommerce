# Seed de Dados Mock

Este diretório contém scripts para popular o banco de dados com dados mock para desenvolvimento e testes.

## Arquivos

- `mock-data.seed.ts` - Classe principal que gera dados mock para todas as entidades
- `run-seed.ts` - Script executor que inicializa a conexão e executa o seed
- `README.md` - Este arquivo com instruções

## Como usar

### 1. Preparar o ambiente

Certifique-se de que:

- O banco de dados está rodando
- As variáveis de ambiente estão configuradas no `.env`
- As migrações foram executadas (`pnpm migration:run`)

### 2. Executar o seed

```bash
pnpm seed
```

Ou diretamente com ts-node:

```bash
npx ts-node -r tsconfig-paths/register src/database/seeds/run-seed.ts
```

### 3. Dados criados

O script criará:

- **10 categorias** (Eletrônicos, Roupas, Casa e Jardim, etc.)
- **21 usuários** (1 admin + 20 usuários comuns)
  - Admin: `admin@minicommerce.com` / senha: `admin123`
  - Usuários: emails aleatórios / senha: `user123`
- **50 produtos** variados com preços realistas
- **30 pedidos** com status aleatórios
- **Itens de pedido** (1-5 por pedido)
- **40 pagamentos** com diferentes métodos e status

### 4. Dados de exemplo

#### Admin

- Email: `admin@minicommerce.com`
- Senha: `admin123`
- Role: `ADMIN`

#### Usuários regulares

- Emails: gerados pelo Faker.js
- Senha padrão: `user123`
- Role: `USER`

### 5. Observações importantes

- ⚠️ **O script limpa todos os dados existentes** antes de criar novos
- Os relacionamentos entre entidades são criados automaticamente
- Os totais dos pedidos são calculados automaticamente
- As senhas são hasheadas com bcrypt
- Os dados são gerados de forma aleatória, mas realista

### 6. Personalização

Para modificar os dados gerados, edite o arquivo `mock-data.seed.ts`:

- Altere as quantidades nas constantes
- Modifique os templates de produtos
- Ajuste as categorias
- Configure diferentes status e valores

### 7. Problemas comuns

- **Erro de conexão**: Verifique se o banco está rodando e as variáveis de ambiente estão corretas
- **Erro de foreign key**: Execute as migrações antes do seed
- **Dados duplicados**: O script limpa automaticamente os dados antes de inserir

## Estrutura dos dados

### Relacionamentos criados

- Usuários → Pedidos (1:N)
- Usuários → Pagamentos (1:N)
- Produtos ↔ Categorias (N:N)
- Pedidos → Itens de Pedido (1:N)
- Produtos → Itens de Pedido (1:N)
