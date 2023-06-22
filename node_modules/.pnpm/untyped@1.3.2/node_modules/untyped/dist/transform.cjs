'use strict';

const babel$1 = require('@babel/standalone/babel.min.js');
const babel = require('./babel.cjs');
require('@babel/types');
require('./shared/untyped.07613105.cjs');
require('scule');

function _interopNamespaceDefault(e) {
  const n = Object.create(null);
  if (e) {
    for (const k in e) {
      n[k] = e[k];
    }
  }
  n.default = e;
  return n;
}

const babel__namespace = /*#__PURE__*/_interopNamespaceDefault(babel$1);

const { transform: babelTransform } = babel__namespace.default || babel__namespace;
function transform(src, opts = {}) {
  const res = babelTransform(src, {
    filename: "src.ts",
    presets: ["typescript"],
    plugins: [[babel, opts]]
  });
  return res.code;
}

exports.transform = transform;
