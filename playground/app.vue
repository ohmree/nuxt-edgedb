<script setup lang="ts">
import { Movie, Person } from 'edgeql-js/interfaces';
import type { Awaited } from 'nitropack';

type PersonWithoutID = OmitID<Person>;
type MovieWithoutID = OmitID<
  Omit<Movie, 'actors'> & { actors: PersonWithoutID[] }
>;

const movie: MovieWithoutID = reactive({
  title: '',
  release_year: undefined,
  actors: [{ name: 'Timothée Chalamet' }],
});

async function addMovie() {
  await $fetch('/api/movies', { method: 'post', body: movie });
}

const { data: movies } = $(
  await useFetch('/api/movies', {
    method: 'get',
    transform: data =>
      data as Awaited<
        ReturnType<typeof import('@/server/api/movies.get').default>
      >,
    default: () => [],
  }),
);
</script>

<template>
  <main>
    <form @submit.prevent="addMovie()">
      <div>
        <label>
          Title:
          <input v-model="movie.title" type="text" />
        </label>
      </div>

      <div>
        <label>
          Release year:
          <input
            v-model="movie.release_year"
            type="number"
            min="1900"
            max="2100"
          />
        </label>
      </div>

      <br />
      <button type="submit">Submit</button>
    </form>
    <table>
      <thead>
        <tr>
          <th :colspan="movies.length">Movies</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <!-- eslint-disable-next-line vue/require-v-for-key -->
          <td v-for="key in movies">{{ key }}</td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<style scoped>
table,
td {
  border: 1px solid #333;
}

thead,
tfoot {
  background-color: #333;
  color: #fff;
}
</style>
