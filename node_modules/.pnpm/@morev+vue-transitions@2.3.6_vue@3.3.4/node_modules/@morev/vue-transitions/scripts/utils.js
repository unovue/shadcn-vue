const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname);

const loadModule = (name) => {
	try {
		return require(name);
	} catch {
		return undefined;
	}
};

const copy = (name, version) => {
	const src = path.join(dir, '..', 'dist', `vue${version}`, name);
	const dest = path.join(dir, '..', 'dist', name);
	const content = fs.readFileSync(src, 'utf8');
	// unlink for pnpm, @see https://github.com/vueuse/vue-demi/issues/92
	try {
		fs.unlinkSync(dest);
	} catch {}
	fs.writeFileSync(dest, content, 'utf8');
};

const switchVersion = (version) => {
	copy('vue-transitions.cjs.js', version);
	copy('vue-transitions.es.js', version);
	copy('vue-transitions.umd.js', version);
	copy('index.css', version);
};

module.exports.loadModule = loadModule;
module.exports.switchVersion = switchVersion;
module.exports.ERROR_PREFIX = '[@morev/vue-transitions]';
