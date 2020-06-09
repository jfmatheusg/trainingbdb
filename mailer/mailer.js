const nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'marcellus12@ethereal.email',
        pass: 'H9T7gjcqFrHfqkuEgH'
    }
});