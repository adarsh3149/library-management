const express = require('express');
const { sequelize } = require('./config/db');
const borrowingRoutes = require('./routes/borrowing');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware to parse incoming JSON
app.use(express.json());

// Connect to PostgreSQL
sequelize.authenticate()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Error connecting to PostgreSQL:', err));

// Use Borrowing Routes
app.use('/api/borrowings', borrowingRoutes);

// Test Route
app.get('/', (req, res) => {
    res.send('Borrowing Service is running...');
});

app.listen(PORT, () => {
    console.log(`Borrowing Service running on port ${PORT}`);
});

// Sync all models
sequelize.sync()
    .then(() => console.log('Database synchronized'))
    .catch(err => console.error('Error synchronizing database:', err));
