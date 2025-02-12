import globals from 'globals'
import jsPlugin from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

/** @type {import('eslint').Linter.Config} */ //? for compatility with JS files.
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    ignores: ["node_modules", "dist"],
    languageOptions: {
      globals: globals['shared-node-browser'],
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      //'semi': ['error', 'always'], 
      //"quotes": ["error", "double"], 
    },
  },
  {
    files: ['**/*.js'],
    ...jsPlugin.configs.recommended,
    rules: {
      ...jsPlugin.configs.recommended.rules,
      'strict': ['error', 'never'],
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
    },
  },
  {
    files: ['**/*.ts'],
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/ban-ts-comment': 'off'
    },
  },
]
