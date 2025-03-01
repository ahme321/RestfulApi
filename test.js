const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

let books = [
  { id: 1, title: "The Hitchhiker's Guide to the Galaxy", author: "Douglas Adams", year: 1979, genre: "Science Fiction", isAvailable: true },
  { id: 2, title: "Pride and Prejudice", author: "Jane Austen", year: 1813, genre: "Classic", isAvailable: false },
  { id: 3, title: "1984", author: "George Orwell", year: 1949, genre: "Dystopian", isAvailable: true },
];

// GET all books
app.get('/books', (req, res) => {
  res.json(books);
});

// GET a specific book by ID
app.get('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);

  if (book) {
    res.json(book);
  } else {
    res.status(404).send('Book not found');
  }
});

// POST a new book
app.post('/books', (req, res) => {
  const newBook = {
    id: books.length + 1, // Generate a new ID (simplistic)
    ...req.body, // Spread operator to copy properties from request body
  };
  books.push(newBook);
  res.status(201).json(newBook); // 201 Created
});

// PUT (update) an existing book
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === bookId);

  if (bookIndex !== -1) {
    books[bookIndex] = { ...books[bookIndex], ...req.body, id:bookId }; // Merge existing book with updated data
    res.json(books[bookIndex]);
  } else {
    res.status(404).send('Book not found');
  }
});

// DELETE a book
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === bookId);

  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    res.status(204).send(); // 204 No Content
  } else {
    res.status(404).send('Book not found');
  }
});

app.listen(port, () => {
  console.log("Server listening at http://localhost:${port}");
  });