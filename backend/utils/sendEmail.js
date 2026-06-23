const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const message = {
    from: `${process.env.EMAIL_FROM_NAME || 'Yoga Healers'} <${process.env.EMAIL_FROM || 'noreply@yogahealers.com'}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html
  };

  try {
    const info = await transporter.sendMail(message);
    console.log(`Email sent successfully: ${info.messageId}`);
    return info;
  } catch (error) {
    console.warn(`SMTP email sending failed: ${error.message}. Falling back to console logger.`);
    console.log('--- MOCK EMAIL OUTBOX ---');
    console.log(`To: ${options.email}`);
    console.log(`Subject: ${options.subject}`);
    console.log(`Message Body:\n${options.message}`);
    console.log('-------------------------');
    // We resolve/return truthy to prevent breaking developer flows when SMTP is unconfigured
    return { mock: true, message: 'Logged to console' };
  }
};

module.exports = sendEmail;
