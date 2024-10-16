const express = require('express');
const Book = require('../models/Book');

const router = express.Router();

// Create a new book
router.post('/', async (req, res) => {
    const { title, author, publishedYear, genre, availableCopies } = req.body;

    try {
        const newBook = await Book.create({ title, author, publishedYear, genre, availableCopies });
        res.status(201).json(newBook);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Get all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Get a book by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.findByPk(id);
        if (!book) return res.status(404).json({ msg: 'Book not found' });
        res.json(book);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Update a book by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, publishedYear, genre, availableCopies } = req.body;

    try {
        const [updated] = await Book.update({ title, author, publishedYear, genre, availableCopies }, { where: { id } });
        if (!updated) return res.status(404).json({ msg: 'Book not found' });
        res.json({ msg: 'Book updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Delete a book by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Book.destroy({ where: { id } });
        if (!deleted) return res.status(404).json({ msg: 'Book not found' });
        res.json({ msg: 'Book deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
