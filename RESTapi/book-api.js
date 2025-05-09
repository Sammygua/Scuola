const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Array per memorizzare i libri
let books = [];

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Endpoint per aggiungere un libro (CREATE)
app.post('/book', (req, res) => {
    const book = req.body;
    console.log(book);
    books.push(book);
    res.send('Il libro è stato aggiunto al database');
});

// Endpoint per ottenere tutti i libri (READ)
app.get('/books', (req, res) => {
    res.json(books);
});

// Endpoint per ottenere un libro specifico per ID (READ)
app.get('/book/:id', (req, res) => {
    const id = req.params.id;
    for (let book of books) {
        if (book.id === id) {
            res.json(book);
            return;
        }
    }
    res.status(404).send('Libro non trovato');
});

// Endpoint per aggiornare un libro (UPDATE)
app.put('/book/:id', (req, res) => {
    const id = req.params.id;
    const newBook = req.body;
    
    for (let i = 0; i < books.length; i++) {
        if (books[i].id === id) {
            books[i] = newBook;
            res.send('Libro aggiornato con successo');
            return;
        }
    }
    
    res.status(404).send('Libro non trovato');
});

// Endpoint per eliminare un libro (DELETE)
app.delete('/book/:id', (req, res) => {
    const id = req.params.id;
    
    for (let i = 0; i < books.length; i++) {
        if (books[i].id === id) {
            books.splice(i, 1);
            res.send('Libro eliminato con successo');
            return;
        }
    }
    
    res.status(404).send('Libro non trovato');
});

app.listen(port, () => console.log(`API REST per libri in ascolto sulla porta ${port}!`));