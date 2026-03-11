// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

const repository = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'split-gold';
const owner = process.env.GITHUB_REPOSITORY?.split('/')[0];

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: owner ? `https://${owner}.github.io` : undefined,
  base: `/${repository}/`,
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          if (
            warning.code === 'UNUSED_EXTERNAL_IMPORT' &&
            typeof warning.message === 'string' &&
            warning.message.includes('@astrojs/internal-helpers/remote')
          ) {
            return;
          }
          warn(warning);
        },
      },
    },
  },
});
