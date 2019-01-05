import typescript from 'rollup-plugin-typescript2';
import autoExternal from 'rollup-plugin-auto-external';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
const { BUNDLE_ALL } = require('@brainglitch/utilities-build-tools').flags;

export default {
    input: 'src/main.ts',
    external: BUNDLE_ALL ? '' : id => /react|rxjs/.test(id),
    output: {
        file: 'lib/main.js',
        format: 'esm',
    },
    plugins: [
        resolve(), // so Rollup can node_modules pacakges
        commonjs(), // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
        BUNDLE_ALL ? () => {} : autoExternal(), //
        typescript(),
    ],
};
