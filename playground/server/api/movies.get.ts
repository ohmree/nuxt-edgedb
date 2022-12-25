import e from 'edgeql-js';
import { useEdgeDB } from 'nuxt-edgedb';

export default defineEventHandler(async event => {
  const edgedb = useEdgeDB(event);
  const query = e.select(e.Movie, () => ({
    ...e.Movie['*'],
    id: false,
    actors: { ...e.Person['*'], id: false },
  }));
  const result = await query.run(edgedb);
  return result;
});
