'use strict';

const giget = require('./shared/giget.a16f8b31.cjs');
require('node:fs/promises');
require('node:fs');
require('tar');
require('pathe');
require('defu');
require('node:stream');
require('node:child_process');
require('node:os');
require('node:util');
require('node-fetch-native');
require('https-proxy-agent');



exports.downloadTemplate = giget.downloadTemplate;
exports.registryProvider = giget.registryProvider;
exports.startShell = giget.startShell;
