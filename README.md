# Nuxt EdgeDB

## Development

- Run `pnpm dev:prepare` to generate type stubs.
- Use `pnpm dev` to start [playground](./playground) in development mode.

```edgeql
insert Person {
  name := 'Timothée Chalamet'
};

insert Movie {
  title := 'Dune',
  release_year := 2020,
  actors := (
    select Person
    filter
      .name = 'Timothée Chalamet'
    )
}
```
