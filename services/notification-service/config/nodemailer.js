const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { CronJob } = require('cron');
const Borrowing = require('../models/Borrowing');
const User = require('../models/User');
const { Op } = require('sequelize');

// Configure the email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
     user: 'adarshsoham03@gmail.com',
     pass: 'bbid vsrs uakx dgsc',
    },
   });

// Cron job to check for overdue books
const job = new CronJob('0 0 * * *', async () => { // Runs daily
  try {
    const now = new Date();
    const borrowings = await Borrowing.findAll({
      where: {
        isReturned: false,
        returnDate: {
          [Op.lt]: now,
        },
      },
      include: [{ model: User }],
    });

    for (const borrowing of borrowings) {
      const mailOptions = {
        from: 'your_email@gmail.com',
        to: borrowing.User.email,
        subject: 'Book Return Reminder',
        text: `Dear User, your borrowed book (ID: ${borrowing.bookId}) is overdue. Please return it as soon as possible.`,
      };

      await transporter.sendMail(mailOptions);
    }
  } catch (error) {
    console.error('Error sending email:', error);
  }
});

job.start();

module.exports = router;
