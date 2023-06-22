import * as babel from '@babel/standalone/babel.min.js';
import babelPluginUntyped from './babel.mjs';
import '@babel/types';
import './shared/untyped.43bfdbed.mjs';
import 'scule';

const { transform: babelTransform } = babel.default || babel;
function transform(src, opts = {}) {
  const res = babelTransform(src, {
    filename: "src.ts",
    presets: ["typescript"],
    plugins: [[babelPluginUntyped, opts]]
  });
  return res.code;
}

export { transform };
