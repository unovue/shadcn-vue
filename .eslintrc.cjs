const process = require('node:process')

// process.env.ESLINT_TSCONFIG = 'tsconfig.json'

module.exports = {
  extends: '@antfu',

  rules: {
    'vue/one-component-per-file': 'off',
    'vue/no-reserved-component-names': 'off',
    'symbol-description': 'off',
    'no-console': 'warn',
    'no-tabs': 'off',
  },
}
