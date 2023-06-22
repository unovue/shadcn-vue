'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var compilerCore = require('@vue/compiler-core');
var shared = require('@vue/shared');

const V_MODEL_RADIO = Symbol(`vModelRadio` );
const V_MODEL_CHECKBOX = Symbol(`vModelCheckbox` );
const V_MODEL_TEXT = Symbol(`vModelText` );
const V_MODEL_SELECT = Symbol(`vModelSelect` );
const V_MODEL_DYNAMIC = Symbol(`vModelDynamic` );
const V_ON_WITH_MODIFIERS = Symbol(`vOnModifiersGuard` );
const V_ON_WITH_KEYS = Symbol(`vOnKeysGuard` );
const V_SHOW = Symbol(`vShow` );
const TRANSITION = Symbol(`Transition` );
const TRANSITION_GROUP = Symbol(`TransitionGroup` );
compilerCore.registerRuntimeHelpers({
  [V_MODEL_RADIO]: `vModelRadio`,
  [V_MODEL_CHECKBOX]: `vModelCheckbox`,
  [V_MODEL_TEXT]: `vModelText`,
  [V_MODEL_SELECT]: `vModelSelect`,
  [V_MODEL_DYNAMIC]: `vModelDynamic`,
  [V_ON_WITH_MODIFIERS]: `withModifiers`,
  [V_ON_WITH_KEYS]: `withKeys`,
  [V_SHOW]: `vShow`,
  [TRANSITION]: `Transition`,
  [TRANSITION_GROUP]: `TransitionGroup`
});

