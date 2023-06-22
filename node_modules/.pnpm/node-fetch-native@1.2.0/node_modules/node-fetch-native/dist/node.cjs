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

const fetch = abortController.fetch;

exports.AbortController = abortController.AbortController;
exports.AbortError = abortController.AbortError;
exports.Blob = abortController._Blob;
exports.FetchError = abortController.FetchError;
exports.File = abortController.File;
exports.FormData = abortController.FormData;
exports.Headers = abortController.Headers;
exports.Request = abortController.Request;
exports.Response = abortController.Response;
exports.isRedirect = abortController.isRedirect;
exports.blobFrom = from.blobFrom;
exports.blobFromSync = from.blobFromSync;
exports.fileFrom = from.fileFrom;
exports.fileFromSync = from.fileFromSync;
exports.default = fetch;
exports.fetch = fetch;
