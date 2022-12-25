import e from 'edgeql-js';
import { useEdgeDB } from 'nuxt-edgedb';
import type { Movie } from 'edgeql-js/interfaces';

export default defineEventHandler(async event => {
  const { actors, title, release_year } = await readBody<OmitID<Movie>>(event);
  const edgedb = useEdgeDB(event);
  const actorsQuery = e.for(e.json_array_unpack(e.json(actors)), actor =>
    e.insert(e.Person, { name: e.cast(e.str, actor.name) }),
  );
  const query = e.insert(e.Movie, {
    title,
    release_year,
    actors: actorsQuery,
  });
  const result = await query.run(edgedb);
  return result;
});
