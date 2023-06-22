import { stdin, stdout } from 'node:process';
import f from 'node:readline';
import { WriteStream } from 'node:tty';
import tty__default from 'tty';
import { i as isUnicodeSupported, g as gray, a as inverse, d as dim, h as hidden, c as cyan, s as strikethrough, y as yellow, b as green, r as reset, e as bgWhite, f as red } from '../shared/consola.67a659fb.mjs';
import '../shared/consola.ce5c7a59.mjs';
import '../shared/consola.3c86be48.mjs';
import 'node:util';
import 'node:path';

const ESC = '\x1B';
const CSI = `${ESC}[`;
const beep = '\u0007';

const cursor = {
  to(x, y) {
    if (!y) return `${CSI}${x + 1}G`;
    return `${CSI}${y + 1};${x + 1}H`;
  },
  move(x, y) {
    let ret = '';

    if (x < 0) ret += `${CSI}${-x}D`;
    else if (x > 0) ret += `${CSI}${x}C`;

    if (y < 0) ret += `${CSI}${-y}A`;
    else if (y > 0) ret += `${CSI}${y}B`;

    return ret;
  },
  up: (count = 1) => `${CSI}${count}A`,
  down: (count = 1) => `${CSI}${count}B`,
  forward: (count = 1) => `${CSI}${count}C`,
  backward: (count = 1) => `${CSI}${count}D`,
  nextLine: (count = 1) => `${CSI}E`.repeat(count),
  prevLine: (count = 1) => `${CSI}F`.repeat(count),
  left: `${CSI}G`,
  hide: `${CSI}?25l`,
  show: `${CSI}?25h`,
  save: `${ESC}7`,
  restore: `${ESC}8`
};

const scroll = {
  up: (count = 1) => `${CSI}S`.repeat(count),
  down: (count = 1) => `${CSI}T`.repeat(count)
};

const erase = {
  screen: `${CSI}2J`,
  up: (count = 1) => `${CSI}1J`.repeat(count),
  down: (count = 1) => `${CSI}J`.repeat(count),
  line: `${CSI}2K`,
  lineEnd: `${CSI}K`,
  lineStart: `${CSI}1K`,
  lines(count) {
    let clear = '';
    for (let i = 0; i < count; i++)
      clear += this.line + (i < count - 1 ? cursor.up() : '');
    if (count)
      clear += cursor.left;
    return clear;
  }
};

var src = { cursor, scroll, erase, beep };

var picocolorsExports = {};
var picocolors = {
  get exports(){ return picocolorsExports; },
  set exports(v){ picocolorsExports = v; },
};

let tty = tty__default;

let isColorSupported =
	!("NO_COLOR" in process.env || process.argv.includes("--no-color")) &&
	("FORCE_COLOR" in process.env ||
		process.argv.includes("--color") ||
		process.platform === "win32" ||
		(tty.isatty(1) && process.env.TERM !== "dumb") ||
		"CI" in process.env);

let formatter =
	(open, close, replace = open) =>
	input => {
		let string = "" + input;
		let index = string.indexOf(close, open.length);
		return ~index
			? open + replaceClose(string, close, replace, index) + close
			: open + string + close
	};

let replaceClose = (string, close, replace, index) => {
	let start = string.substring(0, index) + replace;
	let end = string.substring(index + close.length);
	let nextIndex = end.indexOf(close);
	return ~nextIndex ? start + replaceClose(end, close, replace, nextIndex) : start + end
};

let createColors = (enabled = isColorSupported) => ({
	isColorSupported: enabled,
	reset: enabled ? s => `\x1b[0m${s}\x1b[0m` : String,
	bold: enabled ? formatter("\x1b[1m", "\x1b[22m", "\x1b[22m\x1b[1m") : String,
	dim: enabled ? formatter("\x1b[2m", "\x1b[22m", "\x1b[22m\x1b[2m") : String,
	italic: enabled ? formatter("\x1b[3m", "\x1b[23m") : String,
	underline: enabled ? formatter("\x1b[4m", "\x1b[24m") : String,
	inverse: enabled ? formatter("\x1b[7m", "\x1b[27m") : String,
	hidden: enabled ? formatter("\x1b[8m", "\x1b[28m") : String,
	strikethrough: enabled ? formatter("\x1b[9m", "\x1b[29m") : String,
	black: enabled ? formatter("\x1b[30m", "\x1b[39m") : String,
	red: enabled ? formatter("\x1b[31m", "\x1b[39m") : String,
	green: enabled ? formatter("\x1b[32m", "\x1b[39m") : String,
	yellow: enabled ? formatter("\x1b[33m", "\x1b[39m") : String,
	blue: enabled ? formatter("\x1b[34m", "\x1b[39m") : String,
	magenta: enabled ? formatter("\x1b[35m", "\x1b[39m") : String,
	cyan: enabled ? formatter("\x1b[36m", "\x1b[39m") : String,
	white: enabled ? formatter("\x1b[37m", "\x1b[39m") : String,
	gray: enabled ? formatter("\x1b[90m", "\x1b[39m") : String,
	bgBlack: enabled ? formatter("\x1b[40m", "\x1b[49m") : String,
	bgRed: enabled ? formatter("\x1b[41m", "\x1b[49m") : String,
	bgGreen: enabled ? formatter("\x1b[42m", "\x1b[49m") : String,
	bgYellow: enabled ? formatter("\x1b[43m", "\x1b[49m") : String,
	bgBlue: enabled ? formatter("\x1b[44m", "\x1b[49m") : String,
	bgMagenta: enabled ? formatter("\x1b[45m", "\x1b[49m") : String,
	bgCyan: enabled ? formatter("\x1b[46m", "\x1b[49m") : String,
	bgWhite: enabled ? formatter("\x1b[47m", "\x1b[49m") : String,
});

