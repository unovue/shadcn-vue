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

// src/utils.ts
import { isAbsolute, normalize } from "path";
function normalizeAbsolutePath(path) {
  if (isAbsolute(path))
    return normalize(path);
  else
    return path;
}

// src/rspack/loaders/load.ts
async function load(source, map) {
  const callback = this.async();
  const id = this.resource;
  const { plugin } = this.getOptions();
  if (!plugin?.load || !id)
    return callback(null, source, map);
  if (plugin.loadInclude && !plugin.loadInclude(id))
    return callback(null, source, map);
  const context = {
    error: (error) => this.emitError(typeof error === "string" ? new Error(error) : error),
    warn: (error) => this.emitWarning(typeof error === "string" ? new Error(error) : error)
  };
  const res = await plugin.load.call(
    Object.assign(
      this._compilation && createRspackContext(this._compilation),
      context
    ),
    normalizeAbsolutePath(id)
  );
  if (res == null)
    callback(null, source, map);
  else if (typeof res !== "string")
    callback(null, res.code, res.map ?? map);
  else
    callback(null, res, map);
}
export {
  load as default
};
