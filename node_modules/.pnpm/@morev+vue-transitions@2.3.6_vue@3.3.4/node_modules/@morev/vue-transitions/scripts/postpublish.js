const fs = require('fs');

const packageJsonContents = fs.readFileSync('package.json', { encoding: 'utf8' });

fs.writeFileSync(
	'package.json',
	packageJsonContents.replace('"private": false', '"private": true'),
);
