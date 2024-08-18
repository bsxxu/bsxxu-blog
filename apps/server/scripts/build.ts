import * as esbuild from 'esbuild';

(async () => {
	await esbuild.build({
		entryPoints: ['./src/main.ts'],
		outfile: './dist/main.js',
		bundle: true,
		minify: true,
		platform: 'node',
		treeShaking: true,
	});
})();
