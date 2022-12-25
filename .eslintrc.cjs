const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  extends: ['@nuxtjs/eslint-config-typescript', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 'warn',
    'camelcase': ['error', { ignoreDestructuring: true, properties: 'never' }],
  },
  overrides: [
    {
      files: '*.cjs',
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
});
