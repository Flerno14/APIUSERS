import { randomUUID } from "crypto";
import { sql } from './db.js';

export class DatabasePostgres { 
  async listBooks() {
    const books = await sql`select * from books`;
    return books;
  }

  async createBook(book) {
    const id = randomUUID();
    console.log('id', id);
    const name = book.name;
    const author = book.author;
    const genre = book.genre;
    
    await sql`insert into books (id, name, author, genre)
    values (${id}, ${name}, ${author}, ${genre})`
  }

  async updateBook(id, book) {
    const name = book.name;
    const author = book.author;
    const genre = book.genre;

    await sql`update books set 
        name = ${name},
        author = ${author},
        genre = ${genre}
        where id = ${id}
    `;
  }

  async deleteBook(id) {
    await sql`delete from books where id = ${id}`
  }

}