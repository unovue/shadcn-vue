const fs = require('fs');

const packageJsonContents = fs.readFileSync('package.json', { encoding: 'utf8' });

fs.writeFileSync(
	'package.json',
	packageJsonContents
		.replace('"private": true', '"private": false')
		.replace('"scripts": {', '"scripts": {\n\t\t"postinstall": "node ./scripts/postinstall.js",')
		// eslint-disable-next-line regexp/strict
		.replace(/"workspaces": \[[^\]]*],\s*/g, ''),
);
