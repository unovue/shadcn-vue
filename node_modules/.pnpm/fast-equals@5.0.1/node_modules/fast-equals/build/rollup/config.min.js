import { BASE_CONFIG, PACKAGE_JSON } from './config.base.js';
import terser from '@rollup/plugin-terser';

export default {
  ...BASE_CONFIG,
  output: {
    ...BASE_CONFIG.output,
    file: PACKAGE_JSON.browser.replace('umd', 'min'),
    format: 'umd',
    sourcemap: false,
  },
  plugins: [...BASE_CONFIG.plugins, terser()],
};
