import { fastify } from 'fastify';
import cors from '@fastify/cors';
import { DatabasePostgres } from './database-postgres.js';

const server = fastify();
const databasePostgres = new DatabasePostgres();

// CORS
server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
});

// ENDPOINTS (CRUD):

// CREATE
server.post('/books', async (request, reply) => {
    const body = request.body;

    let error = ''; 

    if (!body.name){
        error.name = 'O valor nome não foi informado'
    } else if (!body.author){
        error.author = 'O valor autor não foi informado'
    } else if (!body.genre){
        error.genre = 'O valor gênero não foi informado'
    }

    if(body.name && body.author && body.genre){
        await databasePostgres.createUser(body);
        return reply.status(201).send();
    }else{
        return reply.status(400).send();
    }
    });

// READ (Get all books)
server.get('/books', async () => {
    const books = await databasePostgres.listBooks();
    return books;
});

// READ (Get a specific book by ID)
server.get('/books/:id', async (request, reply) => {
    const bookID = request.params.id;
    const book = await databasePostgres.getBookById(bookID);
    if (!book) {
        return reply.status(404).send({ error: 'Book not found' });
    }
    return book;
});

// UPDATE
server.put('/books/:id', async (request, reply) => {
    const bookID = request.params.id;
    const body = request.body;
    await databasePostgres.updateBook(bookID, body);
   
    return reply.status(204).send();
});

// DELETE
server.delete('/books/:id', async (request, reply) => {
    const bookID = request.params.id;
    const deleted = await databasePostgres.deleteBook(bookID);

    

    return reply.status(204).send();
});

// Start server
server.listen({
    port: 3333
}, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server is running at ${address}`);
});
