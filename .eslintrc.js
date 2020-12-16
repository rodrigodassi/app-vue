module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
    'plugin:vue/vue3-essential',
  ],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
    quotes: [2, 'single', { avoidEscape: true }],
    'vue/max-attributes-per-line': 'off',
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    'no-alert': 'off',
	'no-param-reassign': 0,
	'eslint linebreak-style': 0
  },
};
