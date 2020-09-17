module.exports = {
  extends: '@mate-academy/eslint-config',
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    jest: true,
  },
  plugins: ['jest'],
};
