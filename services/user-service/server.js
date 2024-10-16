const express = require('express');
const { sequelize } = require('./config/db');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON
app.use(express.json());

// Connect to PostgreSQL
sequelize.authenticate()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Error connecting to PostgreSQL:', err));

    
// Use Auth Routes
app.use('/api/auth', authRoutes);
    
// Test Route
app.get('/', (req, res) => {
        res.send('User Service is running...');
    });
    
app.listen(PORT, () => {
        console.log(`User Service running on port ${PORT}`);
    });
// Sync all models
sequelize.sync()
    .then(() => console.log('Database synchronized'))
    .catch(err => console.error('Error synchronizing database:', err));
