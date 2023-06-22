import { copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { build } from 'unbuild';

const __dirname = dirname(fileURLToPath(import.meta.url));

const copyNuxtFile = (name) => copyFileSync(
	join(__dirname, '..', 'nuxt-module', name),
	join(__dirname, '..', 'nuxt', name),
);

build('.', false, {
	outDir: './nuxt',
	entries: [
		{
			input: './nuxt-module/module.ts',
			name: 'module',
		},
	],
	failOnWarn: false,
	rollup: {
		emitCJS: true,
	},
	hooks: {
		'build:done'(context) {
			// Annoying messages, I know these files are inlined and this is intended.
			context.warnings.forEach(w => {
				if (w.includes('Inlined') && w.match(/nuxt-module[/\\]module/)) {
					context.warnings.delete(w);
				}
			});
			// Move static files.
			['template.d.ts', 'template.vue', 'types.d.ts', 'package.json']
				.forEach(file => copyNuxtFile(file));
		},
	},
});
