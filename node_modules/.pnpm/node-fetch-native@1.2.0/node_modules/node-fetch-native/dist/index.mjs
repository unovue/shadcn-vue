import { _ as _Blob, F as File$1, a as FormData$1, H as Headers$1, R as Request$1, b as Response$1, A as AbortController$1, f as fetch$1 } from './shared/node-fetch-native.d7878b77.mjs';
export { c as AbortError, d as FetchError, i as isRedirect } from './shared/node-fetch-native.d7878b77.mjs';
export { b as blobFrom, a as blobFromSync, f as fileFrom, c as fileFromSync } from './shared/node-fetch-native.ed692c92.mjs';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';

const _forceNodeFetch = typeof process !== void 0 && typeof process.env !== void 0 && process.env.FORCE_NODE_FETCH;
function _getFetch() {
  if (!_forceNodeFetch && globalThis.fetch) {
    return globalThis.fetch;
  }
  return fetch$1;
}
const fetch = _getFetch();
const Blob = !_forceNodeFetch && globalThis.Blob || _Blob;
const File = !_forceNodeFetch && globalThis.File || File$1;
const FormData = !_forceNodeFetch && globalThis.FormData || FormData$1;
const Headers = !_forceNodeFetch && globalThis.Headers || Headers$1;
const Request = !_forceNodeFetch && globalThis.Request || Request$1;
const Response = !_forceNodeFetch && globalThis.Response || Response$1;
const AbortController = !_forceNodeFetch && globalThis.AbortController || AbortController$1;

export { AbortController, Blob, File, FormData, Headers, Request, Response, fetch as default, fetch };
