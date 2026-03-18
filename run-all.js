const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const { sendEmail } = require('./utils/emailSender');

exec('npx playwright test', (err) => {

  if (err) {
    console.log('Test selesai (mungkin ada yang gagal, itu normal)');
  }

  exec('npx allure generate allure-results --clean -o allure-report', async () => {

    // 🔥 HITUNG DARI ALLURE RESULT FILE
    const resultsDir = path.join(__dirname, 'allure-results');
    const files = fs.readdirSync(resultsDir);

    let total = 0;
    let passed = 0;
    let failed = 0;

    files.forEach(file => {
      if (file.includes('-result.json')) {
        const content = JSON.parse(
          fs.readFileSync(path.join(resultsDir, file), 'utf-8')
        );

        total++;

        if (content.status === 'passed') passed++;
        if (content.status === 'failed') failed++;
      }
    });

    const summary = { total, passed, failed };

    console.log('📊 Summary:', summary);

    await sendEmail(summary);

  });
});