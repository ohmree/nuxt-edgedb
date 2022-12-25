CREATE MIGRATION m15qytuunrnvm5etn4hgdhwwjsq52mzsdth2uh2wsfc6y553txi6oq
    ONTO initial
{
  CREATE FUTURE nonrecursive_access_policies;
  CREATE TYPE default::Person {
      CREATE REQUIRED PROPERTY name -> std::str;
  };
  CREATE TYPE default::Movie {
      CREATE MULTI LINK actors -> default::Person;
      CREATE PROPERTY release_year -> std::int64;
      CREATE REQUIRED PROPERTY title -> std::str {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
