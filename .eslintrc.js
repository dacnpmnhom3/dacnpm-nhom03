module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'import', 'prettier'],
  rules: {
    'no-console': 'warn',
    'import/first': 'error',
    'react/prop-types': 0,
    'linebreak-style': ['off', 'windows'],
    'arrow-body-style': 'off',
    'react/display-name': 'off',
    'prefer-arrow-callback': 'off',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
        jsxSingleQuote: true,
        endOfLine: 'auto',
      },
    ],
  },
};
