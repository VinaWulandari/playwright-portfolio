const nodemailer = require('nodemailer');

async function sendEmail(summary) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'testing.vinaw@gmail.com',
      pass: 'sefziiwmckcjbnpd'
    }
  });

  let info = await transporter.sendMail({
    from: '"Automation Report" <testing.vinaw@gmail.com>',
    to: 'testing.vinaw@gmail.com',
    subject: 'Hasil Automation Testing',
    html: `
      <h2>Automation Test Result</h2>

      <p><b>Total:</b> ${summary.total}</p>
      <p style="color:green;"><b>Passed:</b> ${summary.passed}</p>
      <p style="color:red;"><b>Failed:</b> ${summary.failed}</p>

      <hr/>

      <p>Report dapat dibuka di lokal:</p>
      <code>npx allure open allure-report</code>

      <p>Waktu: ${new Date().toLocaleString()}</p>

      Terima kasih.
        `,

        attachments: [
        // 👉 OPSI 1: HTML file (simple)
        {
          filename: 'report.html',
          path: './allure-report/index.html'
        }
      ]
    });

  console.log('Email terkirim:', info.messageId);
}

module.exports = { sendEmail };