require('dotenv').config();

const nodemailer = require('nodemailer');

async function sendEmail(summary) {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: `"QA Automation" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: 'Automation Test Result',

    html: `
      <h2>🚀 Test Result</h2>
      <p>Total: ${summary.total}</p>
      <p>Passed: ${summary.passed}</p>
      <p>Failed: ${summary.failed}</p>

      <a href="https://VinaWulandari.github.io/playwright-portfolio/">
        View Report
      </a>
    `
  });

  console.log("✅ Email sent");
}

module.exports = { sendEmail };