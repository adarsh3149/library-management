const express = require('express');
const { sequelize } = require('./config/db');
const bookRoutes = require('./routes/book');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse incoming JSON
app.use(express.json());

// Connect to PostgreSQL
sequelize.authenticate()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Error connecting to PostgreSQL:', err));

// Use Book Routes
app.use('/api/books', bookRoutes);

// Test Route
app.get('/', (req, res) => {
    res.send('Book Service is running...');
});

app.listen(PORT, () => {
    console.log(`Book Service running on port ${PORT}`);
});

    // Sync all models
sequelize.sync()
    .then(() => console.log('Database synchronized'))
    .catch(err => console.error('Error synchronizing database:', err));
