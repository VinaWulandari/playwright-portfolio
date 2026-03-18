async function login(page) {
  await page.goto('/');
  await page.fill('#user-name', process.env.USERNAME);
  await page.fill('#password', process.env.PASSWORD);
  await page.click('#login-button');
  
}

module.exports = { login };