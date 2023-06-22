const { switchVersion, ERROR_PREFIX } = require('./utils.js');

const version = process.argv[2];
const vueEntry = process.argv[3] || 'vue';

if (version === '2') {
	switchVersion(2, vueEntry);
	console.log(`${ERROR_PREFIX} Switched for Vue 2 (entry: "${vueEntry}")`);
} else if (version === '3') {
	switchVersion(3, vueEntry);
	console.log(`${ERROR_PREFIX} Switched for Vue 3 (entry: "${vueEntry}")`);
} else {
	console.warn(`${ERROR_PREFIX} expecting version "2" or "3" but got "${version}"`);
}
