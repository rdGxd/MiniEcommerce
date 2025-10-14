# 📝 Changelog - MiniEcommerce

Todas as mudanças notáveis do projeto serão documentadas aqui.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [Unreleased] - 2025-10-14

### 🆕 Adicionado (Added)

#### Backend

- Implementado padrão Repository completo para todos os módulos
- Criados contratos (interfaces) para todos os repositories
- Configurada injeção de dependência correta nos módulos
- Padronização usando tipos TypeORM (`FindManyOptions`, `FindOneOptions`, `FindOptionsWhere`)
- Métodos consistentes em todos os repositories: `save`, `find`, `findOne`, `findOneBy`, `remove`, `update`

#### Frontend

- **AuthContext**: Gerenciamento global de autenticação
  - Login/logout com persistência em cookies
  - Estado de carregamento
  - Preparação para refresh token automático
- **CartContext**: Gerenciamento completo do carrinho de compras
  - Persistência no localStorage
  - Cálculos automáticos (subtotal, taxa, frete, total)
  - Contador de itens
- **ProductsContext**: Cache e filtros de produtos
  - Sistema de filtros avançado (categoria, preço, rating, busca)
  - Paginação
  - Estado de loading/error
- **AppProvider**: Wrapper centralizado de todos os contexts
- Componente de teste dos contexts (`ContextTestPage`)

### 🔄 Modificado (Changed)

#### Backend

- Refatorados todos os services para usar contratos em vez de Repository diretamente
- Removida injeção direta `@InjectRepository` dos services
- Atualizados todos os módulos com configuração de provider correta
- Padronizados métodos de repository entre todos os módulos

#### Frontend

- Atualizado `CartItems` para usar dados reais do CartContext
- Atualizado `OrderSummary` com cálculos dinâmicos do CartContext
- Refatorado `UserActions` com logout e contador do carrinho
- Simplificado `Header` removendo prop drilling
- Integrado `LoginForm` com AuthContext
- Substituído hook `useAuth` antigo pelo novo contexto

### 🚀 Melhorias (Improved)

- Melhor testabilidade com uso de contratos abstratos
- Código mais desacoplado e manutenível
- Performance otimizada com `useMemo` e `useCallback`
- Estado global consistente entre componentes
- Persistência de dados entre sessões

### 🐛 Corrigido (Fixed)

- Problemas de tipagem TypeScript nos repositories
- Warnings de ESLint relacionados a re-renders desnecessários
- Import circular entre hooks e contexts
- Configuração correta dos providers no layout

## [0.1.0] - 2025-10-13

### 🆕 Inicial (Initial)

- Estrutura inicial do projeto com NestJS e Next.js
- Configuração básica do banco de dados com TypeORM
- Entidades principais: User, Product, Category, Order, Payment, OrderItem
- Sistema de autenticação JWT básico
- Interface frontend com componentes básicos
- Configuração do Docker e docker-compose
- Estrutura de pastas organizada

---

## 🔮 Próximas Versões Planejadas

### v0.2.0 - Integração API Real

- [ ] Substituição de dados mockados por chamadas reais à API
- [ ] Error handling global
- [ ] Loading states em todas as operações
- [ ] Refresh token automático

### v0.3.0 - Funcionalidades Core

- [ ] Página de produto individual completa
- [ ] Sistema de busca e filtros avançados
- [ ] Checkout funcional
- [ ] Histórico de pedidos

### v0.4.0 - UX & Performance

- [ ] Skeleton loading
- [ ] Animações e transições
- [ ] PWA (Progressive Web App)
- [ ] Otimizações de performance

### v1.0.0 - Produção

- [ ] Testes automatizados completos
- [ ] Documentação completa
- [ ] Deploy em produção
- [ ] Monitoramento e logs

---

## 📊 Estatísticas da Versão Atual

### Backend

- ✅ 6 módulos com padrão Repository
- ✅ 6 contratos de repository implementados
- ✅ 100% dos services refatorados
- ✅ 0 erros de compilação TypeScript

### Frontend

- ✅ 3 contexts principais implementados
- ✅ 8 componentes atualizados para usar contexts
- ✅ Persistência de estado implementada
- ✅ 1 componente de teste criado

### Qualidade de Código

- 🟡 ESLint: warnings menores (formatação MD)
- ✅ TypeScript: sem erros de tipo
- 🟡 Testes: a implementar
- 🟡 Documentação: em progresso

---

**Legenda:**

- 🆕 Adicionado (Added) - para novas funcionalidades
- 🔄 Modificado (Changed) - para mudanças em funcionalidades existentes
- 🚀 Melhorias (Improved) - para melhorias e otimizações
- 🐛 Corrigido (Fixed) - para correção de bugs
- 🗑️ Removido (Removed) - para funcionalidades removidas
- 🔒 Segurança (Security) - para correções relacionadas à segurança
