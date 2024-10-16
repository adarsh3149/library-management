const axios = require('axios');

// Search books by title, author, genre, or availability
const searchBooks = async (req, res) => {
    const { title, author, genre, available } = req.query;

    try {
        // Send a request to the Book Service to fetch books
        const response = await axios.get(process.env.BOOK_SERVICE_URL, {
            params: { title, author, genre, available }
        });

        // Return the filtered books from the Book Service
        const books = response.data;
        res.status(200).json(books);
    } catch (error) {
        console.error('Error fetching books from Book Service:', error.message);
        res.status(500).json({ error: 'Failed to search books' });
    }
};

module.exports = { searchBooks };
