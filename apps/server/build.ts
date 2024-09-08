import * as esbuild from 'esbuild';

(async () => {
  try {
    await esbuild.build({
      entryPoints: ['./src/main.ts'],
      outfile: './dist/main.js',
      bundle: true,
      minify: true,
      drop: ['console'],
      platform: 'node',
      treeShaking: true,
    });
    console.log('build success!');
  } catch (e) {
    console.error('build failed: ', e);
  }
})();
