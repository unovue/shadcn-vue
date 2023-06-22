import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { homedir } from 'node:os';
import destr from 'destr';
import flat from 'flat';
import { defu } from 'defu';

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
    const value = destr(
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
  return options.flat ? config : flat.unflatten(config, { overwrite: true });
}
function parseFile(path, options) {
  if (!existsSync(path)) {
    return {};
  }
  return parse(readFileSync(path, "utf8"), options);
}
function read(options) {
  options = withDefaults(options);
  return parseFile(resolve(options.dir, options.name), options);
}
function readUser(options) {
  options = withDefaults(options);
  options.dir = process.env.XDG_CONFIG_HOME || homedir();
  return read(options);
}
function serialize(config) {
  return Object.entries(flat.flatten(config)).map(
    ([key, value]) => `${key}=${typeof value === "string" ? value : JSON.stringify(value)}`
  ).join("\n");
}
function write(config, options) {
  options = withDefaults(options);
  writeFileSync(resolve(options.dir, options.name), serialize(config), {
    encoding: "utf8"
  });
}
function writeUser(config, options) {
  options = withDefaults(options);
  options.dir = process.env.XDG_CONFIG_HOME || homedir();
  write(config, options);
}
function update(config, options) {
  options = withDefaults(options);
  if (!options.flat) {
    config = flat.unflatten(config, { overwrite: true });
  }
  const newConfig = defu(config, read(options));
  write(newConfig, options);
  return newConfig;
}
function updateUser(config, options) {
  options = withDefaults(options);
  options.dir = process.env.XDG_CONFIG_HOME || homedir();
  return update(config, options);
}

export { defaults, parse, parseFile, read, readUser, serialize, update, updateUser, write, writeUser };
