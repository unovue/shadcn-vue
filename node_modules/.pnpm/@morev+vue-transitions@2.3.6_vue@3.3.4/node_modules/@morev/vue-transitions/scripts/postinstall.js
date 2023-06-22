const { switchVersion, loadModule, ERROR_PREFIX } = require('./utils.js');

const Vue = loadModule('vue');

if (!Vue || typeof Vue.version !== 'string') {
	console.warn(`${ERROR_PREFIX} Vue is not found. Please run "npm install vue" to install.`);
} else if (Vue.version.startsWith('2.')) {
	switchVersion(2);
} else if (Vue.version.startsWith('3.')) {
	switchVersion(3);
} else {
	console.warn(`${ERROR_PREFIX} Vue version v${Vue.version} is not suppported.`);
}
