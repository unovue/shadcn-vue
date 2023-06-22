import { tokenizer } from 'acorn';

function stripLiteralAcorn(code) {
  const FILL = " ";
  let result = "";
  function fulfill(index) {
    if (index > result.length)
      result += code.slice(result.length, index).replace(/[^\n]/g, FILL);
  }
  const tokens = tokenizer(code, {
    ecmaVersion: "latest",
    sourceType: "module",
    allowHashBang: true,
    allowAwaitOutsideFunction: true,
    allowImportExportEverywhere: true
  });
  const inter = tokens[Symbol.iterator]();
  while (true) {
    const { done, value: token } = inter.next();
    if (done)
      break;
    fulfill(token.start);
    if (token.type.label === "string")
      result += code[token.start] + FILL.repeat(token.end - token.start - 2) + code[token.end - 1];
    else if (token.type.label === "template")
      result += FILL.repeat(token.end - token.start);
    else
      result += code.slice(token.start, token.end);
  }
  fulfill(code.length);
  return result;
}
function createIsLiteralPositionAcorn(code) {
  const positionList = [];
  const tokens = tokenizer(code, {
    ecmaVersion: "latest",
    sourceType: "module",
    allowHashBang: true,
    allowAwaitOutsideFunction: true,
    allowImportExportEverywhere: true,
    onComment(_isBlock, _text, start, end) {
      positionList.push(start);
      positionList.push(end);
    }
  });
  const inter = tokens[Symbol.iterator]();
  while (true) {
    const { done, value: token } = inter.next();
    if (done)
      break;
    if (token.type.label === "string") {
      positionList.push(token.start + 1);
      positionList.push(token.end - 1);
    } else if (token.type.label === "template") {
      positionList.push(token.start);
      positionList.push(token.end);
    }
  }
  return (position) => {
    const i = binarySearch(positionList, (v) => position < v);
    return (i - 1) % 2 === 0;
  };
}
function binarySearch(array, pred) {
  let low = -1;
  let high = array.length;
  while (1 + low < high) {
    const mid = low + (high - low >> 1);
    if (pred(array[mid]))
      high = mid;
    else
      low = mid;
  }
  return high;
}

const multilineCommentsRE = /\/\*([^*\/])*?\*\//gms;
const singlelineCommentsRE = /(?:^|\n|\r)\s*\/\/.*(?:\r|\n|$)/gm;
const templateLiteralRE = /\$\{(\s*(?:(?!\$\{).|\n|\r)*?\s*)\}/g;
const quotesRE = [
  /(["'`])((?:\\\1|(?!\1)|.|\r)*?)\1/gm,
  /([`])((?:\\\1|(?!\1)|.|\n|\r)*?)\1/gm
  // multi-line strings (i.e. template literals only)
];
function stripLiteralRegex(code) {
  code = code.replace(multilineCommentsRE, (s) => " ".repeat(s.length)).replace(singlelineCommentsRE, (s) => " ".repeat(s.length));
  let expanded = code;
  for (let i = 0; i < 16; i++) {
    const before = expanded;
    expanded = expanded.replace(templateLiteralRE, "` $1`");
    if (expanded === before)
      break;
  }
  quotesRE.forEach((re) => {
    expanded = expanded.replace(re, (s, quote, body, index) => {
      code = code.slice(0, index + 1) + " ".repeat(s.length - 2) + code.slice(index + s.length - 1);
      return quote + " ".repeat(s.length - 2) + quote;
    });
  });
  return code;
}

function stripLiteral(code) {
  try {
    return stripLiteralAcorn(code);
  } catch (e) {
    return stripLiteralRegex(code);
  }
}

export { createIsLiteralPositionAcorn, stripLiteral, stripLiteralAcorn, stripLiteralRegex };
