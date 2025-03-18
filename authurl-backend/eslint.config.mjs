import globals from 'globals'
import pluginJs from '@eslint/js'
import tsParser from '@typescript-eslint/parser' // TS parser
import tseslint from '@typescript-eslint/eslint-plugin' // TS plugin

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'], // Target all JS and TS files
    ignores: ['node_modules/', 'dist/', '.git/', '.gitignore'],
    languageOptions: {
      parser: tsParser, // Use TypeScript parser
      globals: {
        ...globals.browser, // Add browser globals
        ...globals.node, // Add Node.js globals for your Express app
      },
    },
    plugins: {
      '@typescript-eslint': tseslint, // Add the TypeScript plugin
    },
    rules: {
      ...pluginJs.configs.recommended.rules, // Use rules from the recommended JS config
      ...tseslint.configs.recommended.rules, // Use rules from the recommended TS config
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': 'warn',
    },
  },
]
