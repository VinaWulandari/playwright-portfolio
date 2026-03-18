class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = '#user-name';
    this.password = '#password';
    this.loginButton = '#login-button';
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(user, pass) {
    await this.page.fill(this.username, user);
    await this.page.fill(this.password, pass);
    await this.page.click(this.loginButton);
  }
}

module.exports = { LoginPage };