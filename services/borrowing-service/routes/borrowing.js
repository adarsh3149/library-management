// const express = require('express');
// const Borrowing = require('../models/Borrowing');
// // const Book = require('../models/Book');
// const authMiddleware = require('../middleware/authMiddleware');

// const router = express.Router();

// // // Create a new borrowing record
// // router.post('/', async (req, res) => {
// //     const { userId, bookId, borrowDate } = req.body;

// //     try {
// //         const newBorrowing = await Borrowing.create({ userId, bookId, borrowDate });
// //         res.status(201).json(newBorrowing);
// //     } catch (err) {
// //         console.error(err);
// //         res.status(500).json({ msg: 'Server error' });
// //     }
// // });

// // // Get all borrowing records
// // router.get('/', async (req, res) => {
// //     try {
// //         const borrowings = await Borrowing.findAll();
// //         res.json(borrowings);
// //     } catch (err) {
// //         console.error(err);
// //         res.status(500).json({ msg: 'Server error' });
// //     }
// // });

// // // Get a borrowing record by ID
// // router.get('/:id', async (req, res) => {
// //     const { id } = req.params;

// //     try {
// //         const borrowing = await Borrowing.findByPk(id);
// //         if (!borrowing) return res.status(404).json({ msg: 'Borrowing record not found' });
// //         res.json(borrowing);
// //     } catch (err) {
// //         console.error(err);
// //         res.status(500).json({ msg: 'Server error' });
// //     }
// // });

// // // Update a borrowing record by ID
// // router.put('/:id', async (req, res) => {
// //     const { id } = req.params;
// //     const { returnDate, status } = req.body;

// //     try {
// //         const [updated] = await Borrowing.update({ returnDate, status }, { where: { id } });
// //         if (!updated) return res.status(404).json({ msg: 'Borrowing record not found' });
// //         res.json({ msg: 'Borrowing record updated successfully' });
// //     } catch (err) {
// //         console.error(err);
// //         res.status(500).json({ msg: 'Server error' });
// //     }
// // });

// // // Delete a borrowing record by ID
// // router.delete('/:id', async (req, res) => {
// //     const { id } = req.params;

// //     try {
// //         const deleted = await Borrowing.destroy({ where: { id } });
// //         if (!deleted) return res.status(404).json({ msg: 'Borrowing record not found' });
// //         res.json({ msg: 'Borrowing record deleted successfully' });
// //     } catch (err) {
// //         console.error(err);
// //         res.status(500).json({ msg: 'Server error' });
// //     }
// // });


// // Borrow a book
// router.post('/borrow', authMiddleware, async (req, res) => {
//   const { bookId } = req.body;
//   const userId = req.user.id;

//   try {
//     const book = await Book.findByPk(bookId);
//     if (!book) return res.status(404).json({ message: 'Book not found' });

//     const borrowDate = new Date();
//     const returnDate = new Date(borrowDate);
//     returnDate.setDate(returnDate.getDate() + 14); // Set return date to 2 weeks from now

//     const borrowing = await Borrowing.create({ userId, bookId, borrowDate, returnDate });

//     res.status(201).json(borrowing);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Return a book
// router.post('/return/:id', authMiddleware, async (req, res) => {
//   const { id } = req.params;
  
//   try {
//     const borrowing = await Borrowing.findByPk(id);
//     if (!borrowing) return res.status(404).json({ message: 'Borrowing record not found' });

//     borrowing.isReturned = true;
//     await borrowing.save();

//     res.status(200).json(borrowing);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });




// module.exports = router;

const express = require('express');
const router = express.Router();
const Borrowing = require('../models/Borrowing');
const Book = require('../../book-service/models/Book');
const authMiddleware = require('../../user-service/middleware/authMiddleware');

// Borrow a book
router.post('/borrow', authMiddleware, async (req, res) => {
  const { bookId } = req.body;
  const userId = req.user.id;

  try {
    const book = await Book.findByPk(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const borrowDate = new Date();
    const returnDate = new Date(borrowDate);
    returnDate.setDate(returnDate.getDate() + 14); // Set return date to 2 weeks from now

    const borrowing = await Borrowing.create({ userId, bookId, borrowDate, returnDate });

    res.status(201).json(borrowing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Return a book
router.post('/return/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  
  try {
    const borrowing = await Borrowing.findByPk(id);
    if (!borrowing) return res.status(404).json({ message: 'Borrowing record not found' });

    borrowing.isReturned = true;
    await borrowing.save();

    res.status(200).json(borrowing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
