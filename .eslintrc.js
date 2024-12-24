module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-unused-vars': ['error', {
      varsIgnorePattern: '^(Link|useAuth|userName|actionTypes|useCallback|CardDescription|ThemeProviderProps|mounted)$',
      argsIgnorePattern: '^_',
      ignoreRestSiblings: true
    }],
    'react-hooks/exhaustive-deps': 'warn'
  }
}
