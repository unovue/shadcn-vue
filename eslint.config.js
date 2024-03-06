import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: true,
    typescript: true,
    ignores: [
      '**/__registry__/index.ts',
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
    // Without `files`, they are general rules for all files
    rules: {
      'symbol-description': 0,
      'no-console': 1,
      'no-tabs': 0,
      'import/first': 0,
      'node/prefer-global/process': 0,
      'style/no-tabs': 0,
    },
  },
)
