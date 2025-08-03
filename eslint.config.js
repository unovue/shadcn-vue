import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: true,
    typescript: true,
    ignores: [
      '**/__registry__/index.ts',
      '**/__registry__/block.ts',
    ],
  },
  {
    files: ['**/*.vue'],
    rules: {
      'vue/one-component-per-file': 0,
      'vue/no-reserved-component-names': 0,
      'vue/no-useless-v-bind': 0,
    },
  },
  {
    files: ['**/registry/**/*.ts', '**/registry/**/*.vue'],
    rules: {
      'style/quotes': ['error', 'double'],
    },
  },
  {
    files: ['**/registry/default/examples/*.vue', '**/registry/new-york/examples/*.vue', '**/registry/new-york-v4/examples/*.vue'],
    rules: {
      'no-alert': 0,
      'no-console': 0,
    },
  },
  {
    // Without `files`, they are general rules for all files
    rules: {
      'symbol-description': 0,
      'no-console': 1,
      'no-tabs': 0,
      'import/first': 0,
      'node/prefer-global/process': 0,
      'style/no-tabs': 0,
      'unused-imports/no-unused-vars': 0,
      'unicorn/no-new-array': 0,
      'import-x/consistent-type-specifier-style': 0,
    },
  },
)
