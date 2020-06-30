// Rollup
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

// Plugins
import svelte from 'rollup-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

const serve = () => {
  let started = false;

  return {
    writeBundle() {
      if (!started) {
        started = true;

        require('child_process')
          .spawn('npm', ['run', 'start', '--', '--dev'], {
            stdio: ['ignore', 'inherit', 'inherit'],
            shell: true
          });
      }
    }
  };
};

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js',
  },
  plugins: [
    svelte({
      dev: !production,
      css: css => {
        css.write('public/build/bundle.css');
      },
      preprocess: sveltePreprocess(),
    }),
    resolve({
      browser: true,
      dedupe: importee =>
        importee === 'svelte' ||
        importee.startsWith('svelte/'),
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
    production && terser()
  ],
  external: ['vscode'],
  watch: {
    clearScreen: false,
  },
};
