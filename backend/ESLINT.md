# Configuração ESLint para NestJS

Este projeto utiliza uma configuração avançada do ESLint otimizada para desenvolvimento com NestJS.

## 📋 Características da Configuração

### ✅ Regras TypeScript Essenciais

- Proibição de `any` explícito
- Detecção de promises não aguardadas
- Preferência por null coalescing (`??`) ao invés de OR (`||`)
- Verificação de tipos seguros em chamadas de função

### 🏗️ Regras Específicas para NestJS

- Tipagem de retorno de funções (com exceções para controllers)
- Imports consistentes com type-only imports
- Convenções de nomenclatura apropriadas para classes, métodos e propriedades
- Tratamento especial para decorators e metadata

### 📁 Configurações por Tipo de Arquivo

- **Testes** (`.spec.ts`, `.test.ts`): Regras mais flexíveis para async/await e tipos
- **Controllers**: Tipagem de retorno relaxada para responses complexas
- **DTOs/Entities**: Regras específicas para classes de dados
- **Migrations**: Convenções de nomenclatura relaxadas

## 🚀 Scripts Disponíveis

```bash
# Executar ESLint com correção automática
pnpm lint

# Verificar problemas sem corrigir
pnpm lint:check

# Formatar código com Prettier
pnpm format

# Verificar formatação sem alterar arquivos
pnpm format:check
```

## ⚙️ Configuração do VS Code

O projeto inclui configurações do VS Code que:

- Formatam automaticamente ao salvar
- Corrigem problemas ESLint automaticamente
- Organizam imports automaticamente
- Sugerem extensões úteis

## 🎯 Regras de Nomenclatura

- **Classes/Interfaces/Types**: `PascalCase`
- **Métodos/Variáveis**: `camelCase`
- **Constantes**: `UPPER_CASE` ou `PascalCase`
- **Enum Members**: `UPPER_CASE` ou `PascalCase`

## 🔧 Configuração Prettier

```json
{
  "singleQuote": true,
  "trailingComma": "all",
  "tabWidth": 2,
  "semi": true,
  "printWidth": 80,
  "endOfLine": "auto",
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

## 📝 Exemplos de Uso

### ✅ Bom

```typescript
// Função com tipagem explícita
async function createUser(userData: CreateUserDto): Promise<User> {
  return this.userRepository.save(userData);
}

// Null coalescing
const port = process.env.PORT ?? 3000;

// Type-only imports
import { type Repository } from 'typeorm';
```

### ❌ Evitar

```typescript
// Sem tipagem de retorno
async function createUser(userData: CreateUserDto) {
  return this.userRepository.save(userData);
}

// OR ao invés de null coalescing
const port = process.env.PORT || 3000;

// Any explícito
function process(data: any): any {
  return data;
}
```

## 🚨 Problemas Comuns

1. **Missing return type**: Adicione tipagem de retorno às funções
2. **Prefer nullish coalescing**: Use `??` ao invés de `||`
3. **Unsafe assignments**: Verifique tipos em assignments com `any`

## 📚 Recursos Adicionais

- [ESLint Rules](https://eslint.org/docs/rules/)
- [TypeScript ESLint Rules](https://typescript-eslint.io/rules/)
- [NestJS Style Guide](https://docs.nestjs.com/style-guide)
