require('dotenv').config();
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

async function sendEmail(summary) {
  try {
    console.log('📧 Starting email process...');

    // 🔐 Config email transporter (Gmail)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 📊 Summary fallback (biar ga error kalau undefined)
    const safeSummary = summary || {
      total: 0,
      passed: 0,
      failed: 0,
    };

    // 📁 Path report (Allure HTML)
    const reportPath = path.join(__dirname, '../allure-report/index.html');

    // ⚠️ cek file ada atau tidak
    let attachments = [];
    if (fs.existsSync(reportPath)) {
      attachments.push({
        filename: 'allure-report.html',
        path: reportPath,
      });
      console.log('📎 Attachment found');
    } else {
      console.log('⚠️ Attachment NOT found');
    }

    // ✉️ Kirim email
    let info = await transporter.sendMail({
      from: `"Playwright Report" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // kirim ke diri sendiri dulu
      subject: '✅ Automation Test Report',
      html: `
        <h2>Playwright Automation Report</h2>
        <p><b>Total Test:</b> ${safeSummary.total}</p>
        <p><b>Passed:</b> ${safeSummary.passed}</p>
        <p><b>Failed:</b> ${safeSummary.failed}</p>

        <br/>
        <p>📊 Report tersedia di GitHub Pages:</p>
        <a href="${process.env.GITHUB_PAGES_URL}">
          Lihat Report
        </a>
      `,
      attachments: attachments,
    });

    console.log('✅ Email sent:', info.response);

  } catch (error) {
    console.error('❌ Email error:', error);
  }
}

module.exports = { sendEmail };