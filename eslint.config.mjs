import pluginJs from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import tanstackQueryPlugin from '@tanstack/eslint-plugin-query';
import pluginReact from 'eslint-plugin-react';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// Install script for the packages
// bun add -D @eslint/js @next/eslint-plugin-next @tanstack/eslint-plugin-query eslint-plugin-react eslint-plugin-simple-import-sort typescript-eslint @typescript-eslint/eslint-plugin globals

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      // Build outputs
      '.next/**',
      'out/**',
      'build/**',
      '.open-next/**',
      
      // Generated files
      'convex/_generated/**',
      'node_modules/**',
      
      // Environment files
      'next-env.d.ts',
      '.env*',
      '!.env.example',
      '.dev.vars*',
      '!.dev.vars.example',
      
      // Other generated/config files
      '*.tsbuildinfo',
      '.DS_Store',
      '*.pem',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
      '.vercel/**',
      '.wrangler/**',
      '.pnp.js',
      '.yarn/**',
      '/coverage/**'
    ]
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: { 
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      react: pluginReact,
      '@next/next': nextPlugin,
      '@tanstack/query': tanstackQueryPlugin,
      'simple-import-sort': simpleImportSort
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      // Basic formatting
      // 'indent': 'off',
      // 'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
      // 'react/jsx-indent': 'off',
      // 'react/jsx-indent-props': 'off',
      // 'semi': ['error', 'always'],
      // 'quotes': ['error', 'single', { 'avoidEscape': true }],
      
      // Import sorting and grouping
      'simple-import-sort/imports': ['error', {
        groups: [
          // Node.js builtins
          ['^node:'],
          // React and Next.js
          ['^react', '^next'],
          // External packages
          ['^@?\\w'],
          // Internal packages (absolute imports with @/)
          ['^@/'],
          // Relative imports
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports
          ['^.+\\.s?css$']
        ]
      }],
      'simple-import-sort/exports': 'error',
      
      // React rules
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
      
      // TypeScript rules
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_' 
      }],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'typeAlias',
          format: ['PascalCase']
        }
      ],
      
      // Next.js rules
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'error',
      
      // TanStack Query rules
      '@tanstack/query/exhaustive-deps': 'error',
      '@tanstack/query/stable-query-client': 'error'
    }
  }
];