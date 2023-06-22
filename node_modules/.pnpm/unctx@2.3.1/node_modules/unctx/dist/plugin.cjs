'use strict';

const unplugin = require('unplugin');
const transform = require('./transform.cjs');
require('acorn');
require('magic-string');
require('estree-walker');

const unctxPlugin = unplugin.createUnplugin(
  (options = {}) => {
    const transformer = transform.createTransformer(options);
    return {
      name: "unctx:transfrom",
      enforce: "post",
      transformInclude: options.transformInclude,
      transform(code, id) {
        const result = transformer.transform(code);
        if (result) {
          return {
            code: result.code,
            map: result.magicString.generateMap({
              source: id,
              includeContent: true
            })
          };
        }
      }
    };
  }
);

exports.unctxPlugin = unctxPlugin;
