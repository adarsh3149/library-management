const transporter = require('../config/nodemailer');

// Send an email notification with plain text and HTML
const sendEmailNotification = async (req, res) => {
    const { to, subject, text, html } = req.body;

    const mailOptions = {
        from: `"Library Notification Service" <${process.env.EMAIL_USER}>`, // Sender address (your Gmail)
        to, // Receiver email(s)
        subject, // Email subject
        text, // Plain text body
        html, // HTML body
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
        res.status(200).json({ msg: 'Email sent successfully', messageId: info.messageId });
    } catch (err) {
        console.error('Error sending email:', err);
        res.status(500).json({ msg: 'Failed to send email', error: err });
    }
};

module.exports = { sendEmailNotification };
