'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const abortController = require('./shared/node-fetch-native.dfc63e20.cjs');
const from = require('./shared/node-fetch-native.c50e3e4a.cjs');
require('node:http');
require('node:https');
require('node:zlib');
require('node:stream');
require('node:buffer');
require('node:util');
require('node:url');
require('node:net');
require('node:fs');
require('node:path');

const _forceNodeFetch = typeof process !== void 0 && typeof process.env !== void 0 && process.env.FORCE_NODE_FETCH;
function _getFetch() {
  if (!_forceNodeFetch && globalThis.fetch) {
    return globalThis.fetch;
  }
  return abortController.fetch;
}
const fetch = _getFetch();
const Blob = !_forceNodeFetch && globalThis.Blob || abortController._Blob;
const File = !_forceNodeFetch && globalThis.File || abortController.File;
const FormData = !_forceNodeFetch && globalThis.FormData || abortController.FormData;
const Headers = !_forceNodeFetch && globalThis.Headers || abortController.Headers;
const Request = !_forceNodeFetch && globalThis.Request || abortController.Request;
const Response = !_forceNodeFetch && globalThis.Response || abortController.Response;
const AbortController = !_forceNodeFetch && globalThis.AbortController || abortController.AbortController;

exports.AbortError = abortController.AbortError;
exports.FetchError = abortController.FetchError;
exports.isRedirect = abortController.isRedirect;
exports.blobFrom = from.blobFrom;
exports.blobFromSync = from.blobFromSync;
exports.fileFrom = from.fileFrom;
exports.fileFromSync = from.fileFromSync;
exports.AbortController = AbortController;
exports.Blob = Blob;
exports.File = File;
exports.FormData = FormData;
exports.Headers = Headers;
exports.Request = Request;
exports.Response = Response;
exports.default = fetch;
exports.fetch = fetch;
