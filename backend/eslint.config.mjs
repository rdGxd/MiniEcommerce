// eslint.config.mjs
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import path from 'path';
import tseslint from 'typescript-eslint';

// --- PLUGINS DE QUALIDADE DE VIDA (MANTIDOS) ---
import promisePlugin from 'eslint-plugin-promise';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';

export default tseslint.config(
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'coverage/**',
      'eslint.config.mjs',
      'migrations/**/*.js',
    ],
  },
  {
    files: ['**/__tests__/**/*.ts', 'test/**/*.ts', '**/*.spec.ts'],
    rules: {
      // Regras flexíveis para testes continuam as mesmas
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/require-await': 'off',
    },
  },

  // --- CONFIGURAÇÕES BASE ---
  eslint.configs.recommended,
  // MUDANÇA! Voltamos para 'recommendedTypeChecked'. Ele pega os erros mais importantes sem ser tão opinativo quanto o 'strict'.
  ...tseslint.configs.recommendedTypeChecked,
  promisePlugin.configs['flat/recommended'],
  eslintPluginPrettierRecommended, // Prettier sempre por último

  // --- REGRAS E PLUGINS CUSTOMIZADOS (AGORA MAIS FLEXÍVEIS) ---
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },
    rules: {
      // --- Regras de Qualidade de Código (com avisos em vez de erros) ---
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      // MUDANÇA! O uso de 'any' agora gera um aviso (warn), não um erro. Isso dá flexibilidade para usá-lo quando necessário sem quebrar o build.
      '@typescript-eslint/no-explicit-any': 'warn',

      // MUDANÇA! Removemos a obrigatoriedade de tipos de retorno. Deixamos o TypeScript inferir sempre que possível.
      // '@typescript-eslint/explicit-function-return-type': 'off', // (Desativado)

      // MUDANÇA! Removemos a regra de padrão de nomenclatura para maior liberdade.
      // '@typescript-eslint/naming-convention': 'off', // (Desativado)

      // --- Organização e Limpeza Automática (MANTIDO!) ---
      // Estas regras são ótimas para automação e não atrapalham, por isso foram mantidas.
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },

  // --- CONFIGURAÇÃO GLOBAL (PARSER, GLOBAIS) ---
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'module',
      parserOptions: {
        project: path.resolve('./tsconfig.json'),
        tsconfigRootDir: path.resolve('./'),
      },
    },
  },
);
