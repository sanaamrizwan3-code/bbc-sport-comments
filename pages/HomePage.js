const BasePage = require("./BasePage");

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.homeUrl = "https://www.bbc.co.uk/";
  }

  async openHome() {
    await this.open(this.homeUrl);
  }

  async acceptCookiesIfPresent() {
    const acceptButton = this.getByRole("button", { name: /accept additional cookies|yes, i agree/i }).first();

    if (await acceptButton.isVisible().catch(() => false)) {
      await acceptButton.click();
    }
  }
}

module.exports = HomePage;
