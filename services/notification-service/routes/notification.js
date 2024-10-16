const express = require('express');
const { sendEmailNotification } = require('../controllers/notificationController');

const router = express.Router();

// Route to send email notification
router.post('/email', sendEmailNotification);

module.exports = router;
