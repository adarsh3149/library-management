const express = require('express');
const cors = require('cors');
require('dotenv').config();

const searchRoutes = require('./routes/searchRoutes');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3004;

// Set up routes
app.use('/api/search', searchRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Search Service running on port ${PORT}`);
});
