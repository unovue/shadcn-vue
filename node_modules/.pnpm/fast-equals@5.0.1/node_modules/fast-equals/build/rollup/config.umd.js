import { BASE_CONFIG, PACKAGE_JSON } from './config.base.js';

export default {
  ...BASE_CONFIG,
  output: {
    ...BASE_CONFIG.output,
    file: PACKAGE_JSON.browser,
    format: 'umd',
  },
};
