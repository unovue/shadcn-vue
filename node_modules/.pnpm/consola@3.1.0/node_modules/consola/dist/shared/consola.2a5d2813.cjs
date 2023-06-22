'use strict';

const node_util = require('node:util');
const node_path = require('node:path');

function parseStack(stack) {
  const cwd = process.cwd() + node_path.sep;
  const lines = stack.split("\n").splice(1).map((l) => l.trim().replace("file://", "").replace(cwd, ""));
  return lines;
}

function writeStream(data, stream) {
  const write = stream.__write || stream.write;
  return write.call(stream, data);
}

const bracket = (x) => x ? `[${x}]` : "";
class BasicReporter {
  formatStack(stack, opts) {
    return "  " + parseStack(stack).join("\n  ");
  }
  formatArgs(args, opts) {
    const _args = args.map((arg) => {
      if (arg && typeof arg.stack === "string") {
        return arg.message + "\n" + this.formatStack(arg.stack, opts);
      }
      return arg;
    });
    return node_util.formatWithOptions(opts, ..._args);
  }
  formatDate(date, opts) {
    return opts.date ? date.toLocaleTimeString() : "";
  }
  filterAndJoin(arr) {
    return arr.filter(Boolean).join(" ");
  }
  formatLogObj(logObj, opts) {
    const message = this.formatArgs(logObj.args, opts);
    return this.filterAndJoin([
      bracket(logObj.type),
      bracket(logObj.tag),
      message
    ]);
  }
  log(logObj, ctx) {
    const line = this.formatLogObj(logObj, {
      columns: ctx.options.stdout.columns || 0,
      ...ctx.options.formatOptions
    });
    return writeStream(
      line + "\n",
      logObj.level < 2 ? ctx.options.stderr || process.stderr : ctx.options.stdout || process.stdout
    );
  }
}

exports.BasicReporter = BasicReporter;
exports.parseStack = parseStack;
