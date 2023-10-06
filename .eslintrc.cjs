// const process = require('node:process')
// process.env.ESLINT_TSCONFIG = 'tsconfig.json'

module.exports = {
  extends: '@antfu',

  rules: {
    'vue/one-component-per-file': 'off',
    'vue/no-reserved-component-names': 'off',
    'vue/no-useless-v-bind': 'off',
    'symbol-description': 'off',
    'no-console': 'warn',
    'no-tabs': 'off',
    'no-invalid-character': 'off',
    'import/first': 'off',
  },
}
