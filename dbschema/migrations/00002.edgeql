CREATE MIGRATION m1fskvv4rqhfetd7exj2fxuinxtuassss6ws6bkrltnr4lqx3ks2zq
    ONTO m15qytuunrnvm5etn4hgdhwwjsq52mzsdth2uh2wsfc6y553txi6oq
{
  ALTER TYPE default::Movie {
      ALTER PROPERTY title {
          CREATE CONSTRAINT std::min_len_value(1);
      };
  };
  ALTER TYPE default::Person {
      ALTER PROPERTY name {
          CREATE CONSTRAINT std::min_len_value(1);
      };
  };
};
