const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');

test('User berhasil checkout produk', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  // Add product
  await page.click('#add-to-cart-sauce-labs-backpack');

  // Go to cart
  await page.click('.shopping_cart_link');

  // Checkout
  await page.click('#checkout');
  await page.fill('#first-name', 'Test');
  await page.fill('#last-name', 'User');
  await page.fill('#postal-code', '12345');

  await page.click('#continue');
  await page.click('#finish');

  await expect(page.locator('.complete-header'))
    .toHaveText('Thank you for your order!');
});