import { createUnplugin } from 'unplugin';
import { createTransformer } from './transform.mjs';
import 'acorn';
import 'magic-string';
import 'estree-walker';

const unctxPlugin = createUnplugin(
  (options = {}) => {
    const transformer = createTransformer(options);
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

export { unctxPlugin };
