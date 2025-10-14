# 🛒 MiniEcommerce

Um projeto de e-commerce completo desenvolvido com **NestJS** (backend) e **Next.js** (frontend), implementando padrão Repository e Context API para gerenciamento de estado.

## 📋 **Visão Geral**

Este projeto demonstra uma implementação moderna de e-commerce com:

- **Backend**: API REST em NestJS com TypeORM e PostgreSQL
- **Frontend**: Aplicação React com Next.js e TailwindCSS
- **Arquitetura**: Padrão Repository, Context API, e boas práticas de desenvolvimento

## 🚀 **Tecnologias**

### Backend

- **NestJS** - Framework Node.js para APIs escaláveis
- **TypeORM** - ORM para TypeScript e JavaScript
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação e autorização
- **Swagger** - Documentação automática da API
- **Jest** - Testes unitários e de integração

### Frontend

- **Next.js 15** - Framework React com SSR/SSG
- **TypeScript** - Tipagem estática
- **TailwindCSS** - Framework CSS utilitário
- **Context API** - Gerenciamento de estado global
- **React Hook Form** - Gerenciamento de formulários
- **Axios** - Cliente HTTP

## 📁 **Estrutura do Projeto**

```
MiniEcommerce/
├── backend/                    # API NestJS
│   ├── src/
│   │   ├── auth/              # Módulo de autenticação
│   │   ├── user/              # Gerenciamento de usuários
│   │   ├── product/           # Produtos
│   │   ├── category/          # Categorias
│   │   ├── order/             # Pedidos
│   │   ├── payment/           # Pagamentos
│   │   ├── common/            # Utilitários comuns
│   │   └── database/          # Configuração do banco
│   └── test/                  # Testes
├── frontend/                  # Aplicação Next.js
│   ├── src/
│   │   ├── app/               # App Router (Next.js 13+)
│   │   ├── components/        # Componentes React
│   │   ├── contexts/          # Context API
│   │   ├── providers/         # Providers globais
│   │   ├── lib/               # Utilitários
│   │   └── validators/        # Validações
└── docker/                    # Configurações Docker
```

## 🎯 **Características Implementadas**

### ✅ Backend (Padrão Repository)

- [x] Autenticação JWT completa
- [x] CRUD para todas as entidades
- [x] Padrão Repository com contratos
- [x] Validação de dados com class-validator
- [x] Mapeamento de entidades para DTOs
- [x] Error handling centralizado
- [x] Documentação Swagger

### ✅ Frontend (Context API)

- [x] AuthContext - Autenticação global
- [x] CartContext - Carrinho com persistência
- [x] ProductsContext - Cache e filtros
- [x] Login/Logout funcional
- [x] Carrinho de compras interativo
- [x] Interface responsiva
- [x] Tema escuro/claro

## 🛠️ **Configuração e Instalação**

### Pré-requisitos

- Node.js (v18+)
- pnpm (recomendado) ou npm
- PostgreSQL
- Docker (opcional)

### 1. Clone o repositório

```bash
git clone https://github.com/rdGxd/MiniEcommerce.git
cd MiniEcommerce
```

### 2. Backend Setup

```bash
cd backend
pnpm install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas configurações de banco

# Executar migrations
pnpm run migration:run

# Iniciar servidor de desenvolvimento
pnpm run start:dev
```

### 3. Frontend Setup

```bash
cd frontend
pnpm install

# Iniciar aplicação
pnpm run dev
```

### 4. Docker (Opcional)

```bash
# Na raiz do projeto
docker-compose up -d
```

## 🔧 **Scripts Disponíveis**

### Backend

```bash
pnpm run start:dev      # Desenvolvimento
pnpm run build          # Build para produção
pnpm run test           # Testes unitários
pnpm run test:e2e       # Testes E2E
pnpm run lint           # ESLint
```

### Frontend

```bash
pnpm run dev            # Desenvolvimento
pnpm run build          # Build para produção
pnpm run start          # Iniciar produção
pnpm run lint           # ESLint
```

## 📖 **Documentação da API**

Após iniciar o backend, acesse:

- **Swagger UI**: <http://localhost:3000/api/docs>
- **API**: <http://localhost:3000/api>

### Principais Endpoints

```
POST /auth/login        # Login
POST /auth/register     # Registro
GET  /products          # Listar produtos
GET  /products/:id      # Produto específico
POST /orders            # Criar pedido
GET  /orders            # Listar pedidos do usuário
```

## 🎨 **Uso dos Contexts**

### AuthContext

```tsx
import { useAuth } from '@/contexts/AuthContext';

function Component() {
  const { user, isLoggedIn, login, logout } = useAuth();

  // Usar funcionalidades de autenticação
}
```

### CartContext

```tsx
import { useCart } from '@/contexts/CartContext';

function Component() {
  const { items, addItem, removeItem, total } = useCart();

  // Gerenciar carrinho de compras
}
```

### ProductsContext

```tsx
import { useProducts } from '@/contexts/ProductsContext';

function Component() {
  const { products, filters, setFilters } = useProducts();

  // Trabalhar com produtos e filtros
}
```

## 🧪 **Testes**

### Backend

```bash
# Testes unitários
pnpm run test

# Testes com coverage
pnpm run test:cov

# Testes E2E
pnpm run test:e2e
```

### Frontend

```bash
# Testes com Jest
pnpm run test

# Testes E2E com Playwright (a implementar)
pnpm run test:e2e
```

## 🚀 **Deploy**

### Vercel (Frontend)

```bash
# Conectar repositório no Vercel
# Deploy automático a cada push
```

### Railway/Heroku (Backend)

```bash
# Configurar variáveis de ambiente
# Deploy via Git
```

## 🤝 **Contribuição**

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 **Licença**

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 **Autor**

**Rodrigo** - [GitHub](https://github.com/rdGxd)

## 📞 **Contato**

- GitHub: [@rdGxd](https://github.com/rdGxd)
- LinkedIn: [Seu LinkedIn](https://linkedin.com/in/seu-perfil)

---

⭐ **Se este projeto foi útil, dê uma estrela!**
