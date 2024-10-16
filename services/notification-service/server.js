const express = require('express');
const notificationRoutes = require('./routes/notification');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware to parse incoming JSON
app.use(express.json());

// Use Notification Routes
app.use('/api/notifications', notificationRoutes);

// Test Route
app.get('/', (req, res) => {
    res.send('Notification Service is running...');
});

app.listen(PORT, () => {
    console.log(`Notification Service running on port ${PORT}`);
});
