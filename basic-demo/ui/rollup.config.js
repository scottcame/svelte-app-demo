import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import purgecss from '@fullhuman/postcss-purgecss';
import alias from "rollup-plugin-alias";
import babel from 'rollup-plugin-babel';
import sass from 'node-sass';
import fs from 'fs';

//import sizes from 'rollup-plugin-sizes';

const production = process.env.DEV!=="true";
console.log("Performing a " + (production ? "production" : "dev") + " build");

const watch = process.env.ROLLUP_WATCH;

sass.render({
  file: 'src/global.scss',
  outfile: 'public/global-compiled.css'
}, function (error, result) {
  if (!error) {
    fs.writeFile('public/global-compiled.css', result.css, function (err) {
      if (err) {
        console.log(err)
      }
    });
  } else {
    console.log(error)
  }
});

export default {

  input: 'src/main.js',

  output: {
    sourcemap: !production,
    format: 'iife',
    name: 'app',
    file: 'public/bundle.js'
  },

  plugins: [

    alias({
      "@fortawesome/fontawesome-free-solid": "node_modules/@fortawesome/fontawesome-free-solid/shakable.es.js"
    }),

    postcss({
      extensions: [ '.css' ],
      plugins: [
        purgecss({
          css: ['node_modules/bootstrap/dist/css/bootstrap.*', 'node_modules/@fortawesome/fontawesome/styles.css'],
          content: ['src/*.svelte']
        })
      ],
      minimize: {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
        }]
      },
      sourceMap: !production
    }),

    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // extract component CSS out into a separate file — better for performance
      css: css => {
        // second arg controls whether we generate a sourcemap
        css.write('public/bundle.css', !production);
      }
    }),

    resolve(),
    commonjs(),

    babel({
      extensions: ['.js', '.svelte', '.ts', '.mjs'],
      presets: [
        [
          "@babel/env",
          {
            targets: {
              ie: '11',
            },
            useBuiltIns: false // cannot use babel polyfill due to IE11.  see documentation in index.html for details.
          },
        ],
      ]
    }),

    // Watch the `public` directory and refresh the browser on changes when not in production
    watch && livereload('public'),

    // If we're building for production (npm run build instead of npm run dev), minify
    production && terser({ sourcemap: false }),

    // uncomment to display bundle component sizes
    //sizes({ details: true})

  ]

};
