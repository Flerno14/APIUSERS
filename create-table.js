import { sql } from './db.js'

sql`
  CREATE TABLE books (
      id text PRIMARY KEY,
      name character varying(255),
      author character varying(255),
      genre character varying(255)
  );
`.then(() => {
  console.log('tabela criada');
})