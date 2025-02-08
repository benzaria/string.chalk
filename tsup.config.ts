import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/**/*'],
    format: ['esm'],
    splitting: false,
    sourcemap: false,
    bundle: false,
    clean: true,
    dts: false,
    minify: false,
    minifySyntax: true,
    outExtension: ({ format }) => ({ js: format === 'cjs' ? '.cjs' : '.mjs', dts: '.d.ts' }),
});