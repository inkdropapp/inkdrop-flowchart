import eslintReact from '@eslint-react/eslint-plugin'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  {
    ignores: ['lib/**']
  },
  {
    ...eslintReact.configs.recommended,
    languageOptions: {
      ...eslintReact.configs.recommended.languageOptions,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      sourceType: 'module'
    },
    rules: {
      ...eslintReact.configs.recommended.rules,
      'no-useless-escape': 'off',
      'prefer-const': 'error',
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ]
    }
  },
  eslintConfigPrettier
]
