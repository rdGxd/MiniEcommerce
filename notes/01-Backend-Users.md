# 👤 Usuários & Autenticação

## Tarefas

- [x] Criar entidade `User` (id, name, email, password, role) → [User Entity](/backend/src/user/entities/user.entity.ts)
- [x] Criar DTOs: `CreateUserDto`, `LoginDto` → [DTOs](/backend/src/user/dto)
- [x] Implementar `AuthService` com JWT + bcrypt → [Auth Service](/backend/src/auth/auth.service.ts)
- [x] Criar `AuthGuard` para rotas protegidas → [Guards](/backend/src/auth/guards)
- [x] Endpoints:
  - [x] POST /auth/register → [Auth Controller](/backend/src/auth/auth.controller.ts)
  - [x] POST /auth/login → [Auth Controller](/backend/src/auth/auth.controller.ts)
  - [x] GET /auth/profile → [Auth Controller](/backend/src/auth/auth.controller.ts)

## Links relacionados

- [Backend Products](02-Backend-Products.md)
- [Backend Orders](03-Backend-Orders.md)
