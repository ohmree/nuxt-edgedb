import { fileURLToPath } from 'url';
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  modules: ['../src/module'],
  alias: {
    'nuxt-edgedb': fileURLToPath(new URL('../src/module.ts', import.meta.url)),
    'edgeql-js': fileURLToPath(
      new URL('../dbschema/edgeql-js', import.meta.url),
    ),
    'edgeql-js/interfaces': fileURLToPath(
      new URL('../dbschema/interfaces.ts', import.meta.url),
    ),
  },
  edgedb: {
    addMiddleware: true,
  },
  nitro: {
    rollupConfig: {
      // HACK: this silences an annoying warning.
      // See https://github.com/edgedb/edgedb-js/issues/494 for more info.
      onwarn(warning, rollupWarn) {
        if (
          !['CIRCULAR_DEPENDENCY', 'EVAL', 'UNUSED_EXTERNAL_IMPORT'].includes(
            warning.code ?? '',
          ) &&
          !warning.message.includes('Unsupported source map comment')
        ) {
          rollupWarn(warning);
        }
      },
    },
  },
  typescript: {
    shim: false,
  },
  experimental: { reactivityTransform: true },
  imports: {
    addons: { vueTemplate: true },
    autoImport: true,
  },
});
