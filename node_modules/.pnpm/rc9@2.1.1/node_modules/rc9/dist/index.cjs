'use strict';

const node_fs = require('node:fs');
const node_path = require('node:path');
const node_os = require('node:os');
const destr = require('destr');
const flat = require('flat');
const defu = require('defu');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

const destr__default = /*#__PURE__*/_interopDefaultCompat(destr);
const flat__default = /*#__PURE__*/_interopDefaultCompat(flat);

const RE_KEY_VAL = /^\s*([^\s=]+)\s*=\s*(.*)?\s*$/;
const RE_LINES = /\n|\r|\r\n/;
const defaults = {
  name: ".conf",
  dir: process.cwd(),
  flat: false
};
function withDefaults(options) {
  if (typeof options === "string") {
    options = { name: options };
  }
  return { ...defaults, ...options };
}
function parse(contents, options = {}) {
  const config = {};
  const lines = contents.split(RE_LINES);
  for (const line of lines) {
    const match = line.match(RE_KEY_VAL);
    if (!match) {
      continue;
    }
    const key = match[1];
    if (!key || key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = destr__default(
      match[2].trim()
      /* val */
    );
    if (key.endsWith("[]")) {
      const nkey = key.slice(0, Math.max(0, key.length - 2));
      config[nkey] = (config[nkey] || []).concat(value);
      continue;
    }
    config[key] = value;
  }
  return options.flat ? config : flat__default.unflatten(config, { overwrite: true });
}
function parseFile(path, options) {
  if (!node_fs.existsSync(path)) {
    return {};
  }
  return parse(node_fs.readFileSync(path, "utf8"), options);
}
function read(options) {
  options = withDefaults(options);
  return parseFile(node_path.resolve(options.dir, options.name), options);
}
function readUser(options) {
  options = withDefaults(options);
  options.dir = process.env.XDG_CONFIG_HOME || node_os.homedir();
  return read(options);
}
function serialize(config) {
  return Object.entries(flat__default.flatten(config)).map(
    ([key, value]) => `${key}=${typeof value === "string" ? value : JSON.stringify(value)}`
  ).join("\n");
}
function write(config, options) {
  options = withDefaults(options);
  node_fs.writeFileSync(node_path.resolve(options.dir, options.name), serialize(config), {
    encoding: "utf8"
  });
}
function writeUser(config, options) {
  options = withDefaults(options);
  options.dir = process.env.XDG_CONFIG_HOME || node_os.homedir();
  write(config, options);
}
function update(config, options) {
  options = withDefaults(options);
  if (!options.flat) {
    config = flat__default.unflatten(config, { overwrite: true });
  }
  const newConfig = defu.defu(config, read(options));
  write(newConfig, options);
  return newConfig;
}
function updateUser(config, options) {
  options = withDefaults(options);
  options.dir = process.env.XDG_CONFIG_HOME || node_os.homedir();
  return update(config, options);
}

exports.defaults = defaults;
exports.parse = parse;
exports.parseFile = parseFile;
exports.read = read;
exports.readUser = readUser;
exports.serialize = serialize;
exports.update = update;
exports.updateUser = updateUser;
exports.write = write;
exports.writeUser = writeUser;