var namedCharacterReferences = {
	GT: ">",
	gt: ">",
	LT: "<",
	lt: "<",
	"ac;": "∾",
	"af;": "⁡",
	AMP: "&",
	amp: "&",
	"ap;": "≈",
	"DD;": "ⅅ",
	"dd;": "ⅆ",
	deg: "°",
	"ee;": "ⅇ",
	"eg;": "⪚",
	"el;": "⪙",
	ETH: "Ð",
	eth: "ð",
	"gE;": "≧",
	"ge;": "≥",
	"Gg;": "⋙",
	"gg;": "≫",
	"gl;": "≷",
	"GT;": ">",
	"Gt;": "≫",
	"gt;": ">",
	"ic;": "⁣",
	"ii;": "ⅈ",
	"Im;": "ℑ",
	"in;": "∈",
	"it;": "⁢",
	"lE;": "≦",
	"le;": "≤",
	"lg;": "≶",
	"Ll;": "⋘",
	"ll;": "≪",
	"LT;": "<",
	"Lt;": "≪",
	"lt;": "<",
	"mp;": "∓",
	"Mu;": "Μ",
	"mu;": "μ",
	"ne;": "≠",
	"ni;": "∋",
	not: "¬",
	"Nu;": "Ν",
	"nu;": "ν",
	"Or;": "⩔",
	"or;": "∨",
	"oS;": "Ⓢ",
	"Pi;": "Π",
	"pi;": "π",
	"pm;": "±",
	"Pr;": "⪻",
	"pr;": "≺",
	"Re;": "ℜ",
	REG: "®",
	reg: "®",
	"rx;": "℞",
	"Sc;": "⪼",
	"sc;": "≻",
	shy: "­",
	uml: "¨",
	"wp;": "℘",
	"wr;": "≀",
	"Xi;": "Ξ",
	"xi;": "ξ",
	yen: "¥",
	"acd;": "∿",
	"acE;": "∾̳",
	"Acy;": "А",
	"acy;": "а",
	"Afr;": "𝔄",
	"afr;": "𝔞",
	"AMP;": "&",
	"amp;": "&",
	"And;": "⩓",
	"and;": "∧",
	"ang;": "∠",
	"apE;": "⩰",
	"ape;": "≊",
	"ast;": "*",
	Auml: "Ä",
	auml: "ä",
	"Bcy;": "Б",
	"bcy;": "б",
	"Bfr;": "𝔅",
	"bfr;": "𝔟",
	"bne;": "=⃥",
	"bot;": "⊥",
	"Cap;": "⋒",
	"cap;": "∩",
	cent: "¢",
	"Cfr;": "ℭ",
	"cfr;": "𝔠",
	"Chi;": "Χ",
	"chi;": "χ",
	"cir;": "○",
	COPY: "©",
	copy: "©",
	"Cup;": "⋓",
	"cup;": "∪",
	"Dcy;": "Д",
	"dcy;": "д",
	"deg;": "°",
	"Del;": "∇",
	"Dfr;": "𝔇",
	"dfr;": "𝔡",
	"die;": "¨",
	"div;": "÷",
	"Dot;": "¨",
	"dot;": "˙",
	"Ecy;": "Э",
	"ecy;": "э",
	"Efr;": "𝔈",
	"efr;": "𝔢",
	"egs;": "⪖",
	"ell;": "ℓ",
	"els;": "⪕",
	"ENG;": "Ŋ",
	"eng;": "ŋ",
	"Eta;": "Η",
	"eta;": "η",
	"ETH;": "Ð",
	"eth;": "ð",
	Euml: "Ë",
	euml: "ë",
	"Fcy;": "Ф",
	"fcy;": "ф",
	"Ffr;": "𝔉",
	"ffr;": "𝔣",
	"gap;": "⪆",
	"Gcy;": "Г",
	"gcy;": "г",
	"gEl;": "⪌",
	"gel;": "⋛",
	"geq;": "≥",
	"ges;": "⩾",
	"Gfr;": "𝔊",
	"gfr;": "𝔤",
	"ggg;": "⋙",
	"gla;": "⪥",
	"glE;": "⪒",
	"glj;": "⪤",
	"gnE;": "≩",
	"gne;": "⪈",
	"Hat;": "^",
	"Hfr;": "ℌ",
	"hfr;": "𝔥",
	"Icy;": "И",
	"icy;": "и",
	"iff;": "⇔",
	"Ifr;": "ℑ",
	"ifr;": "𝔦",
	"Int;": "∬",
	"int;": "∫",
	Iuml: "Ï",
	iuml: "ï",
	"Jcy;": "Й",
	"jcy;": "й",
	"Jfr;": "𝔍",
	"jfr;": "𝔧",
	"Kcy;": "К",
	"kcy;": "к",
	"Kfr;": "𝔎",
	"kfr;": "𝔨",
	"lap;": "⪅",
	"lat;": "⪫",
	"Lcy;": "Л",
	"lcy;": "л",
	"lEg;": "⪋",
	"leg;": "⋚",
	"leq;": "≤",
	"les;": "⩽",
	"Lfr;": "𝔏",
	"lfr;": "𝔩",
	"lgE;": "⪑",
	"lnE;": "≨",
	"lne;": "⪇",
	"loz;": "◊",
	"lrm;": "‎",
	"Lsh;": "↰",
	"lsh;": "↰",
	macr: "¯",
	"Map;": "⤅",
	"map;": "↦",
	"Mcy;": "М",
	"mcy;": "м",
	"Mfr;": "𝔐",
	"mfr;": "𝔪",
	"mho;": "℧",
	"mid;": "∣",
	"nap;": "≉",
	nbsp: " ",
	"Ncy;": "Н",
	"ncy;": "н",
	"Nfr;": "𝔑",
	"nfr;": "𝔫",
	"ngE;": "≧̸",
	"nge;": "≱",
	"nGg;": "⋙̸",
	"nGt;": "≫⃒",
	"ngt;": "≯",
	"nis;": "⋼",
	"niv;": "∋",
	"nlE;": "≦̸",
	"nle;": "≰",
	"nLl;": "⋘̸",
	"nLt;": "≪⃒",
	"nlt;": "≮",
	"Not;": "⫬",
	"not;": "¬",
	"npr;": "⊀",
	"nsc;": "⊁",
	"num;": "#",
	"Ocy;": "О",
	"ocy;": "о",
	"Ofr;": "𝔒",
	"ofr;": "𝔬",
	"ogt;": "⧁",
	"ohm;": "Ω",
	"olt;": "⧀",
	"ord;": "⩝",
	ordf: "ª",
	ordm: "º",
	"orv;": "⩛",
	Ouml: "Ö",
	ouml: "ö",
	"par;": "∥",
	para: "¶",
	"Pcy;": "П",
	"pcy;": "п",
	"Pfr;": "𝔓",
	"pfr;": "𝔭",
	"Phi;": "Φ",
	"phi;": "φ",
	"piv;": "ϖ",
	"prE;": "⪳",
	"pre;": "⪯",
	"Psi;": "Ψ",
	"psi;": "ψ",
	"Qfr;": "𝔔",
	"qfr;": "𝔮",
	QUOT: "\"",
	quot: "\"",
	"Rcy;": "Р",
	"rcy;": "р",
	"REG;": "®",
	"reg;": "®",
	"Rfr;": "ℜ",
	"rfr;": "𝔯",
	"Rho;": "Ρ",
	"rho;": "ρ",
	"rlm;": "‏",
	"Rsh;": "↱",
	"rsh;": "↱",
	"scE;": "⪴",
	"sce;": "⪰",
	"Scy;": "С",
	"scy;": "с",
	sect: "§",
	"Sfr;": "𝔖",
	"sfr;": "𝔰",
	"shy;": "­",
	"sim;": "∼",
	"smt;": "⪪",
	"sol;": "/",
	"squ;": "□",
	"Sub;": "⋐",
	"sub;": "⊂",
	"Sum;": "∑",
	"sum;": "∑",
	"Sup;": "⋑",
	"sup;": "⊃",
	sup1: "¹",
	sup2: "²",
	sup3: "³",
	"Tab;": "\t",
	"Tau;": "Τ",
	"tau;": "τ",
	"Tcy;": "Т",
	"tcy;": "т",
	"Tfr;": "𝔗",
	"tfr;": "𝔱",
	"top;": "⊤",
	"Ucy;": "У",
	"ucy;": "у",
	"Ufr;": "𝔘",
	"ufr;": "𝔲",
	"uml;": "¨",
	Uuml: "Ü",
	uuml: "ü",
	"Vcy;": "В",
	"vcy;": "в",
	"Vee;": "⋁",
	"vee;": "∨",
	"Vfr;": "𝔙",
	"vfr;": "𝔳",
	"Wfr;": "𝔚",
	"wfr;": "𝔴",
	"Xfr;": "𝔛",
	"xfr;": "𝔵",
	"Ycy;": "Ы",
	"ycy;": "ы",
	"yen;": "¥",
	"Yfr;": "𝔜",
	"yfr;": "𝔶",
	yuml: "ÿ",
	"Zcy;": "З",
	"zcy;": "з",
	"Zfr;": "ℨ",
	"zfr;": "𝔷",
	"zwj;": "‍",
	Acirc: "Â",
	acirc: "â",
	acute: "´",
	AElig: "Æ",
	aelig: "æ",
	"andd;": "⩜",
	"andv;": "⩚",
	"ange;": "⦤",
	"Aopf;": "𝔸",
	"aopf;": "𝕒",
	"apid;": "≋",
	"apos;": "'",
	Aring: "Å",
	aring: "å",
	"Ascr;": "𝒜",
	"ascr;": "𝒶",
	"Auml;": "Ä",
	"auml;": "ä",
	"Barv;": "⫧",
	"bbrk;": "⎵",
	"Beta;": "Β",
	"beta;": "β",
	"beth;": "ℶ",
	"bNot;": "⫭",
	"bnot;": "⌐",
	"Bopf;": "𝔹",
	"bopf;": "𝕓",
	"boxH;": "═",
	"boxh;": "─",
	"boxV;": "║",
	"boxv;": "│",
	"Bscr;": "ℬ",
	"bscr;": "𝒷",
	"bsim;": "∽",
	"bsol;": "\\",
	"bull;": "•",
	"bump;": "≎",
	"caps;": "∩︀",
	"Cdot;": "Ċ",
	"cdot;": "ċ",
	cedil: "¸",
	"cent;": "¢",
	"CHcy;": "Ч",
	"chcy;": "ч",
	"circ;": "ˆ",
	"cirE;": "⧃",
	"cire;": "≗",
	"comp;": "∁",
	"cong;": "≅",
	"Copf;": "ℂ",
	"copf;": "𝕔",
	"COPY;": "©",
	"copy;": "©",
	"Cscr;": "𝒞",
	"cscr;": "𝒸",
	"csub;": "⫏",
	"csup;": "⫐",
	"cups;": "∪︀",
	"Darr;": "↡",
	"dArr;": "⇓",
	"darr;": "↓",
	"dash;": "‐",
	"dHar;": "⥥",
	"diam;": "⋄",
	"DJcy;": "Ђ",
	"djcy;": "ђ",
	"Dopf;": "𝔻",
	"dopf;": "𝕕",
	"Dscr;": "𝒟",
	"dscr;": "𝒹",
	"DScy;": "Ѕ",
	"dscy;": "ѕ",
	"dsol;": "⧶",
	"dtri;": "▿",
	"DZcy;": "Џ",
	"dzcy;": "џ",
	"ecir;": "≖",
	Ecirc: "Ê",
	ecirc: "ê",
	"Edot;": "Ė",
	"eDot;": "≑",
	"edot;": "ė",
	"emsp;": " ",
	"ensp;": " ",
	"Eopf;": "𝔼",
	"eopf;": "𝕖",
	"epar;": "⋕",
	"epsi;": "ε",
	"Escr;": "ℰ",
	"escr;": "ℯ",
	"Esim;": "⩳",
	"esim;": "≂",
	"Euml;": "Ë",
	"euml;": "ë",
	"euro;": "€",
	"excl;": "!",
	"flat;": "♭",
	"fnof;": "ƒ",
	"Fopf;": "𝔽",
	"fopf;": "𝕗",
	"fork;": "⋔",
	"Fscr;": "ℱ",
	"fscr;": "𝒻",
	"Gdot;": "Ġ",
	"gdot;": "ġ",
	"geqq;": "≧",
	"gesl;": "⋛︀",
	"GJcy;": "Ѓ",
	"gjcy;": "ѓ",
	"gnap;": "⪊",
	"gneq;": "⪈",
	"Gopf;": "𝔾",
	"gopf;": "𝕘",
	"Gscr;": "𝒢",
	"gscr;": "ℊ",
	"gsim;": "≳",
	"gtcc;": "⪧",
	"gvnE;": "≩︀",
	"half;": "½",
	"hArr;": "⇔",
	"harr;": "↔",
	"hbar;": "ℏ",
	"Hopf;": "ℍ",
	"hopf;": "𝕙",
	"Hscr;": "ℋ",
	"hscr;": "𝒽",
	Icirc: "Î",
	icirc: "î",
	"Idot;": "İ",
	"IEcy;": "Е",
	"iecy;": "е",
	iexcl: "¡",
	"imof;": "⊷",
	"IOcy;": "Ё",
	"iocy;": "ё",
	"Iopf;": "𝕀",
	"iopf;": "𝕚",
	"Iota;": "Ι",
	"iota;": "ι",
	"Iscr;": "ℐ",
	"iscr;": "𝒾",
	"isin;": "∈",
	"Iuml;": "Ï",
	"iuml;": "ï",
	"Jopf;": "𝕁",
	"jopf;": "𝕛",
	"Jscr;": "𝒥",
	"jscr;": "𝒿",
	"KHcy;": "Х",
	"khcy;": "х",
	"KJcy;": "Ќ",
	"kjcy;": "ќ",
	"Kopf;": "𝕂",
	"kopf;": "𝕜",
	"Kscr;": "𝒦",
	"kscr;": "𝓀",
	"Lang;": "⟪",
	"lang;": "⟨",
	laquo: "«",
	"Larr;": "↞",
	"lArr;": "⇐",
	"larr;": "←",
	"late;": "⪭",
	"lcub;": "{",
	"ldca;": "⤶",
	"ldsh;": "↲",
	"leqq;": "≦",
	"lesg;": "⋚︀",
	"lHar;": "⥢",
	"LJcy;": "Љ",
	"ljcy;": "љ",
	"lnap;": "⪉",
	"lneq;": "⪇",
	"Lopf;": "𝕃",
	"lopf;": "𝕝",
	"lozf;": "⧫",
	"lpar;": "(",
	"Lscr;": "ℒ",
	"lscr;": "𝓁",
	"lsim;": "≲",
	"lsqb;": "[",
	"ltcc;": "⪦",
	"ltri;": "◃",
	"lvnE;": "≨︀",
	"macr;": "¯",
	"male;": "♂",
	"malt;": "✠",
	micro: "µ",
	"mlcp;": "⫛",
	"mldr;": "…",
	"Mopf;": "𝕄",
	"mopf;": "𝕞",
	"Mscr;": "ℳ",
	"mscr;": "𝓂",
	"nang;": "∠⃒",
	"napE;": "⩰̸",
	"nbsp;": " ",
	"ncap;": "⩃",
	"ncup;": "⩂",
	"ngeq;": "≱",
	"nges;": "⩾̸",
	"ngtr;": "≯",
	"nGtv;": "≫̸",
	"nisd;": "⋺",
	"NJcy;": "Њ",
	"njcy;": "њ",
	"nldr;": "‥",
	"nleq;": "≰",
	"nles;": "⩽̸",
	"nLtv;": "≪̸",
	"nmid;": "∤",
	"Nopf;": "ℕ",
	"nopf;": "𝕟",
	"npar;": "∦",
	"npre;": "⪯̸",
	"nsce;": "⪰̸",
	"Nscr;": "𝒩",
	"nscr;": "𝓃",
	"nsim;": "≁",
	"nsub;": "⊄",
	"nsup;": "⊅",
	"ntgl;": "≹",
	"ntlg;": "≸",
	"nvap;": "≍⃒",
	"nvge;": "≥⃒",
	"nvgt;": ">⃒",
	"nvle;": "≤⃒",
	"nvlt;": "<⃒",
	"oast;": "⊛",
	"ocir;": "⊚",
	Ocirc: "Ô",
	ocirc: "ô",
	"odiv;": "⨸",
	"odot;": "⊙",
	"ogon;": "˛",
	"oint;": "∮",
	"omid;": "⦶",
	"Oopf;": "𝕆",
	"oopf;": "𝕠",
	"opar;": "⦷",
	"ordf;": "ª",
	"ordm;": "º",
	"oror;": "⩖",
	"Oscr;": "𝒪",
	"oscr;": "ℴ",
	"osol;": "⊘",
	"Ouml;": "Ö",
	"ouml;": "ö",
	"para;": "¶",
	"part;": "∂",
	"perp;": "⊥",
	"phiv;": "ϕ",
	"plus;": "+",
	"Popf;": "ℙ",
	"popf;": "𝕡",
	pound: "£",
	"prap;": "⪷",
	"prec;": "≺",
	"prnE;": "⪵",
	"prod;": "∏",
	"prop;": "∝",
	"Pscr;": "𝒫",
	"pscr;": "𝓅",
	"qint;": "⨌",
	"Qopf;": "ℚ",
	"qopf;": "𝕢",
	"Qscr;": "𝒬",
	"qscr;": "𝓆",
	"QUOT;": "\"",
	"quot;": "\"",
	"race;": "∽̱",
	"Rang;": "⟫",
	"rang;": "⟩",
	raquo: "»",
	"Rarr;": "↠",
	"rArr;": "⇒",
	"rarr;": "→",
	"rcub;": "}",
	"rdca;": "⤷",
	"rdsh;": "↳",
	"real;": "ℜ",
	"rect;": "▭",
	"rHar;": "⥤",
	"rhov;": "ϱ",
	"ring;": "˚",
	"Ropf;": "ℝ",
	"ropf;": "𝕣",
	"rpar;": ")",
	"Rscr;": "ℛ",
	"rscr;": "𝓇",
	"rsqb;": "]",
	"rtri;": "▹",
	"scap;": "⪸",
	"scnE;": "⪶",
	"sdot;": "⋅",
	"sect;": "§",
	"semi;": ";",
	"sext;": "✶",
	"SHcy;": "Ш",
	"shcy;": "ш",
	"sime;": "≃",
	"simg;": "⪞",
	"siml;": "⪝",
	"smid;": "∣",
	"smte;": "⪬",
	"solb;": "⧄",
	"Sopf;": "𝕊",
	"sopf;": "𝕤",
	"spar;": "∥",
	"Sqrt;": "√",
	"squf;": "▪",
	"Sscr;": "𝒮",
	"sscr;": "𝓈",
	"Star;": "⋆",
	"star;": "☆",
	"subE;": "⫅",
	"sube;": "⊆",
	"succ;": "≻",
	"sung;": "♪",
	"sup1;": "¹",
	"sup2;": "²",
	"sup3;": "³",
	"supE;": "⫆",
	"supe;": "⊇",
	szlig: "ß",
	"tbrk;": "⎴",
	"tdot;": "⃛",
	THORN: "Þ",
	thorn: "þ",
	times: "×",
	"tint;": "∭",
	"toea;": "⤨",
	"Topf;": "𝕋",
	"topf;": "𝕥",
	"tosa;": "⤩",
	"trie;": "≜",
	"Tscr;": "𝒯",
	"tscr;": "𝓉",
	"TScy;": "Ц",
	"tscy;": "ц",
	"Uarr;": "↟",
	"uArr;": "⇑",
	"uarr;": "↑",
	Ucirc: "Û",
	ucirc: "û",
	"uHar;": "⥣",
	"Uopf;": "𝕌",
	"uopf;": "𝕦",
	"Upsi;": "ϒ",
	"upsi;": "υ",
	"Uscr;": "𝒰",
	"uscr;": "𝓊",
	"utri;": "▵",
	"Uuml;": "Ü",
	"uuml;": "ü",
	"vArr;": "⇕",
	"varr;": "↕",
	"Vbar;": "⫫",
	"vBar;": "⫨",
	"Vert;": "‖",
	"vert;": "|",
	"Vopf;": "𝕍",
	"vopf;": "𝕧",
	"Vscr;": "𝒱",
	"vscr;": "𝓋",
	"Wopf;": "𝕎",
	"wopf;": "𝕨",
	"Wscr;": "𝒲",
	"wscr;": "𝓌",
	"xcap;": "⋂",
	"xcup;": "⋃",
	"xmap;": "⟼",
	"xnis;": "⋻",
	"Xopf;": "𝕏",
	"xopf;": "𝕩",
	"Xscr;": "𝒳",
	"xscr;": "𝓍",
	"xvee;": "⋁",
	"YAcy;": "Я",
	"yacy;": "я",
	"YIcy;": "Ї",
	"yicy;": "ї",
	"Yopf;": "𝕐",
	"yopf;": "𝕪",
	"Yscr;": "𝒴",
	"yscr;": "𝓎",
	"YUcy;": "Ю",
	"yucy;": "ю",
	"Yuml;": "Ÿ",
	"yuml;": "ÿ",
	"Zdot;": "Ż",
	"zdot;": "ż",
	"Zeta;": "Ζ",
	"zeta;": "ζ",
	"ZHcy;": "Ж",
	"zhcy;": "ж",
	"Zopf;": "ℤ",
	"zopf;": "𝕫",
	"Zscr;": "𝒵",
	"zscr;": "𝓏",
	"zwnj;": "‌",
	Aacute: "Á",
	aacute: "á",
	"Acirc;": "Â",
	"acirc;": "â",
	"acute;": "´",
	"AElig;": "Æ",
	"aelig;": "æ",
	Agrave: "À",
	agrave: "à",
	"aleph;": "ℵ",
	"Alpha;": "Α",
	"alpha;": "α",
	"Amacr;": "Ā",
	"amacr;": "ā",
	"amalg;": "⨿",
	"angle;": "∠",
	"angrt;": "∟",
	"angst;": "Å",
	"Aogon;": "Ą",
	"aogon;": "ą",
	"Aring;": "Å",
	"aring;": "å",
	"asymp;": "≈",
	Atilde: "Ã",
	atilde: "ã",
	"awint;": "⨑",
	"bcong;": "≌",
	"bdquo;": "„",
	"bepsi;": "϶",
	"blank;": "␣",
	"blk12;": "▒",
	"blk14;": "░",
	"blk34;": "▓",
	"block;": "█",
	"boxDL;": "╗",
	"boxDl;": "╖",
	"boxdL;": "╕",
	"boxdl;": "┐",
	"boxDR;": "╔",
	"boxDr;": "╓",
	"boxdR;": "╒",
	"boxdr;": "┌",
	"boxHD;": "╦",
	"boxHd;": "╤",
	"boxhD;": "╥",
	"boxhd;": "┬",
	"boxHU;": "╩",
	"boxHu;": "╧",
	"boxhU;": "╨",
	"boxhu;": "┴",
	"boxUL;": "╝",
	"boxUl;": "╜",
	"boxuL;": "╛",
	"boxul;": "┘",
	"boxUR;": "╚",
	"boxUr;": "╙",
	"boxuR;": "╘",
	"boxur;": "└",
	"boxVH;": "╬",
	"boxVh;": "╫",
	"boxvH;": "╪",
	"boxvh;": "┼",
	"boxVL;": "╣",
	"boxVl;": "╢",
	"boxvL;": "╡",
	"boxvl;": "┤",
	"boxVR;": "╠",
	"boxVr;": "╟",
	"boxvR;": "╞",
	"boxvr;": "├",
	"Breve;": "˘",
	"breve;": "˘",
	brvbar: "¦",
	"bsemi;": "⁏",
	"bsime;": "⋍",
	"bsolb;": "⧅",
	"bumpE;": "⪮",
	"bumpe;": "≏",
	"caret;": "⁁",
	"caron;": "ˇ",
	"ccaps;": "⩍",
	Ccedil: "Ç",
	ccedil: "ç",
	"Ccirc;": "Ĉ",
	"ccirc;": "ĉ",
	"ccups;": "⩌",
	"cedil;": "¸",
	"check;": "✓",
	"clubs;": "♣",
	"Colon;": "∷",
	"colon;": ":",
	"comma;": ",",
	"crarr;": "↵",
	"Cross;": "⨯",
	"cross;": "✗",
	"csube;": "⫑",
	"csupe;": "⫒",
	"ctdot;": "⋯",
	"cuepr;": "⋞",
	"cuesc;": "⋟",
	"cupor;": "⩅",
	curren: "¤",
	"cuvee;": "⋎",
	"cuwed;": "⋏",
	"cwint;": "∱",
	"Dashv;": "⫤",
	"dashv;": "⊣",
	"dblac;": "˝",
	"ddarr;": "⇊",
	"Delta;": "Δ",
	"delta;": "δ",
	"dharl;": "⇃",
	"dharr;": "⇂",
	"diams;": "♦",
	"disin;": "⋲",
	divide: "÷",
	"doteq;": "≐",
	"dtdot;": "⋱",
	"dtrif;": "▾",
	"duarr;": "⇵",
	"duhar;": "⥯",
	Eacute: "É",
	eacute: "é",
	"Ecirc;": "Ê",
	"ecirc;": "ê",
	"eDDot;": "⩷",
	"efDot;": "≒",
	Egrave: "È",
	egrave: "è",
	"Emacr;": "Ē",
	"emacr;": "ē",
	"empty;": "∅",
	"Eogon;": "Ę",
	"eogon;": "ę",
	"eplus;": "⩱",
	"epsiv;": "ϵ",
	"eqsim;": "≂",
	"Equal;": "⩵",
	"equiv;": "≡",
	"erarr;": "⥱",
	"erDot;": "≓",
	"esdot;": "≐",
	"exist;": "∃",
	"fflig;": "ﬀ",
	"filig;": "ﬁ",
	"fjlig;": "fj",
	"fllig;": "ﬂ",
	"fltns;": "▱",
	"forkv;": "⫙",
	frac12: "½",
	frac14: "¼",
	frac34: "¾",
	"frasl;": "⁄",
	"frown;": "⌢",
	"Gamma;": "Γ",
	"gamma;": "γ",
	"Gcirc;": "Ĝ",
	"gcirc;": "ĝ",
	"gescc;": "⪩",
	"gimel;": "ℷ",
	"gneqq;": "≩",
	"gnsim;": "⋧",
	"grave;": "`",
	"gsime;": "⪎",
	"gsiml;": "⪐",
	"gtcir;": "⩺",
	"gtdot;": "⋗",
	"Hacek;": "ˇ",
	"harrw;": "↭",
	"Hcirc;": "Ĥ",
	"hcirc;": "ĥ",
	"hoarr;": "⇿",
	Iacute: "Í",
	iacute: "í",
	"Icirc;": "Î",
	"icirc;": "î",
	"iexcl;": "¡",
	Igrave: "Ì",
	igrave: "ì",
	"iiint;": "∭",
	"iiota;": "℩",
	"IJlig;": "Ĳ",
	"ijlig;": "ĳ",
	"Imacr;": "Ī",
	"imacr;": "ī",
	"image;": "ℑ",
	"imath;": "ı",
	"imped;": "Ƶ",
	"infin;": "∞",
	"Iogon;": "Į",
	"iogon;": "į",
	"iprod;": "⨼",
	iquest: "¿",
	"isinE;": "⋹",
	"isins;": "⋴",
	"isinv;": "∈",
	"Iukcy;": "І",
	"iukcy;": "і",
	"Jcirc;": "Ĵ",
	"jcirc;": "ĵ",
	"jmath;": "ȷ",
	"Jukcy;": "Є",
	"jukcy;": "є",
	"Kappa;": "Κ",
	"kappa;": "κ",
	"lAarr;": "⇚",
	"langd;": "⦑",
	"laquo;": "«",
	"larrb;": "⇤",
	"lates;": "⪭︀",
	"lBarr;": "⤎",
	"lbarr;": "⤌",
	"lbbrk;": "❲",
	"lbrke;": "⦋",
	"lceil;": "⌈",
	"ldquo;": "“",
	"lescc;": "⪨",
	"lhard;": "↽",
	"lharu;": "↼",
	"lhblk;": "▄",
	"llarr;": "⇇",
	"lltri;": "◺",
	"lneqq;": "≨",
	"lnsim;": "⋦",
	"loang;": "⟬",
	"loarr;": "⇽",
	"lobrk;": "⟦",
	"lopar;": "⦅",
	"lrarr;": "⇆",
	"lrhar;": "⇋",
	"lrtri;": "⊿",
	"lsime;": "⪍",
	"lsimg;": "⪏",
	"lsquo;": "‘",
	"ltcir;": "⩹",
	"ltdot;": "⋖",
	"ltrie;": "⊴",
	"ltrif;": "◂",
	"mdash;": "—",
	"mDDot;": "∺",
	"micro;": "µ",
	middot: "·",
	"minus;": "−",
	"mumap;": "⊸",
	"nabla;": "∇",
	"napid;": "≋̸",
	"napos;": "ŉ",
	"natur;": "♮",
	"nbump;": "≎̸",
	"ncong;": "≇",
	"ndash;": "–",
	"neArr;": "⇗",
	"nearr;": "↗",
	"nedot;": "≐̸",
	"nesim;": "≂̸",
	"ngeqq;": "≧̸",
	"ngsim;": "≵",
	"nhArr;": "⇎",
	"nharr;": "↮",
	"nhpar;": "⫲",
	"nlArr;": "⇍",
	"nlarr;": "↚",
	"nleqq;": "≦̸",
	"nless;": "≮",
	"nlsim;": "≴",
	"nltri;": "⋪",
	"notin;": "∉",
	"notni;": "∌",
	"npart;": "∂̸",
	"nprec;": "⊀",
	"nrArr;": "⇏",
	"nrarr;": "↛",
	"nrtri;": "⋫",
	"nsime;": "≄",
	"nsmid;": "∤",
	"nspar;": "∦",
	"nsubE;": "⫅̸",
	"nsube;": "⊈",
	"nsucc;": "⊁",
	"nsupE;": "⫆̸",
	"nsupe;": "⊉",
	Ntilde: "Ñ",
	ntilde: "ñ",
	"numsp;": " ",
	"nvsim;": "∼⃒",
	"nwArr;": "⇖",
	"nwarr;": "↖",
	Oacute: "Ó",
	oacute: "ó",
	"Ocirc;": "Ô",
	"ocirc;": "ô",
	"odash;": "⊝",
	"OElig;": "Œ",
	"oelig;": "œ",
	"ofcir;": "⦿",
	Ograve: "Ò",
	ograve: "ò",
	"ohbar;": "⦵",
	"olarr;": "↺",
	"olcir;": "⦾",
	"oline;": "‾",
	"Omacr;": "Ō",
	"omacr;": "ō",
	"Omega;": "Ω",
	"omega;": "ω",
	"operp;": "⦹",
	"oplus;": "⊕",
	"orarr;": "↻",
	"order;": "ℴ",
	Oslash: "Ø",
	oslash: "ø",
	Otilde: "Õ",
	otilde: "õ",
	"ovbar;": "⌽",
	"parsl;": "⫽",
	"phone;": "☎",
	"plusb;": "⊞",
	"pluse;": "⩲",
	plusmn: "±",
	"pound;": "£",
	"prcue;": "≼",
	"Prime;": "″",
	"prime;": "′",
	"prnap;": "⪹",
	"prsim;": "≾",
	"quest;": "?",
	"rAarr;": "⇛",
	"radic;": "√",
	"rangd;": "⦒",
	"range;": "⦥",
	"raquo;": "»",
	"rarrb;": "⇥",
	"rarrc;": "⤳",
	"rarrw;": "↝",
	"ratio;": "∶",
	"RBarr;": "⤐",
	"rBarr;": "⤏",
	"rbarr;": "⤍",
	"rbbrk;": "❳",
	"rbrke;": "⦌",
	"rceil;": "⌉",
	"rdquo;": "”",
	"reals;": "ℝ",
	"rhard;": "⇁",
	"rharu;": "⇀",
	"rlarr;": "⇄",
	"rlhar;": "⇌",
	"rnmid;": "⫮",
	"roang;": "⟭",
	"roarr;": "⇾",
	"robrk;": "⟧",
	"ropar;": "⦆",
	"rrarr;": "⇉",
	"rsquo;": "’",
	"rtrie;": "⊵",
	"rtrif;": "▸",
	"sbquo;": "‚",
	"sccue;": "≽",
	"Scirc;": "Ŝ",
	"scirc;": "ŝ",
	"scnap;": "⪺",
	"scsim;": "≿",
	"sdotb;": "⊡",
	"sdote;": "⩦",
	"seArr;": "⇘",
	"searr;": "↘",
	"setmn;": "∖",
	"sharp;": "♯",
	"Sigma;": "Σ",
	"sigma;": "σ",
	"simeq;": "≃",
	"simgE;": "⪠",
	"simlE;": "⪟",
	"simne;": "≆",
	"slarr;": "←",
	"smile;": "⌣",
	"smtes;": "⪬︀",
	"sqcap;": "⊓",
	"sqcup;": "⊔",
	"sqsub;": "⊏",
	"sqsup;": "⊐",
	"srarr;": "→",
	"starf;": "★",
	"strns;": "¯",
	"subnE;": "⫋",
	"subne;": "⊊",
	"supnE;": "⫌",
	"supne;": "⊋",
	"swArr;": "⇙",
	"swarr;": "↙",
	"szlig;": "ß",
	"Theta;": "Θ",
	"theta;": "θ",
	"thkap;": "≈",
	"THORN;": "Þ",
	"thorn;": "þ",
	"Tilde;": "∼",
	"tilde;": "˜",
	"times;": "×",
	"TRADE;": "™",
	"trade;": "™",
	"trisb;": "⧍",
	"TSHcy;": "Ћ",
	"tshcy;": "ћ",
	"twixt;": "≬",
	Uacute: "Ú",
	uacute: "ú",
	"Ubrcy;": "Ў",
	"ubrcy;": "ў",
	"Ucirc;": "Û",
	"ucirc;": "û",
	"udarr;": "⇅",
	"udhar;": "⥮",
	Ugrave: "Ù",
	ugrave: "ù",
	"uharl;": "↿",
	"uharr;": "↾",
	"uhblk;": "▀",
	"ultri;": "◸",
	"Umacr;": "Ū",
	"umacr;": "ū",
	"Union;": "⋃",
	"Uogon;": "Ų",
	"uogon;": "ų",
	"uplus;": "⊎",
	"upsih;": "ϒ",
	"UpTee;": "⊥",
	"Uring;": "Ů",
	"uring;": "ů",
	"urtri;": "◹",
	"utdot;": "⋰",
	"utrif;": "▴",
	"uuarr;": "⇈",
	"varpi;": "ϖ",
	"vBarv;": "⫩",
	"VDash;": "⊫",
	"Vdash;": "⊩",
	"vDash;": "⊨",
	"vdash;": "⊢",
	"veeeq;": "≚",
	"vltri;": "⊲",
	"vnsub;": "⊂⃒",
	"vnsup;": "⊃⃒",
	"vprop;": "∝",
	"vrtri;": "⊳",
	"Wcirc;": "Ŵ",
	"wcirc;": "ŵ",
	"Wedge;": "⋀",
	"wedge;": "∧",
	"xcirc;": "◯",
	"xdtri;": "▽",
	"xhArr;": "⟺",
	"xharr;": "⟷",
	"xlArr;": "⟸",
	"xlarr;": "⟵",
	"xodot;": "⨀",
	"xrArr;": "⟹",
	"xrarr;": "⟶",
	"xutri;": "△",
	Yacute: "Ý",
	yacute: "ý",
	"Ycirc;": "Ŷ",
	"ycirc;": "ŷ",
	"Aacute;": "Á",
	"aacute;": "á",
	"Abreve;": "Ă",
	"abreve;": "ă",
	"Agrave;": "À",
	"agrave;": "à",
	"andand;": "⩕",
	"angmsd;": "∡",
	"angsph;": "∢",
	"apacir;": "⩯",
	"approx;": "≈",
	"Assign;": "≔",
	"Atilde;": "Ã",
	"atilde;": "ã",
	"barvee;": "⊽",
	"Barwed;": "⌆",
	"barwed;": "⌅",
	"becaus;": "∵",
	"bernou;": "ℬ",
	"bigcap;": "⋂",
	"bigcup;": "⋃",
	"bigvee;": "⋁",
	"bkarow;": "⤍",
	"bottom;": "⊥",
	"bowtie;": "⋈",
	"boxbox;": "⧉",
	"bprime;": "‵",
	"brvbar;": "¦",
	"bullet;": "•",
	"Bumpeq;": "≎",
	"bumpeq;": "≏",
	"Cacute;": "Ć",
	"cacute;": "ć",
	"capand;": "⩄",
	"capcap;": "⩋",
	"capcup;": "⩇",
	"capdot;": "⩀",
	"Ccaron;": "Č",
	"ccaron;": "č",
	"Ccedil;": "Ç",
	"ccedil;": "ç",
	"circeq;": "≗",
	"cirmid;": "⫯",
	"Colone;": "⩴",
	"colone;": "≔",
	"commat;": "@",
	"compfn;": "∘",
	"Conint;": "∯",
	"conint;": "∮",
	"coprod;": "∐",
	"copysr;": "℗",
	"cularr;": "↶",
	"CupCap;": "≍",
	"cupcap;": "⩆",
	"cupcup;": "⩊",
	"cupdot;": "⊍",
	"curarr;": "↷",
	"curren;": "¤",
	"cylcty;": "⌭",
	"Dagger;": "‡",
	"dagger;": "†",
	"daleth;": "ℸ",
	"Dcaron;": "Ď",
	"dcaron;": "ď",
	"dfisht;": "⥿",
	"divide;": "÷",
	"divonx;": "⋇",
	"dlcorn;": "⌞",
	"dlcrop;": "⌍",
	"dollar;": "$",
	"DotDot;": "⃜",
	"drcorn;": "⌟",
	"drcrop;": "⌌",
	"Dstrok;": "Đ",
	"dstrok;": "đ",
	"Eacute;": "É",
	"eacute;": "é",
	"easter;": "⩮",
	"Ecaron;": "Ě",
	"ecaron;": "ě",
	"ecolon;": "≕",
	"Egrave;": "È",
	"egrave;": "è",
	"egsdot;": "⪘",
	"elsdot;": "⪗",
	"emptyv;": "∅",
	"emsp13;": " ",
	"emsp14;": " ",
	"eparsl;": "⧣",
	"eqcirc;": "≖",
	"equals;": "=",
	"equest;": "≟",
	"Exists;": "∃",
	"female;": "♀",
	"ffilig;": "ﬃ",
	"ffllig;": "ﬄ",
	"ForAll;": "∀",
	"forall;": "∀",
	"frac12;": "½",
	"frac13;": "⅓",
	"frac14;": "¼",
	"frac15;": "⅕",
	"frac16;": "⅙",
	"frac18;": "⅛",
	"frac23;": "⅔",
	"frac25;": "⅖",
	"frac34;": "¾",
	"frac35;": "⅗",
	"frac38;": "⅜",
	"frac45;": "⅘",
	"frac56;": "⅚",
	"frac58;": "⅝",
	"frac78;": "⅞",
	"gacute;": "ǵ",
	"Gammad;": "Ϝ",
	"gammad;": "ϝ",
	"Gbreve;": "Ğ",
	"gbreve;": "ğ",
	"Gcedil;": "Ģ",
	"gesdot;": "⪀",
	"gesles;": "⪔",
	"gtlPar;": "⦕",
	"gtrarr;": "⥸",
	"gtrdot;": "⋗",
	"gtrsim;": "≳",
	"hairsp;": " ",
	"hamilt;": "ℋ",
	"HARDcy;": "Ъ",
	"hardcy;": "ъ",
	"hearts;": "♥",
	"hellip;": "…",
	"hercon;": "⊹",
	"homtht;": "∻",
	"horbar;": "―",
	"hslash;": "ℏ",
	"Hstrok;": "Ħ",
	"hstrok;": "ħ",
	"hybull;": "⁃",
	"hyphen;": "‐",
	"Iacute;": "Í",
	"iacute;": "í",
	"Igrave;": "Ì",
	"igrave;": "ì",
	"iiiint;": "⨌",
	"iinfin;": "⧜",
	"incare;": "℅",
	"inodot;": "ı",
	"intcal;": "⊺",
	"iquest;": "¿",
	"isinsv;": "⋳",
	"Itilde;": "Ĩ",
	"itilde;": "ĩ",
	"Jsercy;": "Ј",
	"jsercy;": "ј",
	"kappav;": "ϰ",
	"Kcedil;": "Ķ",
	"kcedil;": "ķ",
	"kgreen;": "ĸ",
	"Lacute;": "Ĺ",
	"lacute;": "ĺ",
	"lagran;": "ℒ",
	"Lambda;": "Λ",
	"lambda;": "λ",
	"langle;": "⟨",
	"larrfs;": "⤝",
	"larrhk;": "↩",
	"larrlp;": "↫",
	"larrpl;": "⤹",
	"larrtl;": "↢",
	"lAtail;": "⤛",
	"latail;": "⤙",
	"lbrace;": "{",
	"lbrack;": "[",
	"Lcaron;": "Ľ",
	"lcaron;": "ľ",
	"Lcedil;": "Ļ",
	"lcedil;": "ļ",
	"ldquor;": "„",
	"lesdot;": "⩿",
	"lesges;": "⪓",
	"lfisht;": "⥼",
	"lfloor;": "⌊",
	"lharul;": "⥪",
	"llhard;": "⥫",
	"Lmidot;": "Ŀ",
	"lmidot;": "ŀ",
	"lmoust;": "⎰",
	"loplus;": "⨭",
	"lowast;": "∗",
	"lowbar;": "_",
	"lparlt;": "⦓",
	"lrhard;": "⥭",
	"lsaquo;": "‹",
	"lsquor;": "‚",
	"Lstrok;": "Ł",
	"lstrok;": "ł",
	"lthree;": "⋋",
	"ltimes;": "⋉",
	"ltlarr;": "⥶",
	"ltrPar;": "⦖",
	"mapsto;": "↦",
	"marker;": "▮",
	"mcomma;": "⨩",
	"midast;": "*",
	"midcir;": "⫰",
	"middot;": "·",
	"minusb;": "⊟",
	"minusd;": "∸",
	"mnplus;": "∓",
	"models;": "⊧",
	"mstpos;": "∾",
	"Nacute;": "Ń",
	"nacute;": "ń",
	"nbumpe;": "≏̸",
	"Ncaron;": "Ň",
	"ncaron;": "ň",
	"Ncedil;": "Ņ",
	"ncedil;": "ņ",
	"nearhk;": "⤤",
	"nequiv;": "≢",
	"nesear;": "⤨",
	"nexist;": "∄",
	"nltrie;": "⋬",
	"notinE;": "⋹̸",
	"nparsl;": "⫽⃥",
	"nprcue;": "⋠",
	"nrarrc;": "⤳̸",
	"nrarrw;": "↝̸",
	"nrtrie;": "⋭",
	"nsccue;": "⋡",
	"nsimeq;": "≄",
	"Ntilde;": "Ñ",
	"ntilde;": "ñ",
	"numero;": "№",
	"nVDash;": "⊯",
	"nVdash;": "⊮",
	"nvDash;": "⊭",
	"nvdash;": "⊬",
	"nvHarr;": "⤄",
	"nvlArr;": "⤂",
	"nvrArr;": "⤃",
	"nwarhk;": "⤣",
	"nwnear;": "⤧",
	"Oacute;": "Ó",
	"oacute;": "ó",
	"Odblac;": "Ő",
	"odblac;": "ő",
	"odsold;": "⦼",
	"Ograve;": "Ò",
	"ograve;": "ò",
	"ominus;": "⊖",
	"origof;": "⊶",
	"Oslash;": "Ø",
	"oslash;": "ø",
	"Otilde;": "Õ",
	"otilde;": "õ",
	"Otimes;": "⨷",
	"otimes;": "⊗",
	"parsim;": "⫳",
	"percnt;": "%",
	"period;": ".",
	"permil;": "‰",
	"phmmat;": "ℳ",
	"planck;": "ℏ",
	"plankv;": "ℏ",
	"plusdo;": "∔",
	"plusdu;": "⨥",
	"plusmn;": "±",
	"preceq;": "⪯",
	"primes;": "ℙ",
	"prnsim;": "⋨",
	"propto;": "∝",
	"prurel;": "⊰",
	"puncsp;": " ",
	"qprime;": "⁗",
	"Racute;": "Ŕ",
	"racute;": "ŕ",
	"rangle;": "⟩",
	"rarrap;": "⥵",
	"rarrfs;": "⤞",
	"rarrhk;": "↪",
	"rarrlp;": "↬",
	"rarrpl;": "⥅",
	"Rarrtl;": "⤖",
	"rarrtl;": "↣",
	"rAtail;": "⤜",
	"ratail;": "⤚",
	"rbrace;": "}",
	"rbrack;": "]",
	"Rcaron;": "Ř",
	"rcaron;": "ř",
	"Rcedil;": "Ŗ",
	"rcedil;": "ŗ",
	"rdquor;": "”",
	"rfisht;": "⥽",
	"rfloor;": "⌋",
	"rharul;": "⥬",
	"rmoust;": "⎱",
	"roplus;": "⨮",
	"rpargt;": "⦔",
	"rsaquo;": "›",
	"rsquor;": "’",
	"rthree;": "⋌",
	"rtimes;": "⋊",
	"Sacute;": "Ś",
	"sacute;": "ś",
	"Scaron;": "Š",
	"scaron;": "š",
	"Scedil;": "Ş",
	"scedil;": "ş",
	"scnsim;": "⋩",
	"searhk;": "⤥",
	"seswar;": "⤩",
	"sfrown;": "⌢",
	"SHCHcy;": "Щ",
	"shchcy;": "щ",
	"sigmaf;": "ς",
	"sigmav;": "ς",
	"simdot;": "⩪",
	"smashp;": "⨳",
	"SOFTcy;": "Ь",
	"softcy;": "ь",
	"solbar;": "⌿",
	"spades;": "♠",
	"sqcaps;": "⊓︀",
	"sqcups;": "⊔︀",
	"sqsube;": "⊑",
	"sqsupe;": "⊒",
	"Square;": "□",
	"square;": "□",
	"squarf;": "▪",
	"ssetmn;": "∖",
	"ssmile;": "⌣",
	"sstarf;": "⋆",
	"subdot;": "⪽",
	"Subset;": "⋐",
	"subset;": "⊂",
	"subsim;": "⫇",
	"subsub;": "⫕",
	"subsup;": "⫓",
	"succeq;": "⪰",
	"supdot;": "⪾",
	"Supset;": "⋑",
	"supset;": "⊃",
	"supsim;": "⫈",
	"supsub;": "⫔",
	"supsup;": "⫖",
	"swarhk;": "⤦",
	"swnwar;": "⤪",
	"target;": "⌖",
	"Tcaron;": "Ť",
	"tcaron;": "ť",
	"Tcedil;": "Ţ",
	"tcedil;": "ţ",
	"telrec;": "⌕",
	"there4;": "∴",
	"thetav;": "ϑ",
	"thinsp;": " ",
	"thksim;": "∼",
	"timesb;": "⊠",
	"timesd;": "⨰",
	"topbot;": "⌶",
	"topcir;": "⫱",
	"tprime;": "‴",
	"tridot;": "◬",
	"Tstrok;": "Ŧ",
	"tstrok;": "ŧ",
	"Uacute;": "Ú",
	"uacute;": "ú",
	"Ubreve;": "Ŭ",
	"ubreve;": "ŭ",
	"Udblac;": "Ű",
	"udblac;": "ű",
	"ufisht;": "⥾",
	"Ugrave;": "Ù",
	"ugrave;": "ù",
	"ulcorn;": "⌜",
	"ulcrop;": "⌏",
	"urcorn;": "⌝",
	"urcrop;": "⌎",
	"Utilde;": "Ũ",
	"utilde;": "ũ",
	"vangrt;": "⦜",
	"varphi;": "ϕ",
	"varrho;": "ϱ",
	"Vdashl;": "⫦",
	"veebar;": "⊻",
	"vellip;": "⋮",
	"Verbar;": "‖",
	"verbar;": "|",
	"vsubnE;": "⫋︀",
	"vsubne;": "⊊︀",
	"vsupnE;": "⫌︀",
	"vsupne;": "⊋︀",
	"Vvdash;": "⊪",
	"wedbar;": "⩟",
	"wedgeq;": "≙",
	"weierp;": "℘",
	"wreath;": "≀",
	"xoplus;": "⨁",
	"xotime;": "⨂",
	"xsqcup;": "⨆",
	"xuplus;": "⨄",
	"xwedge;": "⋀",
	"Yacute;": "Ý",
	"yacute;": "ý",
	"Zacute;": "Ź",
	"zacute;": "ź",
	"Zcaron;": "Ž",
	"zcaron;": "ž",
	"zeetrf;": "ℨ",
	"alefsym;": "ℵ",
	"angrtvb;": "⊾",
	"angzarr;": "⍼",
	"asympeq;": "≍",
	"backsim;": "∽",
	"Because;": "∵",
	"because;": "∵",
	"bemptyv;": "⦰",
	"between;": "≬",
	"bigcirc;": "◯",
	"bigodot;": "⨀",
	"bigstar;": "★",
	"bnequiv;": "≡⃥",
	"boxplus;": "⊞",
	"Cayleys;": "ℭ",
	"Cconint;": "∰",
	"ccupssm;": "⩐",
	"Cedilla;": "¸",
	"cemptyv;": "⦲",
	"cirscir;": "⧂",
	"coloneq;": "≔",
	"congdot;": "⩭",
	"cudarrl;": "⤸",
	"cudarrr;": "⤵",
	"cularrp;": "⤽",
	"curarrm;": "⤼",
	"dbkarow;": "⤏",
	"ddagger;": "‡",
	"ddotseq;": "⩷",
	"demptyv;": "⦱",
	"Diamond;": "⋄",
	"diamond;": "⋄",
	"digamma;": "ϝ",
	"dotplus;": "∔",
	"DownTee;": "⊤",
	"dwangle;": "⦦",
	"Element;": "∈",
	"Epsilon;": "Ε",
	"epsilon;": "ε",
	"eqcolon;": "≕",
	"equivDD;": "⩸",
	"gesdoto;": "⪂",
	"gtquest;": "⩼",
	"gtrless;": "≷",
	"harrcir;": "⥈",
	"Implies;": "⇒",
	"intprod;": "⨼",
	"isindot;": "⋵",
	"larrbfs;": "⤟",
	"larrsim;": "⥳",
	"lbrksld;": "⦏",
	"lbrkslu;": "⦍",
	"ldrdhar;": "⥧",
	"LeftTee;": "⊣",
	"lesdoto;": "⪁",
	"lessdot;": "⋖",
	"lessgtr;": "≶",
	"lesssim;": "≲",
	"lotimes;": "⨴",
	"lozenge;": "◊",
	"ltquest;": "⩻",
	"luruhar;": "⥦",
	"maltese;": "✠",
	"minusdu;": "⨪",
	"napprox;": "≉",
	"natural;": "♮",
	"nearrow;": "↗",
	"NewLine;": "\n",
	"nexists;": "∄",
	"NoBreak;": "⁠",
	"notinva;": "∉",
	"notinvb;": "⋷",
	"notinvc;": "⋶",
	"NotLess;": "≮",
	"notniva;": "∌",
	"notnivb;": "⋾",
	"notnivc;": "⋽",
	"npolint;": "⨔",
	"npreceq;": "⪯̸",
	"nsqsube;": "⋢",
	"nsqsupe;": "⋣",
	"nsubset;": "⊂⃒",
	"nsucceq;": "⪰̸",
	"nsupset;": "⊃⃒",
	"nvinfin;": "⧞",
	"nvltrie;": "⊴⃒",
	"nvrtrie;": "⊵⃒",
	"nwarrow;": "↖",
	"olcross;": "⦻",
	"Omicron;": "Ο",
	"omicron;": "ο",
	"orderof;": "ℴ",
	"orslope;": "⩗",
	"OverBar;": "‾",
	"pertenk;": "‱",
	"planckh;": "ℎ",
	"pluscir;": "⨢",
	"plussim;": "⨦",
	"plustwo;": "⨧",
	"precsim;": "≾",
	"Product;": "∏",
	"quatint;": "⨖",
	"questeq;": "≟",
	"rarrbfs;": "⤠",
	"rarrsim;": "⥴",
	"rbrksld;": "⦎",
	"rbrkslu;": "⦐",
	"rdldhar;": "⥩",
	"realine;": "ℛ",
	"rotimes;": "⨵",
	"ruluhar;": "⥨",
	"searrow;": "↘",
	"simplus;": "⨤",
	"simrarr;": "⥲",
	"subedot;": "⫃",
	"submult;": "⫁",
	"subplus;": "⪿",
	"subrarr;": "⥹",
	"succsim;": "≿",
	"supdsub;": "⫘",
	"supedot;": "⫄",
	"suphsol;": "⟉",
	"suphsub;": "⫗",
	"suplarr;": "⥻",
	"supmult;": "⫂",
	"supplus;": "⫀",
	"swarrow;": "↙",
	"topfork;": "⫚",
	"triplus;": "⨹",
	"tritime;": "⨻",
	"UpArrow;": "↑",
	"Uparrow;": "⇑",
	"uparrow;": "↑",
	"Upsilon;": "Υ",
	"upsilon;": "υ",
	"uwangle;": "⦧",
	"vzigzag;": "⦚",
	"zigrarr;": "⇝",
	"andslope;": "⩘",
	"angmsdaa;": "⦨",
	"angmsdab;": "⦩",
	"angmsdac;": "⦪",
	"angmsdad;": "⦫",
	"angmsdae;": "⦬",
	"angmsdaf;": "⦭",
	"angmsdag;": "⦮",
	"angmsdah;": "⦯",
	"angrtvbd;": "⦝",
	"approxeq;": "≊",
	"awconint;": "∳",
	"backcong;": "≌",
	"barwedge;": "⌅",
	"bbrktbrk;": "⎶",
	"bigoplus;": "⨁",
	"bigsqcup;": "⨆",
	"biguplus;": "⨄",
	"bigwedge;": "⋀",
	"boxminus;": "⊟",
	"boxtimes;": "⊠",
	"bsolhsub;": "⟈",
	"capbrcup;": "⩉",
	"circledR;": "®",
	"circledS;": "Ⓢ",
	"cirfnint;": "⨐",
	"clubsuit;": "♣",
	"cupbrcap;": "⩈",
	"curlyvee;": "⋎",
	"cwconint;": "∲",
	"DDotrahd;": "⤑",
	"doteqdot;": "≑",
	"DotEqual;": "≐",
	"dotminus;": "∸",
	"drbkarow;": "⤐",
	"dzigrarr;": "⟿",
	"elinters;": "⏧",
	"emptyset;": "∅",
	"eqvparsl;": "⧥",
	"fpartint;": "⨍",
	"geqslant;": "⩾",
	"gesdotol;": "⪄",
	"gnapprox;": "⪊",
	"hksearow;": "⤥",
	"hkswarow;": "⤦",
	"imagline;": "ℐ",
	"imagpart;": "ℑ",
	"infintie;": "⧝",
	"integers;": "ℤ",
	"Integral;": "∫",
	"intercal;": "⊺",
	"intlarhk;": "⨗",
	"laemptyv;": "⦴",
	"ldrushar;": "⥋",
	"leqslant;": "⩽",
	"lesdotor;": "⪃",
	"LessLess;": "⪡",
	"llcorner;": "⌞",
	"lnapprox;": "⪉",
	"lrcorner;": "⌟",
	"lurdshar;": "⥊",
	"mapstoup;": "↥",
	"multimap;": "⊸",
	"naturals;": "ℕ",
	"ncongdot;": "⩭̸",
	"NotEqual;": "≠",
	"notindot;": "⋵̸",
	"NotTilde;": "≁",
	"otimesas;": "⨶",
	"parallel;": "∥",
	"PartialD;": "∂",
	"plusacir;": "⨣",
	"pointint;": "⨕",
	"Precedes;": "≺",
	"precneqq;": "⪵",
	"precnsim;": "⋨",
	"profalar;": "⌮",
	"profline;": "⌒",
	"profsurf;": "⌓",
	"raemptyv;": "⦳",
	"realpart;": "ℜ",
	"RightTee;": "⊢",
	"rppolint;": "⨒",
	"rtriltri;": "⧎",
	"scpolint;": "⨓",
	"setminus;": "∖",
	"shortmid;": "∣",
	"smeparsl;": "⧤",
	"sqsubset;": "⊏",
	"sqsupset;": "⊐",
	"subseteq;": "⊆",
	"Succeeds;": "≻",
	"succneqq;": "⪶",
	"succnsim;": "⋩",
	"SuchThat;": "∋",
	"Superset;": "⊃",
	"supseteq;": "⊇",
	"thetasym;": "ϑ",
	"thicksim;": "∼",
	"timesbar;": "⨱",
	"triangle;": "▵",
	"triminus;": "⨺",
	"trpezium;": "⏢",
	"Uarrocir;": "⥉",
	"ulcorner;": "⌜",
	"UnderBar;": "_",
	"urcorner;": "⌝",
	"varkappa;": "ϰ",
	"varsigma;": "ς",
	"vartheta;": "ϑ",
	"backprime;": "‵",
	"backsimeq;": "⋍",
	"Backslash;": "∖",
	"bigotimes;": "⨂",
	"CenterDot;": "·",
	"centerdot;": "·",
	"checkmark;": "✓",
	"CircleDot;": "⊙",
	"complexes;": "ℂ",
	"Congruent;": "≡",
	"Coproduct;": "∐",
	"dotsquare;": "⊡",
	"DoubleDot;": "¨",
	"DownArrow;": "↓",
	"Downarrow;": "⇓",
	"downarrow;": "↓",
	"DownBreve;": "̑",
	"gtrapprox;": "⪆",
	"gtreqless;": "⋛",
	"gvertneqq;": "≩︀",
	"heartsuit;": "♥",
	"HumpEqual;": "≏",
	"LeftArrow;": "←",
	"Leftarrow;": "⇐",
	"leftarrow;": "←",
	"LeftFloor;": "⌊",
	"lesseqgtr;": "⋚",
	"LessTilde;": "≲",
	"lvertneqq;": "≨︀",
	"Mellintrf;": "ℳ",
	"MinusPlus;": "∓",
	"ngeqslant;": "⩾̸",
	"nleqslant;": "⩽̸",
	"NotCupCap;": "≭",
	"NotExists;": "∄",
	"NotSubset;": "⊂⃒",
	"nparallel;": "∦",
	"nshortmid;": "∤",
	"nsubseteq;": "⊈",
	"nsupseteq;": "⊉",
	"OverBrace;": "⏞",
	"pitchfork;": "⋔",
	"PlusMinus;": "±",
	"rationals;": "ℚ",
	"spadesuit;": "♠",
	"subseteqq;": "⫅",
	"subsetneq;": "⊊",
	"supseteqq;": "⫆",
	"supsetneq;": "⊋",
	"Therefore;": "∴",
	"therefore;": "∴",
	"ThinSpace;": " ",
	"triangleq;": "≜",
	"TripleDot;": "⃛",
	"UnionPlus;": "⊎",
	"varpropto;": "∝",
	"Bernoullis;": "ℬ",
	"circledast;": "⊛",
	"CirclePlus;": "⊕",
	"complement;": "∁",
	"curlywedge;": "⋏",
	"eqslantgtr;": "⪖",
	"EqualTilde;": "≂",
	"Fouriertrf;": "ℱ",
	"gtreqqless;": "⪌",
	"ImaginaryI;": "ⅈ",
	"Laplacetrf;": "ℒ",
	"LeftVector;": "↼",
	"lessapprox;": "⪅",
	"lesseqqgtr;": "⪋",
	"Lleftarrow;": "⇚",
	"lmoustache;": "⎰",
	"longmapsto;": "⟼",
	"mapstodown;": "↧",
	"mapstoleft;": "↤",
	"nLeftarrow;": "⇍",
	"nleftarrow;": "↚",
	"NotElement;": "∉",
	"NotGreater;": "≯",
	"nsubseteqq;": "⫅̸",
	"nsupseteqq;": "⫆̸",
	"precapprox;": "⪷",
	"Proportion;": "∷",
	"RightArrow;": "→",
	"Rightarrow;": "⇒",
	"rightarrow;": "→",
	"RightFloor;": "⌋",
	"rmoustache;": "⎱",
	"sqsubseteq;": "⊑",
	"sqsupseteq;": "⊒",
	"subsetneqq;": "⫋",
	"succapprox;": "⪸",
	"supsetneqq;": "⫌",
	"ThickSpace;": "  ",
	"TildeEqual;": "≃",
	"TildeTilde;": "≈",
	"UnderBrace;": "⏟",
	"UpArrowBar;": "⤒",
	"UpTeeArrow;": "↥",
	"upuparrows;": "⇈",
	"varepsilon;": "ϵ",
	"varnothing;": "∅",
	"backepsilon;": "϶",
	"blacksquare;": "▪",
	"circledcirc;": "⊚",
	"circleddash;": "⊝",
	"CircleMinus;": "⊖",
	"CircleTimes;": "⊗",
	"curlyeqprec;": "⋞",
	"curlyeqsucc;": "⋟",
	"diamondsuit;": "♦",
	"eqslantless;": "⪕",
	"Equilibrium;": "⇌",
	"expectation;": "ℰ",
	"GreaterLess;": "≷",
	"LeftCeiling;": "⌈",
	"LessGreater;": "≶",
	"MediumSpace;": " ",
	"NotLessLess;": "≪̸",
	"NotPrecedes;": "⊀",
	"NotSucceeds;": "⊁",
	"NotSuperset;": "⊃⃒",
	"nRightarrow;": "⇏",
	"nrightarrow;": "↛",
	"OverBracket;": "⎴",
	"preccurlyeq;": "≼",
	"precnapprox;": "⪹",
	"quaternions;": "ℍ",
	"RightVector;": "⇀",
	"Rrightarrow;": "⇛",
	"RuleDelayed;": "⧴",
	"SmallCircle;": "∘",
	"SquareUnion;": "⊔",
	"straightphi;": "ϕ",
	"SubsetEqual;": "⊆",
	"succcurlyeq;": "≽",
	"succnapprox;": "⪺",
	"thickapprox;": "≈",
	"UpDownArrow;": "↕",
	"Updownarrow;": "⇕",
	"updownarrow;": "↕",
	"VerticalBar;": "∣",
	"blacklozenge;": "⧫",
	"DownArrowBar;": "⤓",
	"DownTeeArrow;": "↧",
	"ExponentialE;": "ⅇ",
	"exponentiale;": "ⅇ",
	"GreaterEqual;": "≥",
	"GreaterTilde;": "≳",
	"HilbertSpace;": "ℋ",
	"HumpDownHump;": "≎",
	"Intersection;": "⋂",
	"LeftArrowBar;": "⇤",
	"LeftTeeArrow;": "↤",
	"LeftTriangle;": "⊲",
	"LeftUpVector;": "↿",
	"NotCongruent;": "≢",
	"NotHumpEqual;": "≏̸",
	"NotLessEqual;": "≰",
	"NotLessTilde;": "≴",
	"Proportional;": "∝",
	"RightCeiling;": "⌉",
	"risingdotseq;": "≓",
	"RoundImplies;": "⥰",
	"ShortUpArrow;": "↑",
	"SquareSubset;": "⊏",
	"triangledown;": "▿",
	"triangleleft;": "◃",
	"UnderBracket;": "⎵",
	"varsubsetneq;": "⊊︀",
	"varsupsetneq;": "⊋︀",
	"VerticalLine;": "|",
	"ApplyFunction;": "⁡",
	"bigtriangleup;": "△",
	"blacktriangle;": "▴",
	"DifferentialD;": "ⅆ",
	"divideontimes;": "⋇",
	"DoubleLeftTee;": "⫤",
	"DoubleUpArrow;": "⇑",
	"fallingdotseq;": "≒",
	"hookleftarrow;": "↩",
	"leftarrowtail;": "↢",
	"leftharpoonup;": "↼",
	"LeftTeeVector;": "⥚",
	"LeftVectorBar;": "⥒",
	"LessFullEqual;": "≦",
	"LongLeftArrow;": "⟵",
	"Longleftarrow;": "⟸",
	"longleftarrow;": "⟵",
	"looparrowleft;": "↫",
	"measuredangle;": "∡",
	"NotEqualTilde;": "≂̸",
	"NotTildeEqual;": "≄",
	"NotTildeTilde;": "≉",
	"ntriangleleft;": "⋪",
	"Poincareplane;": "ℌ",
	"PrecedesEqual;": "⪯",
	"PrecedesTilde;": "≾",
	"RightArrowBar;": "⇥",
	"RightTeeArrow;": "↦",
	"RightTriangle;": "⊳",
	"RightUpVector;": "↾",
	"shortparallel;": "∥",
	"smallsetminus;": "∖",
	"SucceedsEqual;": "⪰",
	"SucceedsTilde;": "≿",
	"SupersetEqual;": "⊇",
	"triangleright;": "▹",
	"UpEquilibrium;": "⥮",
	"upharpoonleft;": "↿",
	"varsubsetneqq;": "⫋︀",
	"varsupsetneqq;": "⫌︀",
	"VerticalTilde;": "≀",
	"VeryThinSpace;": " ",
	"curvearrowleft;": "↶",
	"DiacriticalDot;": "˙",
	"doublebarwedge;": "⌆",
	"DoubleRightTee;": "⊨",
	"downdownarrows;": "⇊",
	"DownLeftVector;": "↽",
	"GreaterGreater;": "⪢",
	"hookrightarrow;": "↪",
	"HorizontalLine;": "─",
	"InvisibleComma;": "⁣",
	"InvisibleTimes;": "⁢",
	"LeftDownVector;": "⇃",
	"leftleftarrows;": "⇇",
	"LeftRightArrow;": "↔",
	"Leftrightarrow;": "⇔",
	"leftrightarrow;": "↔",
	"leftthreetimes;": "⋋",
	"LessSlantEqual;": "⩽",
	"LongRightArrow;": "⟶",
	"Longrightarrow;": "⟹",
	"longrightarrow;": "⟶",
	"looparrowright;": "↬",
	"LowerLeftArrow;": "↙",
	"NestedLessLess;": "≪",
	"NotGreaterLess;": "≹",
	"NotLessGreater;": "≸",
	"NotSubsetEqual;": "⊈",
	"NotVerticalBar;": "∤",
	"nshortparallel;": "∦",
	"ntriangleright;": "⋫",
	"OpenCurlyQuote;": "‘",
	"ReverseElement;": "∋",
	"rightarrowtail;": "↣",
	"rightharpoonup;": "⇀",
	"RightTeeVector;": "⥛",
	"RightVectorBar;": "⥓",
	"ShortDownArrow;": "↓",
	"ShortLeftArrow;": "←",
	"SquareSuperset;": "⊐",
	"TildeFullEqual;": "≅",
	"trianglelefteq;": "⊴",
	"upharpoonright;": "↾",
	"UpperLeftArrow;": "↖",
	"ZeroWidthSpace;": "​",
	"bigtriangledown;": "▽",
	"circlearrowleft;": "↺",
	"CloseCurlyQuote;": "’",
	"ContourIntegral;": "∮",
	"curvearrowright;": "↷",
	"DoubleDownArrow;": "⇓",
	"DoubleLeftArrow;": "⇐",
	"downharpoonleft;": "⇃",
	"DownRightVector;": "⇁",
	"leftharpoondown;": "↽",
	"leftrightarrows;": "⇆",
	"LeftRightVector;": "⥎",
	"LeftTriangleBar;": "⧏",
	"LeftUpTeeVector;": "⥠",
	"LeftUpVectorBar;": "⥘",
	"LowerRightArrow;": "↘",
	"nLeftrightarrow;": "⇎",
	"nleftrightarrow;": "↮",
	"NotGreaterEqual;": "≱",
	"NotGreaterTilde;": "≵",
	"NotHumpDownHump;": "≎̸",
	"NotLeftTriangle;": "⋪",
	"NotSquareSubset;": "⊏̸",
	"ntrianglelefteq;": "⋬",
	"OverParenthesis;": "⏜",
	"RightDownVector;": "⇂",
	"rightleftarrows;": "⇄",
	"rightsquigarrow;": "↝",
	"rightthreetimes;": "⋌",
	"ShortRightArrow;": "→",
	"straightepsilon;": "ϵ",
	"trianglerighteq;": "⊵",
	"UpperRightArrow;": "↗",
	"vartriangleleft;": "⊲",
	"circlearrowright;": "↻",
	"DiacriticalAcute;": "´",
	"DiacriticalGrave;": "`",
	"DiacriticalTilde;": "˜",
	"DoubleRightArrow;": "⇒",
	"DownArrowUpArrow;": "⇵",
	"downharpoonright;": "⇂",
	"EmptySmallSquare;": "◻",
	"GreaterEqualLess;": "⋛",
	"GreaterFullEqual;": "≧",
	"LeftAngleBracket;": "⟨",
	"LeftUpDownVector;": "⥑",
	"LessEqualGreater;": "⋚",
	"NonBreakingSpace;": " ",
	"NotPrecedesEqual;": "⪯̸",
	"NotRightTriangle;": "⋫",
	"NotSucceedsEqual;": "⪰̸",
	"NotSucceedsTilde;": "≿̸",
	"NotSupersetEqual;": "⊉",
	"ntrianglerighteq;": "⋭",
	"rightharpoondown;": "⇁",
	"rightrightarrows;": "⇉",
	"RightTriangleBar;": "⧐",
	"RightUpTeeVector;": "⥜",
	"RightUpVectorBar;": "⥔",
	"twoheadleftarrow;": "↞",
	"UnderParenthesis;": "⏝",
	"UpArrowDownArrow;": "⇅",
	"vartriangleright;": "⊳",
	"blacktriangledown;": "▾",
	"blacktriangleleft;": "◂",
	"DoubleUpDownArrow;": "⇕",
	"DoubleVerticalBar;": "∥",
	"DownLeftTeeVector;": "⥞",
	"DownLeftVectorBar;": "⥖",
	"FilledSmallSquare;": "◼",
	"GreaterSlantEqual;": "⩾",
	"LeftDoubleBracket;": "⟦",
	"LeftDownTeeVector;": "⥡",
	"LeftDownVectorBar;": "⥙",
	"leftrightharpoons;": "⇋",
	"LeftTriangleEqual;": "⊴",
	"NegativeThinSpace;": "​",
	"NotGreaterGreater;": "≫̸",
	"NotLessSlantEqual;": "⩽̸",
	"NotNestedLessLess;": "⪡̸",
	"NotReverseElement;": "∌",
	"NotSquareSuperset;": "⊐̸",
	"NotTildeFullEqual;": "≇",
	"RightAngleBracket;": "⟩",
	"rightleftharpoons;": "⇌",
	"RightUpDownVector;": "⥏",
	"SquareSubsetEqual;": "⊑",
	"twoheadrightarrow;": "↠",
	"VerticalSeparator;": "❘",
	"blacktriangleright;": "▸",
	"DownRightTeeVector;": "⥟",
	"DownRightVectorBar;": "⥗",
	"LongLeftRightArrow;": "⟷",
	"Longleftrightarrow;": "⟺",
	"longleftrightarrow;": "⟷",
	"NegativeThickSpace;": "​",
	"NotLeftTriangleBar;": "⧏̸",
	"PrecedesSlantEqual;": "≼",
	"ReverseEquilibrium;": "⇋",
	"RightDoubleBracket;": "⟧",
	"RightDownTeeVector;": "⥝",
	"RightDownVectorBar;": "⥕",
	"RightTriangleEqual;": "⊵",
	"SquareIntersection;": "⊓",
	"SucceedsSlantEqual;": "≽",
	"DoubleLongLeftArrow;": "⟸",
	"DownLeftRightVector;": "⥐",
	"LeftArrowRightArrow;": "⇆",
	"leftrightsquigarrow;": "↭",
	"NegativeMediumSpace;": "​",
	"NotGreaterFullEqual;": "≧̸",
	"NotRightTriangleBar;": "⧐̸",
	"RightArrowLeftArrow;": "⇄",
	"SquareSupersetEqual;": "⊒",
	"CapitalDifferentialD;": "ⅅ",
	"DoubleLeftRightArrow;": "⇔",
	"DoubleLongRightArrow;": "⟹",
	"EmptyVerySmallSquare;": "▫",
	"NestedGreaterGreater;": "≫",
	"NotDoubleVerticalBar;": "∦",
	"NotGreaterSlantEqual;": "⩾̸",
	"NotLeftTriangleEqual;": "⋬",
	"NotSquareSubsetEqual;": "⋢",
	"OpenCurlyDoubleQuote;": "“",
	"ReverseUpEquilibrium;": "⥯",
	"CloseCurlyDoubleQuote;": "”",
	"DoubleContourIntegral;": "∯",
	"FilledVerySmallSquare;": "▪",
	"NegativeVeryThinSpace;": "​",
	"NotPrecedesSlantEqual;": "⋠",
	"NotRightTriangleEqual;": "⋭",
	"NotSucceedsSlantEqual;": "⋡",
	"DiacriticalDoubleAcute;": "˝",
	"NotSquareSupersetEqual;": "⋣",
	"NotNestedGreaterGreater;": "⪢̸",
	"ClockwiseContourIntegral;": "∲",
	"DoubleLongLeftRightArrow;": "⟺",
	"CounterClockwiseContourIntegral;": "∳"
};

