const express = require('express');
const { searchBooks } = require('../controllers/searchController');

const router = express.Router();

// Route to search for books
router.get('/', searchBooks);

module.exports = router;
