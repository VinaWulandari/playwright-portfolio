// @ts-check
const { defineConfig, devices } = require('@playwright/test');
require('dotenv').config();

module.exports = defineConfig({

  testDir: './tests',

  /* ⏱ Timeout */
  timeout: 30 * 1000,

  /* Retry kalau gagal */
  retries: 1,

  /* Parallel execution */
  workers: 2,

  /* 📊 Reporter */
  reporter: [
    ['list'],
    ['allure-playwright']
  ],

  /* ⚙️ Global setting */
  use: {
    baseURL: process.env.BASE_URL,

    headless: true,

    /* Screenshot & Video */
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    /* Trace (debugging keren banget) */
    trace: 'on-first-retry'
  },

  /* 🌐 Browser setup */
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium'  },
    }
    // {
    //   name: 'Firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'WebKit',
    //   use: { ...devices['Desktop Safari'] },
    // }
  ],

});