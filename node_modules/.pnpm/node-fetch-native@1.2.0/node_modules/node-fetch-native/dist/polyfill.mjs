import { f as fetch, _ as _Blob, F as File, a as FormData, H as Headers, R as Request, b as Response, A as AbortController } from './shared/node-fetch-native.d7878b77.mjs';
import 'node:fs';
import 'node:path';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';

function polyfill(name, impl) {
  if (!(name in globalThis)) {
    try {
      globalThis[name] = impl;
    } catch {
    }
  }
}
polyfill("fetch", fetch);
polyfill("Blob", _Blob);
polyfill("File", File);
polyfill("FormData", FormData);
polyfill("Headers", Headers);
polyfill("Request", Request);
polyfill("Response", Response);
polyfill("AbortController", AbortController);
