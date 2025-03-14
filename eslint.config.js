import antfu from '@antfu/eslint-config'
import tailwind from 'eslint-plugin-tailwindcss'

export default antfu(
  {
    formatters: {
      prettierOptions: {
        plugins: ['prettier-plugin-tailwindcss'],
        semi: false,
      },
    },
    vue: true,
    typescript: true,
    ignores: [
      '**/__registry__/index.ts',
      '**/__registry__/block.ts',
    ],
  },
  [
    ...tailwind.configs['flat/recommended'],
    {
      settings: {
        tailwindcss: {
          callees: ['cn'],
          config: './apps/www/tailwind.config.js',
          cssFiles: [
            '**/*.css',
            '!**/node_modules',
            '!**/.*',
            '!**/dist',
            '!**/build',
          ],
        },
      },
    },
  ],
  {
    files: ['**/*.vue'],
    rules: {
      'vue/one-component-per-file': 0,
      'vue/no-reserved-component-names': 0,
      'vue/no-useless-v-bind': 0,
    },
  },
  {
    files: ['**/registry/default/example/*.vue', '**/registry/new-york/example/*.vue'],
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
      'tailwindcss/enforces-shorthand': 0,
    },
  },
)
