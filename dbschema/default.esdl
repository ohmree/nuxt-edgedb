module default {
  type Movie {
    required property title -> str { constraint exclusive; constraint min_len_value(1); };
    property release_year -> int64;
    multi link actors -> Person;
  }

  type Person {
    required property name -> str { constraint min_len_value(1); };
  }
};
