class BasePage {
  constructor(page) {
    this.page = page;
  }

  async open(url) {
    await this.page.goto(url, {
      waitUntil: "domcontentloaded"
    });
  }

  async waitForPageReady() {
    await this.page.waitForLoadState("networkidle");
  }

  async scrollIntoView(locator) {
    await locator.scrollIntoViewIfNeeded();
  }

  getByRole(role, options) {
    return this.page.getByRole(role, options);
  }

  getByText(text, options = {}) {
    return this.page.getByText(text, options);
  }
}

module.exports = BasePage;