picocolors.exports = createColors();
picocolorsExports.createColors = createColors;

function z({onlyFirst:t=!1}={}){const u=["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)","(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"].join("|");return new RegExp(u,t?void 0:"g")}function $(t){if(typeof t!="string")throw new TypeError(`Expected a \`string\`, got \`${typeof t}\``);return t.replace(z(),"")}var m={},G={get exports(){return m},set exports(t){m=t;}};(function(t){var u={};t.exports=u,u.eastAsianWidth=function(e){var s=e.charCodeAt(0),C=e.length==2?e.charCodeAt(1):0,D=s;return 55296<=s&&s<=56319&&56320<=C&&C<=57343&&(s&=1023,C&=1023,D=s<<10|C,D+=65536),D==12288||65281<=D&&D<=65376||65504<=D&&D<=65510?"F":D==8361||65377<=D&&D<=65470||65474<=D&&D<=65479||65482<=D&&D<=65487||65490<=D&&D<=65495||65498<=D&&D<=65500||65512<=D&&D<=65518?"H":4352<=D&&D<=4447||4515<=D&&D<=4519||4602<=D&&D<=4607||9001<=D&&D<=9002||11904<=D&&D<=11929||11931<=D&&D<=12019||12032<=D&&D<=12245||12272<=D&&D<=12283||12289<=D&&D<=12350||12353<=D&&D<=12438||12441<=D&&D<=12543||12549<=D&&D<=12589||12593<=D&&D<=12686||12688<=D&&D<=12730||12736<=D&&D<=12771||12784<=D&&D<=12830||12832<=D&&D<=12871||12880<=D&&D<=13054||13056<=D&&D<=19903||19968<=D&&D<=42124||42128<=D&&D<=42182||43360<=D&&D<=43388||44032<=D&&D<=55203||55216<=D&&D<=55238||55243<=D&&D<=55291||63744<=D&&D<=64255||65040<=D&&D<=65049||65072<=D&&D<=65106||65108<=D&&D<=65126||65128<=D&&D<=65131||110592<=D&&D<=110593||127488<=D&&D<=127490||127504<=D&&D<=127546||127552<=D&&D<=127560||127568<=D&&D<=127569||131072<=D&&D<=194367||177984<=D&&D<=196605||196608<=D&&D<=262141?"W":32<=D&&D<=126||162<=D&&D<=163||165<=D&&D<=166||D==172||D==175||10214<=D&&D<=10221||10629<=D&&D<=10630?"Na":D==161||D==164||167<=D&&D<=168||D==170||173<=D&&D<=174||176<=D&&D<=180||182<=D&&D<=186||188<=D&&D<=191||D==198||D==208||215<=D&&D<=216||222<=D&&D<=225||D==230||232<=D&&D<=234||236<=D&&D<=237||D==240||242<=D&&D<=243||247<=D&&D<=250||D==252||D==254||D==257||D==273||D==275||D==283||294<=D&&D<=295||D==299||305<=D&&D<=307||D==312||319<=D&&D<=322||D==324||328<=D&&D<=331||D==333||338<=D&&D<=339||358<=D&&D<=359||D==363||D==462||D==464||D==466||D==468||D==470||D==472||D==474||D==476||D==593||D==609||D==708||D==711||713<=D&&D<=715||D==717||D==720||728<=D&&D<=731||D==733||D==735||768<=D&&D<=879||913<=D&&D<=929||931<=D&&D<=937||945<=D&&D<=961||963<=D&&D<=969||D==1025||1040<=D&&D<=1103||D==1105||D==8208||8211<=D&&D<=8214||8216<=D&&D<=8217||8220<=D&&D<=8221||8224<=D&&D<=8226||8228<=D&&D<=8231||D==8240||8242<=D&&D<=8243||D==8245||D==8251||D==8254||D==8308||D==8319||8321<=D&&D<=8324||D==8364||D==8451||D==8453||D==8457||D==8467||D==8470||8481<=D&&D<=8482||D==8486||D==8491||8531<=D&&D<=8532||8539<=D&&D<=8542||8544<=D&&D<=8555||8560<=D&&D<=8569||D==8585||8592<=D&&D<=8601||8632<=D&&D<=8633||D==8658||D==8660||D==8679||D==8704||8706<=D&&D<=8707||8711<=D&&D<=8712||D==8715||D==8719||D==8721||D==8725||D==8730||8733<=D&&D<=8736||D==8739||D==8741||8743<=D&&D<=8748||D==8750||8756<=D&&D<=8759||8764<=D&&D<=8765||D==8776||D==8780||D==8786||8800<=D&&D<=8801||8804<=D&&D<=8807||8810<=D&&D<=8811||8814<=D&&D<=8815||8834<=D&&D<=8835||8838<=D&&D<=8839||D==8853||D==8857||D==8869||D==8895||D==8978||9312<=D&&D<=9449||9451<=D&&D<=9547||9552<=D&&D<=9587||9600<=D&&D<=9615||9618<=D&&D<=9621||9632<=D&&D<=9633||9635<=D&&D<=9641||9650<=D&&D<=9651||9654<=D&&D<=9655||9660<=D&&D<=9661||9664<=D&&D<=9665||9670<=D&&D<=9672||D==9675||9678<=D&&D<=9681||9698<=D&&D<=9701||D==9711||9733<=D&&D<=9734||D==9737||9742<=D&&D<=9743||9748<=D&&D<=9749||D==9756||D==9758||D==9792||D==9794||9824<=D&&D<=9825||9827<=D&&D<=9829||9831<=D&&D<=9834||9836<=D&&D<=9837||D==9839||9886<=D&&D<=9887||9918<=D&&D<=9919||9924<=D&&D<=9933||9935<=D&&D<=9953||D==9955||9960<=D&&D<=9983||D==10045||D==10071||10102<=D&&D<=10111||11093<=D&&D<=11097||12872<=D&&D<=12879||57344<=D&&D<=63743||65024<=D&&D<=65039||D==65533||127232<=D&&D<=127242||127248<=D&&D<=127277||127280<=D&&D<=127337||127344<=D&&D<=127386||917760<=D&&D<=917999||983040<=D&&D<=1048573||1048576<=D&&D<=1114109?"A":"N"},u.characterLength=function(e){var s=this.eastAsianWidth(e);return s=="F"||s=="W"||s=="A"?2:1};function F(e){return e.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g)||[]}u.length=function(e){for(var s=F(e),C=0,D=0;D<s.length;D++)C=C+this.characterLength(s[D]);return C},u.slice=function(e,s,C){textLen=u.length(e),s=s||0,C=C||1,s<0&&(s=textLen+s),C<0&&(C=textLen+C);for(var D="",i=0,o=F(e),E=0;E<o.length;E++){var a=o[E],n=u.length(a);if(i>=s-(n==2?1:0))if(i+n<=C)D+=a;else break;i+=n;}return D};})(G);const K=m;var Y=function(){return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|(?:\uD83E\uDDD1\uD83C\uDFFF\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFC-\uDFFF])|\uD83D\uDC68(?:\uD83C\uDFFB(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|[\u2695\u2696\u2708]\uFE0F|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))?|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])\uFE0F|\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC)?|(?:\uD83D\uDC69(?:\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC69(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83E\uDDD1(?:\u200D(?:\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDE36\u200D\uD83C\uDF2B|\uD83C\uDFF3\uFE0F\u200D\u26A7|\uD83D\uDC3B\u200D\u2744|(?:(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\uD83C\uDFF4\u200D\u2620|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])\u200D[\u2640\u2642]|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u2600-\u2604\u260E\u2611\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26B0\u26B1\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0\u26F1\u26F4\u26F7\u26F8\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u3030\u303D\u3297\u3299]|\uD83C[\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]|\uD83D[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3])\uFE0F|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDE35\u200D\uD83D\uDCAB|\uD83D\uDE2E\u200D\uD83D\uDCA8|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83E\uDDD1(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83D\uDC69(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC08\u200D\u2B1B|\u2764\uFE0F\u200D(?:\uD83D\uDD25|\uD83E\uDE79)|\uD83D\uDC41\uFE0F|\uD83C\uDFF3\uFE0F|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|[#\*0-9]\uFE0F\u20E3|\u2764\uFE0F|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF4|(?:[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270C\u270D]|\uD83D[\uDD74\uDD90])(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC08\uDC15\uDC3B\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE2E\uDE35\uDE36\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5]|\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD]|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF]|[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0D\uDD0E\uDD10-\uDD17\uDD1D\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78\uDD7A-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCB\uDDD0\uDDE0-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6]|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26A7\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5-\uDED7\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDD77\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g};function c(t,u={}){if(typeof t!="string"||t.length===0||(u={ambiguousIsNarrow:!0,...u},t=$(t),t.length===0))return 0;t=t.replace(Y(),"  ");const F=u.ambiguousIsNarrow?1:2;let e=0;for(const s of t){const C=s.codePointAt(0);if(C<=31||C>=127&&C<=159||C>=768&&C<=879)continue;switch(K.eastAsianWidth(s)){case"F":case"W":e+=2;break;case"A":e+=F;break;default:e+=1;}}return e}const v=10,L=(t=0)=>u=>`\x1B[${u+t}m`,M=(t=0)=>u=>`\x1B[${38+t};5;${u}m`,T=(t=0)=>(u,F,e)=>`\x1B[${38+t};2;${u};${F};${e}m`,r={modifier:{reset:[0,0],bold:[1,22],dim:[2,22],italic:[3,23],underline:[4,24],overline:[53,55],inverse:[7,27],hidden:[8,28],strikethrough:[9,29]},color:{black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],blackBright:[90,39],gray:[90,39],grey:[90,39],redBright:[91,39],greenBright:[92,39],yellowBright:[93,39],blueBright:[94,39],magentaBright:[95,39],cyanBright:[96,39],whiteBright:[97,39]},bgColor:{bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49],bgBlackBright:[100,49],bgGray:[100,49],bgGrey:[100,49],bgRedBright:[101,49],bgGreenBright:[102,49],bgYellowBright:[103,49],bgBlueBright:[104,49],bgMagentaBright:[105,49],bgCyanBright:[106,49],bgWhiteBright:[107,49]}};Object.keys(r.modifier);const Z=Object.keys(r.color),H=Object.keys(r.bgColor);[...Z,...H];function U(){const t=new Map;for(const[u,F]of Object.entries(r)){for(const[e,s]of Object.entries(F))r[e]={open:`\x1B[${s[0]}m`,close:`\x1B[${s[1]}m`},F[e]=r[e],t.set(s[0],s[1]);Object.defineProperty(r,u,{value:F,enumerable:!1});}return Object.defineProperty(r,"codes",{value:t,enumerable:!1}),r.color.close="\x1B[39m",r.bgColor.close="\x1B[49m",r.color.ansi=L(),r.color.ansi256=M(),r.color.ansi16m=T(),r.bgColor.ansi=L(v),r.bgColor.ansi256=M(v),r.bgColor.ansi16m=T(v),Object.defineProperties(r,{rgbToAnsi256:{value:(u,F,e)=>u===F&&F===e?u<8?16:u>248?231:Math.round((u-8)/247*24)+232:16+36*Math.round(u/255*5)+6*Math.round(F/255*5)+Math.round(e/255*5),enumerable:!1},hexToRgb:{value:u=>{const F=/[a-f\d]{6}|[a-f\d]{3}/i.exec(u.toString(16));if(!F)return [0,0,0];let[e]=F;e.length===3&&(e=[...e].map(C=>C+C).join(""));const s=Number.parseInt(e,16);return [s>>16&255,s>>8&255,s&255]},enumerable:!1},hexToAnsi256:{value:u=>r.rgbToAnsi256(...r.hexToRgb(u)),enumerable:!1},ansi256ToAnsi:{value:u=>{if(u<8)return 30+u;if(u<16)return 90+(u-8);let F,e,s;if(u>=232)F=((u-232)*10+8)/255,e=F,s=F;else {u-=16;const i=u%36;F=Math.floor(u/36)/5,e=Math.floor(i/6)/5,s=i%6/5;}const C=Math.max(F,e,s)*2;if(C===0)return 30;let D=30+(Math.round(s)<<2|Math.round(e)<<1|Math.round(F));return C===2&&(D+=60),D},enumerable:!1},rgbToAnsi:{value:(u,F,e)=>r.ansi256ToAnsi(r.rgbToAnsi256(u,F,e)),enumerable:!1},hexToAnsi:{value:u=>r.ansi256ToAnsi(r.hexToAnsi256(u)),enumerable:!1}}),r}const q=U(),p=new Set(["\x1B","\x9B"]),J=39,b="\x07",W="[",Q="]",I="m",w=`${Q}8;;`,N=t=>`${p.values().next().value}${W}${t}${I}`,j=t=>`${p.values().next().value}${w}${t}${b}`,X=t=>t.split(" ").map(u=>c(u)),_=(t,u,F)=>{const e=[...u];let s=!1,C=!1,D=c($(t[t.length-1]));for(const[i,o]of e.entries()){const E=c(o);if(D+E<=F?t[t.length-1]+=o:(t.push(o),D=0),p.has(o)&&(s=!0,C=e.slice(i+1).join("").startsWith(w)),s){C?o===b&&(s=!1,C=!1):o===I&&(s=!1);continue}D+=E,D===F&&i<e.length-1&&(t.push(""),D=0);}!D&&t[t.length-1].length>0&&t.length>1&&(t[t.length-2]+=t.pop());},DD=t=>{const u=t.split(" ");let F=u.length;for(;F>0&&!(c(u[F-1])>0);)F--;return F===u.length?t:u.slice(0,F).join(" ")+u.slice(F).join("")},uD=(t,u,F={})=>{if(F.trim!==!1&&t.trim()==="")return "";let e="",s,C;const D=X(t);let i=[""];for(const[E,a]of t.split(" ").entries()){F.trim!==!1&&(i[i.length-1]=i[i.length-1].trimStart());let n=c(i[i.length-1]);if(E!==0&&(n>=u&&(F.wordWrap===!1||F.trim===!1)&&(i.push(""),n=0),(n>0||F.trim===!1)&&(i[i.length-1]+=" ",n++)),F.hard&&D[E]>u){const B=u-n,A=1+Math.floor((D[E]-B-1)/u);Math.floor((D[E]-1)/u)<A&&i.push(""),_(i,a,u);continue}if(n+D[E]>u&&n>0&&D[E]>0){if(F.wordWrap===!1&&n<u){_(i,a,u);continue}i.push("");}if(n+D[E]>u&&F.wordWrap===!1){_(i,a,u);continue}i[i.length-1]+=a;}F.trim!==!1&&(i=i.map(E=>DD(E)));const o=[...i.join(`
`)];for(const[E,a]of o.entries()){if(e+=a,p.has(a)){const{groups:B}=new RegExp(`(?:\\${W}(?<code>\\d+)m|\\${w}(?<uri>.*)${b})`).exec(o.slice(E).join(""))||{groups:{}};if(B.code!==void 0){const A=Number.parseFloat(B.code);s=A===J?void 0:A;}else B.uri!==void 0&&(C=B.uri.length===0?void 0:B.uri);}const n=q.codes.get(Number(s));o[E+1]===`
`?(C&&(e+=j("")),s&&n&&(e+=N(n))):a===`
`&&(s&&n&&(e+=N(s)),C&&(e+=j(C)));}return e};function P(t,u,F){return String(t).normalize().replace(/\r\n/g,`
`).split(`
`).map(e=>uD(e,u,F)).join(`
`)}function FD(t,u){if(t===u)return;const F=t.split(`
`),e=u.split(`
`),s=[];for(let C=0;C<Math.max(F.length,e.length);C++)F[C]!==e[C]&&s.push(C);return s}const R=Symbol("clack:cancel");function g(t,u){t.isTTY&&t.setRawMode(u);}const V=new Map([["k","up"],["j","down"],["h","left"],["l","right"]]),tD=new Set(["up","down","left","right","space","enter"]);class h{constructor({render:u,input:F=stdin,output:e=stdout,...s},C=!0){this._track=!1,this._cursor=0,this.state="initial",this.error="",this.subscribers=new Map,this._prevFrame="",this.opts=s,this.onKeypress=this.onKeypress.bind(this),this.close=this.close.bind(this),this.render=this.render.bind(this),this._render=u.bind(this),this._track=C,this.input=F,this.output=e;}prompt(){const u=new WriteStream(0);return u._write=(F,e,s)=>{this._track&&(this.value=this.rl.line.replace(/\t/g,""),this._cursor=this.rl.cursor,this.emit("value",this.value)),s();},this.input.pipe(u),this.rl=f.createInterface({input:this.input,output:u,tabSize:2,prompt:"",escapeCodeTimeout:50}),f.emitKeypressEvents(this.input,this.rl),this.rl.prompt(),this.opts.initialValue!==void 0&&this._track&&this.rl.write(this.opts.initialValue),this.input.on("keypress",this.onKeypress),g(this.input,!0),this.output.on("resize",this.render),this.render(),new Promise((F,e)=>{this.once("submit",()=>{this.output.write(src.cursor.show),this.output.off("resize",this.render),g(this.input,!1),F(this.value);}),this.once("cancel",()=>{this.output.write(src.cursor.show),this.output.off("resize",this.render),g(this.input,!1),F(R);});})}on(u,F){const e=this.subscribers.get(u)??[];e.push({cb:F}),this.subscribers.set(u,e);}once(u,F){const e=this.subscribers.get(u)??[];e.push({cb:F,once:!0}),this.subscribers.set(u,e);}emit(u,...F){const e=this.subscribers.get(u)??[],s=[];for(const C of e)C.cb(...F),C.once&&s.push(()=>e.splice(e.indexOf(C),1));for(const C of s)C();}unsubscribe(){this.subscribers.clear();}onKeypress(u,F){if(this.state==="error"&&(this.state="active"),F?.name&&!this._track&&V.has(F.name)&&this.emit("cursor",V.get(F.name)),F?.name&&tD.has(F.name)&&this.emit("cursor",F.name),u&&(u.toLowerCase()==="y"||u.toLowerCase()==="n")&&this.emit("confirm",u.toLowerCase()==="y"),u&&this.emit("key",u.toLowerCase()),F?.name==="return"){if(this.opts.validate){const e=this.opts.validate(this.value);e&&(this.error=e,this.state="error",this.rl.write(this.value));}this.state!=="error"&&(this.state="submit");}u===""&&(this.state="cancel"),(this.state==="submit"||this.state==="cancel")&&this.emit("finalize"),this.render(),(this.state==="submit"||this.state==="cancel")&&this.close();}close(){this.input.unpipe(),this.input.removeListener("keypress",this.onKeypress),this.output.write(`
`),g(this.input,!1),this.rl.close(),this.emit(`${this.state}`,this.value),this.unsubscribe();}restoreCursor(){const u=P(this._prevFrame,process.stdout.columns,{hard:!0}).split(`
`).length-1;this.output.write(src.cursor.move(-999,u*-1));}render(){const u=P(this._render(this)??"",process.stdout.columns,{hard:!0});if(u!==this._prevFrame){if(this.state==="initial")this.output.write(src.cursor.hide);else {const F=FD(this._prevFrame,u);if(this.restoreCursor(),F&&F?.length===1){const e=F[0];this.output.write(src.cursor.move(0,e)),this.output.write(src.erase.lines(1));const s=u.split(`
`);this.output.write(s[e]),this._prevFrame=u,this.output.write(src.cursor.move(0,s.length-e-1));return}else if(F&&F?.length>1){const e=F[0];this.output.write(src.cursor.move(0,e)),this.output.write(src.erase.down());const C=u.split(`
`).slice(e);this.output.write(C.join(`
`)),this._prevFrame=u;return}this.output.write(src.erase.down());}this.output.write(u),this.state==="initial"&&(this.state="active"),this._prevFrame=u;}}}class sD extends h{get cursor(){return this.value?0:1}get _value(){return this.cursor===0}constructor(u){super(u,!1),this.value=!!u.initialValue,this.on("value",()=>{this.value=this._value;}),this.on("confirm",F=>{this.output.write(src.cursor.move(0,-1)),this.value=F,this.state="submit",this.close();}),this.on("cursor",()=>{this.value=!this.value;});}}class iD extends h{constructor(u){super(u,!1),this.cursor=0,this.options=u.options,this.value=[...u.initialValues??[]],this.cursor=Math.max(this.options.findIndex(({value:F})=>F===u.cursorAt),0),this.on("key",F=>{F==="a"&&this.toggleAll();}),this.on("cursor",F=>{switch(F){case"left":case"up":this.cursor=this.cursor===0?this.options.length-1:this.cursor-1;break;case"down":case"right":this.cursor=this.cursor===this.options.length-1?0:this.cursor+1;break;case"space":this.toggleValue();break}});}get _value(){return this.options[this.cursor].value}toggleAll(){const u=this.value.length===this.options.length;this.value=u?[]:this.options.map(F=>F.value);}toggleValue(){const u=this.value.includes(this._value);this.value=u?this.value.filter(F=>F!==this._value):[...this.value,this._value];}}class ED extends h{constructor(u){super(u,!1),this.cursor=0,this.options=u.options,this.cursor=this.options.findIndex(({value:F})=>F===u.initialValue),this.cursor===-1&&(this.cursor=0),this.changeValue(),this.on("cursor",F=>{switch(F){case"left":case"up":this.cursor=this.cursor===0?this.options.length-1:this.cursor-1;break;case"down":case"right":this.cursor=this.cursor===this.options.length-1?0:this.cursor+1;break}this.changeValue();});}get _value(){return this.options[this.cursor]}changeValue(){this.value=this._value.value;}}class oD extends h{constructor(u){super(u),this.valueWithCursor="",this.on("finalize",()=>{this.value||(this.value=u.defaultValue),this.valueWithCursor=this.value;}),this.on("value",()=>{if(this.cursor>=this.value.length)this.valueWithCursor=`${this.value}${picocolorsExports.inverse(picocolorsExports.hidden("_"))}`;else {const F=this.value.slice(0,this.cursor),e=this.value.slice(this.cursor);this.valueWithCursor=`${F}${picocolorsExports.inverse(e[0])}${e.slice(1)}`;}});}get cursor(){return this._cursor}}

const unicode = isUnicodeSupported();
const s = (c, fallback) => unicode ? c : fallback;
const S_STEP_ACTIVE = s("\u276F", ">");
const S_STEP_CANCEL = s("\u25A0", "x");
const S_STEP_ERROR = s("\u25B2", "x");
const S_STEP_SUBMIT = s("\u2714", "\u221A");
const S_BAR = "";
const S_BAR_END = "";
const S_RADIO_ACTIVE = s("\u25CF", ">");
const S_RADIO_INACTIVE = s("\u25CB", " ");
const S_CHECKBOX_ACTIVE = s("\u25FB", "[\u2022]");
const S_CHECKBOX_SELECTED = s("\u25FC", "[+]");
const S_CHECKBOX_INACTIVE = s("\u25FB", "[ ]");
const symbol = (state) => {
  switch (state) {
    case "initial":
    case "active":
      return cyan(S_STEP_ACTIVE);
    case "cancel":
      return red(S_STEP_CANCEL);
    case "error":
      return yellow(S_STEP_ERROR);
    case "submit":
      return green(S_STEP_SUBMIT);
  }
};
const text = (opts) => {
  return new oD({
    validate: opts.validate,
    placeholder: opts.placeholder,
    defaultValue: opts.defaultValue,
    initialValue: opts.initialValue,
    render() {
      const title = `${gray(S_BAR)}
${symbol(this.state)} ${opts.message}
`;
      const placeholder = opts.placeholder ? inverse(opts.placeholder[0]) + dim(opts.placeholder.slice(1)) : inverse(hidden("_"));
      const value = !this.value ? placeholder : this.valueWithCursor;
      switch (this.state) {
        case "error":
          return `${title.trim()}
${yellow(
            S_BAR
          )} ${value}
${yellow(S_BAR_END)} ${yellow(
            this.error
          )}
`;
        case "submit":
          return `${title}${gray(S_BAR)} ${dim(
            this.value || opts.placeholder
          )}`;
        case "cancel":
          return `${title}${gray(S_BAR)} ${strikethrough(
            dim(this.value ?? "")
          )}${this.value?.trim() ? "\n" + gray(S_BAR) : ""}`;
        default:
          return `${title}${cyan(S_BAR)} ${value}
${cyan(
            S_BAR_END
          )}
`;
      }
    }
  }).prompt();
};
const confirm = (opts) => {
  const active = opts.active ?? "Yes";
  const inactive = opts.inactive ?? "No";
  return new sD({
    active,
    inactive,
    initialValue: opts.initialValue ?? true,
    render() {
      const title = `${gray(S_BAR)}
${symbol(this.state)} ${opts.message}
`;
      const value = this.value ? active : inactive;
      switch (this.state) {
        case "submit":
          return `${title}${gray(S_BAR)} ${dim(value)}`;
        case "cancel":
          return `${title}${gray(S_BAR)} ${strikethrough(
            dim(value)
          )}
${gray(S_BAR)}`;
        default: {
          return `${title}${cyan(S_BAR)} ${this.value ? `${green(S_RADIO_ACTIVE)} ${active}` : `${dim(S_RADIO_INACTIVE)} ${dim(active)}`} ${dim("/")} ${!this.value ? `${green(S_RADIO_ACTIVE)} ${inactive}` : `${dim(S_RADIO_INACTIVE)} ${dim(inactive)}`}
${cyan(S_BAR_END)}
`;
        }
      }
    }
  }).prompt();
};
const select = (opts) => {
  const opt = (option, state) => {
    const label = option.label ?? String(option.value);
    switch (state) {
      case "active": {
        return `${green(S_RADIO_ACTIVE)} ${label} ${option.hint ? dim(`(${option.hint})`) : ""}`;
      }
      case "selected": {
        return `${dim(label)}`;
      }
      case "cancelled": {
        return `${strikethrough(dim(label))}`;
      }
    }
    return `${dim(S_RADIO_INACTIVE)} ${dim(label)}`;
  };
  return new ED({
    options: opts.options,
    initialValue: opts.initialValue,
    render() {
      const title = `${gray(S_BAR)}
${symbol(this.state)} ${opts.message}
`;
      switch (this.state) {
        case "submit":
          return `${title}${gray(S_BAR)} ${opt(
            this.options[this.cursor],
            "selected"
          )}`;
        case "cancel":
          return `${title}${gray(S_BAR)} ${opt(
            this.options[this.cursor],
            "cancelled"
          )}
${gray(S_BAR)}`;
        default: {
          return `${title}${cyan(S_BAR)} ${this.options.map(
            (option, i) => opt(option, i === this.cursor ? "active" : "inactive")
          ).join(`
${cyan(S_BAR)}  `)}
${cyan(S_BAR_END)}
`;
        }
      }
    }
  }).prompt();
};
const multiselect = (opts) => {
  const opt = (option, state) => {
    const label = option.label ?? String(option.value);
    switch (state) {
      case "active": {
        return `${cyan(S_CHECKBOX_ACTIVE)} ${label} ${option.hint ? dim(`(${option.hint})`) : ""}`;
      }
      case "selected": {
        return `${green(S_CHECKBOX_SELECTED)} ${dim(label)}`;
      }
      case "cancelled": {
        return `${strikethrough(dim(label))}`;
      }
      case "active-selected": {
        return `${green(S_CHECKBOX_SELECTED)} ${label} ${option.hint ? dim(`(${option.hint})`) : ""}`;
      }
      case "submitted": {
        return `${dim(label)}`;
      }
    }
    return `${dim(S_CHECKBOX_INACTIVE)} ${dim(label)}`;
  };
  return new iD({
    options: opts.options,
    initialValues: opts.initialValues,
    required: opts.required ?? true,
    cursorAt: opts.cursorAt,
    validate(selected) {
      if (this.required && selected.length === 0) {
        return `Please select at least one option.
${reset(
          dim(
            `Press ${gray(
              bgWhite(inverse(" space "))
            )} to select, ${gray(
              bgWhite(inverse(" enter "))
            )} to submit`
          )
        )}`;
      }
    },
    render() {
      const title = `${gray(S_BAR)}
${symbol(this.state)} ${opts.message}
`;
      switch (this.state) {
        case "submit": {
          return `${title}${gray(S_BAR)} ${this.options.filter(({ value }) => this.value.includes(value)).map((option) => opt(option, "submitted")).join(dim(", ")) || dim("none")}`;
        }
        case "cancel": {
          const label = this.options.filter(({ value }) => this.value.includes(value)).map((option) => opt(option, "cancelled")).join(dim(", "));
          return `${title}${gray(S_BAR)} ${label.trim() ? `${label}
${gray(S_BAR)}` : ""}`;
        }
        case "error": {
          const footer = this.error.split("\n").map(
            (ln, i) => i === 0 ? `${yellow(S_BAR_END)} ${yellow(ln)}` : `   ${ln}`
          ).join("\n");
          return title + yellow(S_BAR) + "  " + this.options.map((option, i) => {
            const selected = this.value.includes(option.value);
            const active = i === this.cursor;
            if (active && selected) {
              return opt(option, "active-selected");
            }
            if (selected) {
              return opt(option, "selected");
            }
            return opt(option, active ? "active" : "inactive");
          }).join(`
${yellow(S_BAR)}  `) + "\n" + footer + "\n";
        }
        default: {
          return `${title}${cyan(S_BAR)} ${this.options.map((option, i) => {
            const selected = this.value.includes(option.value);
            const active = i === this.cursor;
            if (active && selected) {
              return opt(option, "active-selected");
            }
            if (selected) {
              return opt(option, "selected");
            }
            return opt(option, active ? "active" : "inactive");
          }).join(`
${cyan(S_BAR)}  `)}
${cyan(S_BAR_END)}
`;
        }
      }
    }
  }).prompt();
};

async function prompt(message, opts = {}) {
  if (!opts.type || opts.type === "text") {
    return await text({
      message,
      defaultValue: opts.default,
      placeholder: opts.placeholder,
      initialValue: opts.initial
    });
  }
  if (opts.type === "confirm") {
    return await confirm({
      message,
      initialValue: opts.initial
    });
  }
  if (opts.type === "select") {
    return await select({
      message,
      options: opts.options.map(
        (o) => typeof o === "string" ? { value: o, label: o } : o
      )
    });
  }
  if (opts.type === "multiselect") {
    return await multiselect({
      message,
      options: opts.options.map(
        (o) => typeof o === "string" ? { value: o, label: o } : o
      ),
      required: opts.required
    });
  }
  throw new Error(`Unknown prompt type: ${opts.type}`);
}

export { prompt };
