import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

const tailwindLintPlugin = compat.config({
  extends: ['plugin:tailwindcss/recommended'],
  rules: {
    // Turned off, because we leveraged arbitary values in CSS classes.
    'tailwindcss/no-custom-classname': 'off',
    // Turned off, as has no usage for this repo (https://github.com/francoismassart/eslint-plugin-tailwindcss/blob/HEAD/docs/rules/migration-from-tailwind-2.md).
    'tailwindcss/migration-from-tailwind-2': 'off',
    // This could be turned on, but causes a lot of changes in files.
    'tailwindcss/classnames-order': 'off',
  },
})

export default antfu(
  {
    vue: true,
    typescript: true,
    ignores: [
      '**/__registry__/index.ts',
    ],
  },
  {
    // Without `files`, they are general rules for all files
    // Should on top of other rules to be overriden by them.
    rules: {
      'symbol-description': 0,
      'no-console': 1,
      'no-tabs': 0,
      'import/first': 0,
      'node/prefer-global/process': 0,
      'style/no-tabs': 0,
    },
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
    files: [
      '**/lib/registry/new-york/example/**/*.vue',
      '**/lib/registry/default/example/**/*.vue',
      '**/apps/www/.vitepress/**/*.{vue,ts}',
      '**/apps/www/scripts/**/*.ts',
    ],
    rules: {
      'no-alert': 0,
      'no-console': 0,
    },
  },
  tailwindLintPlugin,
)
