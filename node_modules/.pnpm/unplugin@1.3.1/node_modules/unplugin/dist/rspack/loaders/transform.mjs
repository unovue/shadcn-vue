// src/rspack/context.ts
import sources from "webpack-sources";
import { Parser } from "acorn";
function createRspackContext(compilation) {
  return {
    parse(code, opts = {}) {
      return Parser.parse(code, {
        sourceType: "module",
        ecmaVersion: "latest",
        locations: true,
        ...opts
      });
    },
    addWatchFile() {
    },
    emitFile(emittedFile) {
      const outFileName = emittedFile.fileName || emittedFile.name;
      if (emittedFile.source && outFileName) {
        compilation.emitAsset(
          outFileName,
          new sources.RawSource(
            // @ts-expect-error types mismatch
            typeof emittedFile.source === "string" ? emittedFile.source : Buffer.from(emittedFile.source)
          )
        );
      }
    },
    getWatchFiles() {
      return [];
    }
  };
}

// src/rspack/loaders/transform.ts
async function transform(source, map) {
  const callback = this.async();
  const id = this.resource;
  const { plugin } = this.getOptions();
  if (!plugin?.transform)
    return callback(null, source, map);
  if (plugin.transformInclude && !plugin.transformInclude(id))
    return callback(null, source, map);
  const context = {
    error: (error) => this.emitError(typeof error === "string" ? new Error(error) : error),
    warn: (error) => this.emitWarning(typeof error === "string" ? new Error(error) : error)
  };
  const res = await plugin.transform.call(
    Object.assign(
      this._compilation && createRspackContext(this._compilation),
      context
    ),
    source,
    id
  );
  if (res == null)
    callback(null, source, map);
  else if (typeof res !== "string")
    callback(null, res.code, map == null ? map : res.map || map);
  else
    callback(null, res, map);
}
export {
  transform as default
};
