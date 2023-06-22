'use strict';

const abortController = require('./shared/node-fetch-native.dfc63e20.cjs');
require('node:fs');
require('node:path');
require('node:http');
require('node:https');
require('node:zlib');
require('node:stream');
require('node:buffer');
require('node:util');
require('node:url');
require('node:net');

function polyfill(name, impl) {
  if (!(name in globalThis)) {
    try {
      globalThis[name] = impl;
    } catch {
    }
  }
}
polyfill("fetch", abortController.fetch);
polyfill("Blob", abortController._Blob);
polyfill("File", abortController.File);
polyfill("FormData", abortController.FormData);
polyfill("Headers", abortController.Headers);
polyfill("Request", abortController.Request);
polyfill("Response", abortController.Response);
polyfill("AbortController", abortController.AbortController);
