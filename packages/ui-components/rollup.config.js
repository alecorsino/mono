import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import autoExternal from 'rollup-plugin-auto-external';
import autoprefixer from 'autoprefixer';

export default {
    input: 'src/main.ts',
    external: id => /react|rxjs/.test(id),
    output: {
        file: 'lib/main.js',
        format: 'es',
    },
    plugins: [
        autoExternal(),
        typescript(),
        postcss({
            extract: true,
            modules: true,
            plugins: [
                autoprefixer({
                    browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 11', // React doesn't support IE8 anyway
                    ],
                    flexbox: 'no-2009',
                }),
            ],
        }),
    ],
};
