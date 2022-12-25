import { createClient, type Client } from 'edgedb';
import { defineEventHandler } from 'h3';

declare module 'h3' {
  interface H3EventContext {
    edgedb: Client;
  }
}

let edgedb: Client;
export default defineEventHandler(event => {
  if (edgedb == null) {
    edgedb = createClient();
  }
  event.context.edgedb = edgedb;
});