let maxCRNameLength;
const decodeHtml = (rawText, asAttr) => {
  let offset = 0;
  const end = rawText.length;
  let decodedText = "";
  function advance(length) {
    offset += length;
    rawText = rawText.slice(length);
  }
  while (offset < end) {
    const head = /&(?:#x?)?/i.exec(rawText);
    if (!head || offset + head.index >= end) {
      const remaining = end - offset;
      decodedText += rawText.slice(0, remaining);
      advance(remaining);
      break;
    }
    decodedText += rawText.slice(0, head.index);
    advance(head.index);
    if (head[0] === "&") {
      let name = "";
      let value = void 0;
      if (/[0-9a-z]/i.test(rawText[1])) {
        if (!maxCRNameLength) {
          maxCRNameLength = Object.keys(namedCharacterReferences).reduce(
            (max, name2) => Math.max(max, name2.length),
            0
          );
        }
        for (let length = maxCRNameLength; !value && length > 0; --length) {
          name = rawText.slice(1, 1 + length);
          value = namedCharacterReferences[name];
        }
        if (value) {
          const semi = name.endsWith(";");
          if (asAttr && !semi && /[=a-z0-9]/i.test(rawText[name.length + 1] || "")) {
            decodedText += "&" + name;
            advance(1 + name.length);
          } else {
            decodedText += value;
            advance(1 + name.length);
          }
        } else {
          decodedText += "&" + name;
          advance(1 + name.length);
        }
      } else {
        decodedText += "&";
        advance(1);
      }
    } else {
      const hex = head[0] === "&#x";
      const pattern = hex ? /^&#x([0-9a-f]+);?/i : /^&#([0-9]+);?/;
      const body = pattern.exec(rawText);
      if (!body) {
        decodedText += head[0];
        advance(head[0].length);
      } else {
        let cp = Number.parseInt(body[1], hex ? 16 : 10);
        if (cp === 0) {
          cp = 65533;
        } else if (cp > 1114111) {
          cp = 65533;
        } else if (cp >= 55296 && cp <= 57343) {
          cp = 65533;
        } else if (cp >= 64976 && cp <= 65007 || (cp & 65534) === 65534) ; else if (cp >= 1 && cp <= 8 || cp === 11 || cp >= 13 && cp <= 31 || cp >= 127 && cp <= 159) {
          cp = CCR_REPLACEMENTS[cp] || cp;
        }
        decodedText += String.fromCodePoint(cp);
        advance(body[0].length);
      }
    }
  }
  return decodedText;
};
const CCR_REPLACEMENTS = {
  128: 8364,
  130: 8218,
  131: 402,
  132: 8222,
  133: 8230,
  134: 8224,
  135: 8225,
  136: 710,
  137: 8240,
  138: 352,
  139: 8249,
  140: 338,
  142: 381,
  145: 8216,
  146: 8217,
  147: 8220,
  148: 8221,
  149: 8226,
  150: 8211,
  151: 8212,
  152: 732,
  153: 8482,
  154: 353,
  155: 8250,
  156: 339,
  158: 382,
  159: 376
};

const isRawTextContainer = /* @__PURE__ */ shared.makeMap(
  "style,iframe,script,noscript",
  true
);
const parserOptions = {
  isVoidTag: shared.isVoidTag,
  isNativeTag: (tag) => shared.isHTMLTag(tag) || shared.isSVGTag(tag),
  isPreTag: (tag) => tag === "pre",
  decodeEntities: decodeHtml,
  isBuiltInComponent: (tag) => {
    if (compilerCore.isBuiltInType(tag, `Transition`)) {
      return TRANSITION;
    } else if (compilerCore.isBuiltInType(tag, `TransitionGroup`)) {
      return TRANSITION_GROUP;
    }
  },
  // https://html.spec.whatwg.org/multipage/parsing.html#tree-construction-dispatcher
  getNamespace(tag, parent) {
    let ns = parent ? parent.ns : 0;
    if (parent && ns === 2) {
      if (parent.tag === "annotation-xml") {
        if (tag === "svg") {
          return 1;
        }
        if (parent.props.some(
          (a) => a.type === 6 && a.name === "encoding" && a.value != null && (a.value.content === "text/html" || a.value.content === "application/xhtml+xml")
        )) {
          ns = 0;
        }
      } else if (/^m(?:[ions]|text)$/.test(parent.tag) && tag !== "mglyph" && tag !== "malignmark") {
        ns = 0;
      }
    } else if (parent && ns === 1) {
      if (parent.tag === "foreignObject" || parent.tag === "desc" || parent.tag === "title") {
        ns = 0;
      }
    }
    if (ns === 0) {
      if (tag === "svg") {
        return 1;
      }
      if (tag === "math") {
        return 2;
      }
    }
    return ns;
  },
  // https://html.spec.whatwg.org/multipage/parsing.html#parsing-html-fragments
  getTextMode({ tag, ns }) {
    if (ns === 0) {
      if (tag === "textarea" || tag === "title") {
        return 1;
      }
      if (isRawTextContainer(tag)) {
        return 2;
      }
    }
    return 0;
  }
};

const transformStyle = (node) => {
  if (node.type === 1) {
    node.props.forEach((p, i) => {
      if (p.type === 6 && p.name === "style" && p.value) {
        node.props[i] = {
          type: 7,
          name: `bind`,
          arg: compilerCore.createSimpleExpression(`style`, true, p.loc),
          exp: parseInlineCSS(p.value.content, p.loc),
          modifiers: [],
          loc: p.loc
        };
      }
    });
  }
};
const parseInlineCSS = (cssText, loc) => {
  const normalized = shared.parseStringStyle(cssText);
  return compilerCore.createSimpleExpression(
    JSON.stringify(normalized),
    false,
    loc,
    3
  );
};

function createDOMCompilerError(code, loc) {
  return compilerCore.createCompilerError(
    code,
    loc,
    DOMErrorMessages 
  );
}
const DOMErrorMessages = {
  [53]: `v-html is missing expression.`,
  [54]: `v-html will override element children.`,
  [55]: `v-text is missing expression.`,
  [56]: `v-text will override element children.`,
  [57]: `v-model can only be used on <input>, <textarea> and <select> elements.`,
  [58]: `v-model argument is not supported on plain elements.`,
  [59]: `v-model cannot be used on file inputs since they are read-only. Use a v-on:change listener instead.`,
  [60]: `Unnecessary value binding used alongside v-model. It will interfere with v-model's behavior.`,
  [61]: `v-show is missing expression.`,
  [62]: `<Transition> expects exactly one child element or component.`,
  [63]: `Tags with side effect (<script> and <style>) are ignored in client component templates.`
};

const transformVHtml = (dir, node, context) => {
  const { exp, loc } = dir;
  if (!exp) {
    context.onError(
      createDOMCompilerError(53, loc)
    );
  }
  if (node.children.length) {
    context.onError(
      createDOMCompilerError(54, loc)
    );
    node.children.length = 0;
  }
  return {
    props: [
      compilerCore.createObjectProperty(
        compilerCore.createSimpleExpression(`innerHTML`, true, loc),
        exp || compilerCore.createSimpleExpression("", true)
      )
    ]
  };
};

const transformVText = (dir, node, context) => {
  const { exp, loc } = dir;
  if (!exp) {
    context.onError(
      createDOMCompilerError(55, loc)
    );
  }
  if (node.children.length) {
    context.onError(
      createDOMCompilerError(56, loc)
    );
    node.children.length = 0;
  }
  return {
    props: [
      compilerCore.createObjectProperty(
        compilerCore.createSimpleExpression(`textContent`, true),
        exp ? compilerCore.getConstantType(exp, context) > 0 ? exp : compilerCore.createCallExpression(
          context.helperString(compilerCore.TO_DISPLAY_STRING),
          [exp],
          loc
        ) : compilerCore.createSimpleExpression("", true)
      )
    ]
  };
};

const transformModel = (dir, node, context) => {
  const baseResult = compilerCore.transformModel(dir, node, context);
  if (!baseResult.props.length || node.tagType === 1) {
    return baseResult;
  }
  if (dir.arg) {
    context.onError(
      createDOMCompilerError(
        58,
        dir.arg.loc
      )
    );
  }
  function checkDuplicatedValue() {
    const value = compilerCore.findProp(node, "value");
    if (value) {
      context.onError(
        createDOMCompilerError(
          60,
          value.loc
        )
      );
    }
  }
  const { tag } = node;
  const isCustomElement = context.isCustomElement(tag);
  if (tag === "input" || tag === "textarea" || tag === "select" || isCustomElement) {
    let directiveToUse = V_MODEL_TEXT;
    let isInvalidType = false;
    if (tag === "input" || isCustomElement) {
      const type = compilerCore.findProp(node, `type`);
      if (type) {
        if (type.type === 7) {
          directiveToUse = V_MODEL_DYNAMIC;
        } else if (type.value) {
          switch (type.value.content) {
            case "radio":
              directiveToUse = V_MODEL_RADIO;
              break;
            case "checkbox":
              directiveToUse = V_MODEL_CHECKBOX;
              break;
            case "file":
              isInvalidType = true;
              context.onError(
                createDOMCompilerError(
                  59,
                  dir.loc
                )
              );
              break;
            default:
              checkDuplicatedValue();
              break;
          }
        }
      } else if (compilerCore.hasDynamicKeyVBind(node)) {
        directiveToUse = V_MODEL_DYNAMIC;
      } else {
        checkDuplicatedValue();
      }
    } else if (tag === "select") {
      directiveToUse = V_MODEL_SELECT;
    } else {
      checkDuplicatedValue();
    }
    if (!isInvalidType) {
      baseResult.needRuntime = context.helper(directiveToUse);
    }
  } else {
    context.onError(
      createDOMCompilerError(
        57,
        dir.loc
      )
    );
  }
  baseResult.props = baseResult.props.filter(
    (p) => !(p.key.type === 4 && p.key.content === "modelValue")
  );
  return baseResult;
};

const isEventOptionModifier = /* @__PURE__ */ shared.makeMap(`passive,once,capture`);
const isNonKeyModifier = /* @__PURE__ */ shared.makeMap(
  // event propagation management
  `stop,prevent,self,ctrl,shift,alt,meta,exact,middle`
);
const maybeKeyModifier = /* @__PURE__ */ shared.makeMap("left,right");
const isKeyboardEvent = /* @__PURE__ */ shared.makeMap(
  `onkeyup,onkeydown,onkeypress`,
  true
);
const resolveModifiers = (key, modifiers, context, loc) => {
  const keyModifiers = [];
  const nonKeyModifiers = [];
  const eventOptionModifiers = [];
  for (let i = 0; i < modifiers.length; i++) {
    const modifier = modifiers[i];
    if (modifier === "native" && compilerCore.checkCompatEnabled(
      "COMPILER_V_ON_NATIVE",
      context,
      loc
    )) {
      eventOptionModifiers.push(modifier);
    } else if (isEventOptionModifier(modifier)) {
      eventOptionModifiers.push(modifier);
    } else {
      if (maybeKeyModifier(modifier)) {
        if (compilerCore.isStaticExp(key)) {
          if (isKeyboardEvent(key.content)) {
            keyModifiers.push(modifier);
          } else {
            nonKeyModifiers.push(modifier);
          }
        } else {
          keyModifiers.push(modifier);
          nonKeyModifiers.push(modifier);
        }
      } else {
        if (isNonKeyModifier(modifier)) {
          nonKeyModifiers.push(modifier);
        } else {
          keyModifiers.push(modifier);
        }
      }
    }
  }
  return {
    keyModifiers,
    nonKeyModifiers,
    eventOptionModifiers
  };
};
const transformClick = (key, event) => {
  const isStaticClick = compilerCore.isStaticExp(key) && key.content.toLowerCase() === "onclick";
  return isStaticClick ? compilerCore.createSimpleExpression(event, true) : key.type !== 4 ? compilerCore.createCompoundExpression([
    `(`,
    key,
    `) === "onClick" ? "${event}" : (`,
    key,
    `)`
  ]) : key;
};
const transformOn = (dir, node, context) => {
  return compilerCore.transformOn(dir, node, context, (baseResult) => {
    const { modifiers } = dir;
    if (!modifiers.length)
      return baseResult;
    let { key, value: handlerExp } = baseResult.props[0];
    const { keyModifiers, nonKeyModifiers, eventOptionModifiers } = resolveModifiers(key, modifiers, context, dir.loc);
    if (nonKeyModifiers.includes("right")) {
      key = transformClick(key, `onContextmenu`);
    }
    if (nonKeyModifiers.includes("middle")) {
      key = transformClick(key, `onMouseup`);
    }
    if (nonKeyModifiers.length) {
      handlerExp = compilerCore.createCallExpression(context.helper(V_ON_WITH_MODIFIERS), [
        handlerExp,
        JSON.stringify(nonKeyModifiers)
      ]);
    }
    if (keyModifiers.length && // if event name is dynamic, always wrap with keys guard
    (!compilerCore.isStaticExp(key) || isKeyboardEvent(key.content))) {
      handlerExp = compilerCore.createCallExpression(context.helper(V_ON_WITH_KEYS), [
        handlerExp,
        JSON.stringify(keyModifiers)
      ]);
    }
    if (eventOptionModifiers.length) {
      const modifierPostfix = eventOptionModifiers.map(shared.capitalize).join("");
      key = compilerCore.isStaticExp(key) ? compilerCore.createSimpleExpression(`${key.content}${modifierPostfix}`, true) : compilerCore.createCompoundExpression([`(`, key, `) + "${modifierPostfix}"`]);
    }
    return {
      props: [compilerCore.createObjectProperty(key, handlerExp)]
    };
  });
};

const transformShow = (dir, node, context) => {
  const { exp, loc } = dir;
  if (!exp) {
    context.onError(
      createDOMCompilerError(61, loc)
    );
  }
  return {
    props: [],
    needRuntime: context.helper(V_SHOW)
  };
};

const transformTransition = (node, context) => {
  if (node.type === 1 && node.tagType === 1) {
    const component = context.isBuiltInComponent(node.tag);
    if (component === TRANSITION) {
      return () => {
        if (!node.children.length) {
          return;
        }
        if (hasMultipleChildren(node)) {
          context.onError(
            createDOMCompilerError(
              62,
              {
                start: node.children[0].loc.start,
                end: node.children[node.children.length - 1].loc.end,
                source: ""
              }
            )
          );
        }
        const child = node.children[0];
        if (child.type === 1) {
          for (const p of child.props) {
            if (p.type === 7 && p.name === "show") {
              node.props.push({
                type: 6,
                name: "persisted",
                value: void 0,
                loc: node.loc
              });
            }
          }
        }
      };
    }
  }
};
function hasMultipleChildren(node) {
  const children = node.children = node.children.filter(
    (c) => c.type !== 3 && !(c.type === 2 && !c.content.trim())
  );
  const child = children[0];
  return children.length !== 1 || child.type === 11 || child.type === 9 && child.branches.some(hasMultipleChildren);
}

const expReplaceRE = /__VUE_EXP_START__(.*?)__VUE_EXP_END__/g;
const stringifyStatic = (children, context, parent) => {
  if (context.scopes.vSlot > 0) {
    return;
  }
  let nc = 0;
  let ec = 0;
  const currentChunk = [];
  const stringifyCurrentChunk = (currentIndex) => {
    if (nc >= 20 || ec >= 5) {
      const staticCall = compilerCore.createCallExpression(context.helper(compilerCore.CREATE_STATIC), [
        JSON.stringify(
          currentChunk.map((node) => stringifyNode(node, context)).join("")
        ).replace(expReplaceRE, `" + $1 + "`),
        // the 2nd argument indicates the number of DOM nodes this static vnode
        // will insert / hydrate
        String(currentChunk.length)
      ]);
      replaceHoist(currentChunk[0], staticCall, context);
      if (currentChunk.length > 1) {
        for (let i2 = 1; i2 < currentChunk.length; i2++) {
          replaceHoist(currentChunk[i2], null, context);
        }
        const deleteCount = currentChunk.length - 1;
        children.splice(currentIndex - currentChunk.length + 1, deleteCount);
        return deleteCount;
      }
    }
    return 0;
  };
  let i = 0;
  for (; i < children.length; i++) {
    const child = children[i];
    const hoisted = getHoistedNode(child);
    if (hoisted) {
      const node = child;
      const result = analyzeNode(node);
      if (result) {
        nc += result[0];
        ec += result[1];
        currentChunk.push(node);
        continue;
      }
    }
    i -= stringifyCurrentChunk(i);
    nc = 0;
    ec = 0;
    currentChunk.length = 0;
  }
  stringifyCurrentChunk(i);
};
const getHoistedNode = (node) => (node.type === 1 && node.tagType === 0 || node.type == 12) && node.codegenNode && node.codegenNode.type === 4 && node.codegenNode.hoisted;
const dataAriaRE = /^(data|aria)-/;
const isStringifiableAttr = (name, ns) => {
  return (ns === 0 ? shared.isKnownHtmlAttr(name) : ns === 1 ? shared.isKnownSvgAttr(name) : false) || dataAriaRE.test(name);
};
const replaceHoist = (node, replacement, context) => {
  const hoistToReplace = node.codegenNode.hoisted;
  context.hoists[context.hoists.indexOf(hoistToReplace)] = replacement;
};
const isNonStringifiable = /* @__PURE__ */ shared.makeMap(
  `caption,thead,tr,th,tbody,td,tfoot,colgroup,col`
);
function analyzeNode(node) {
  if (node.type === 1 && isNonStringifiable(node.tag)) {
    return false;
  }
  if (node.type === 12) {
    return [1, 0];
  }
  let nc = 1;
  let ec = node.props.length > 0 ? 1 : 0;
  let bailed = false;
  const bail = () => {
    bailed = true;
    return false;
  };
  function walk(node2) {
    for (let i = 0; i < node2.props.length; i++) {
      const p = node2.props[i];
      if (p.type === 6 && !isStringifiableAttr(p.name, node2.ns)) {
        return bail();
      }
      if (p.type === 7 && p.name === "bind") {
        if (p.arg && (p.arg.type === 8 || p.arg.isStatic && !isStringifiableAttr(p.arg.content, node2.ns))) {
          return bail();
        }
        if (p.exp && (p.exp.type === 8 || p.exp.constType < 3)) {
          return bail();
        }
      }
    }
    for (let i = 0; i < node2.children.length; i++) {
      nc++;
      const child = node2.children[i];
      if (child.type === 1) {
        if (child.props.length > 0) {
          ec++;
        }
        walk(child);
        if (bailed) {
          return false;
        }
      }
    }
    return true;
  }
  return walk(node) ? [nc, ec] : false;
}
function stringifyNode(node, context) {
  if (shared.isString(node)) {
    return node;
  }
  if (shared.isSymbol(node)) {
    return ``;
  }
  switch (node.type) {
    case 1:
      return stringifyElement(node, context);
    case 2:
      return shared.escapeHtml(node.content);
    case 3:
      return `<!--${shared.escapeHtml(node.content)}-->`;
    case 5:
      return shared.escapeHtml(shared.toDisplayString(evaluateConstant(node.content)));
    case 8:
      return shared.escapeHtml(evaluateConstant(node));
    case 12:
      return stringifyNode(node.content, context);
    default:
      return "";
  }
}
function stringifyElement(node, context) {
  let res = `<${node.tag}`;
  let innerHTML = "";
  for (let i = 0; i < node.props.length; i++) {
    const p = node.props[i];
    if (p.type === 6) {
      res += ` ${p.name}`;
      if (p.value) {
        res += `="${shared.escapeHtml(p.value.content)}"`;
      }
    } else if (p.type === 7) {
      if (p.name === "bind") {
        const exp = p.exp;
        if (exp.content[0] === "_") {
          res += ` ${p.arg.content}="__VUE_EXP_START__${exp.content}__VUE_EXP_END__"`;
          continue;
        }
        if (shared.isBooleanAttr(p.arg.content) && exp.content === "false") {
          continue;
        }
        let evaluated = evaluateConstant(exp);
        if (evaluated != null) {
          const arg = p.arg && p.arg.content;
          if (arg === "class") {
            evaluated = shared.normalizeClass(evaluated);
          } else if (arg === "style") {
            evaluated = shared.stringifyStyle(shared.normalizeStyle(evaluated));
          }
          res += ` ${p.arg.content}="${shared.escapeHtml(
            evaluated
          )}"`;
        }
      } else if (p.name === "html") {
        innerHTML = evaluateConstant(p.exp);
      } else if (p.name === "text") {
        innerHTML = shared.escapeHtml(
          shared.toDisplayString(evaluateConstant(p.exp))
        );
      }
    }
  }
  if (context.scopeId) {
    res += ` ${context.scopeId}`;
  }
  res += `>`;
  if (innerHTML) {
    res += innerHTML;
  } else {
    for (let i = 0; i < node.children.length; i++) {
      res += stringifyNode(node.children[i], context);
    }
  }
  if (!shared.isVoidTag(node.tag)) {
    res += `</${node.tag}>`;
  }
  return res;
}
function evaluateConstant(exp) {
  if (exp.type === 4) {
    return new Function(`return (${exp.content})`)();
  } else {
    let res = ``;
    exp.children.forEach((c) => {
      if (shared.isString(c) || shared.isSymbol(c)) {
        return;
      }
      if (c.type === 2) {
        res += c.content;
      } else if (c.type === 5) {
        res += shared.toDisplayString(evaluateConstant(c.content));
      } else {
        res += evaluateConstant(c);
      }
    });
    return res;
  }
}

const ignoreSideEffectTags = (node, context) => {
  if (node.type === 1 && node.tagType === 0 && (node.tag === "script" || node.tag === "style")) {
    context.onError(
      createDOMCompilerError(
        63,
        node.loc
      )
    );
    context.removeNode();
  }
};

const DOMNodeTransforms = [
  transformStyle,
  ...[transformTransition] 
];
const DOMDirectiveTransforms = {
  cloak: compilerCore.noopDirectiveTransform,
  html: transformVHtml,
  text: transformVText,
  model: transformModel,
  // override compiler-core
  on: transformOn,
  // override compiler-core
  show: transformShow
};
function compile(template, options = {}) {
  return compilerCore.baseCompile(
    template,
    shared.extend({}, parserOptions, options, {
      nodeTransforms: [
        // ignore <script> and <tag>
        // this is not put inside DOMNodeTransforms because that list is used
        // by compiler-ssr to generate vnode fallback branches
        ignoreSideEffectTags,
        ...DOMNodeTransforms,
        ...options.nodeTransforms || []
      ],
      directiveTransforms: shared.extend(
        {},
        DOMDirectiveTransforms,
        options.directiveTransforms || {}
      ),
      transformHoist: stringifyStatic
    })
  );
}
function parse(template, options = {}) {
  return compilerCore.baseParse(template, shared.extend({}, parserOptions, options));
}

exports.DOMDirectiveTransforms = DOMDirectiveTransforms;
exports.DOMNodeTransforms = DOMNodeTransforms;
exports.TRANSITION = TRANSITION;
exports.TRANSITION_GROUP = TRANSITION_GROUP;
exports.V_MODEL_CHECKBOX = V_MODEL_CHECKBOX;
exports.V_MODEL_DYNAMIC = V_MODEL_DYNAMIC;
exports.V_MODEL_RADIO = V_MODEL_RADIO;
exports.V_MODEL_SELECT = V_MODEL_SELECT;
exports.V_MODEL_TEXT = V_MODEL_TEXT;
exports.V_ON_WITH_KEYS = V_ON_WITH_KEYS;
exports.V_ON_WITH_MODIFIERS = V_ON_WITH_MODIFIERS;
exports.V_SHOW = V_SHOW;
exports.compile = compile;
exports.createDOMCompilerError = createDOMCompilerError;
exports.parse = parse;
exports.parserOptions = parserOptions;
exports.transformStyle = transformStyle;
Object.keys(compilerCore).forEach(function (k) {
  if (k !== 'default' && !exports.hasOwnProperty(k)) exports[k] = compilerCore[k];
});
