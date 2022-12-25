import { fileURLToPath } from 'url';
import { defineNuxtModule, addServerHandler, createResolver } from '@nuxt/kit';
import type { H3Event } from 'h3';
import type { Client, createClient } from 'edgedb';

export function useEdgeDB(event: H3Event): Client {
  return event.context.edgedb;
}

export interface ModuleOptions {
  addMiddleware: boolean;
  connectOptions: Parameters<typeof createClient>[0];
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-edgedb',
    configKey: 'edgedb',
  },
  defaults: {
    addMiddleware: true,
    connectOptions: null,
  },
  setup(options, nuxt) {
    if (options.addMiddleware) {
      const { resolve } = createResolver(import.meta.url);
      const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url));
      nuxt.options.build.transpile.push(runtimeDir);
      addServerHandler({
        handler: resolve(runtimeDir, 'middleware'),
        middleware: true,
      });
    }
  },
});
