// Rollup
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

// Plugins
import svelte from 'rollup-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import del from 'rollup-plugin-delete';

const production = !process.env.ROLLUP_WATCH;
console.log('production: ', production);

const serve = () => {
  let started = false;

  return {
    writeBundle() {
      if (!started) {
        started = true;

        require('child_process')
          .spawn('npm', ['run', 'start', '--', '--dev'], {
            stdio: ['ignore', 'inherit', 'inherit'],
            shell: true,
          });
      }
    },
  };
};

export default {
  input: 'src/main.js',
  output: {
    sourcemap: !production,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js',
  },
  plugins: [
    del({ targets: 'public/build/*' }),
    svelte({
      dev: !production,
      css: css => {
        css.write('bundle.css', !production);
      },
      preprocess: sveltePreprocess(),
    }),
    resolve({
      browser: true,
      dedupe: importee =>
        importee === 'svelte'
        || importee.startsWith('svelte/'),
    }),
    commonjs(),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload('public'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
  ],
  external: ['vscode'],
  watch: {
    clearScreen: false,
  },
};
