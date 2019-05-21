import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import purgecss from '@fullhuman/postcss-purgecss';
import cssnano from 'cssnano';
import alias from "rollup-plugin-alias";
import babel from 'rollup-plugin-babel';

const production = !process.env.ROLLUP_WATCH;

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
					css: ['./**/bootstrap.*'],
					content: ['./src/**/*.svelte']
				}),
				cssnano({
					preset: ['default', {
						discardComments: {
							removeAll: true,
						},
					}]
				})
			],
			sourceMap: !production
		}),

		svelte({
			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file — better for performance
			css: css => {
				// second arg controls whether we generate a sourcemap
				css.write('public/bundle.css', !production);
			}
		}),

		resolve(),

		commonjs(),

		babel({
			exclude: ['node_modules/**', 'src/**'],
			extensions: ['.js', '.ts'],
			presets: [
				[
					'@babel/env',
					{
						modules: false,
						targets: '> 1%, IE 11',
						useBuiltIns: 'usage',
						corejs: 3,
						debug: true,
					}
				]
			]
		}),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		//production && terser({ sourcemap: false })
	]

};
