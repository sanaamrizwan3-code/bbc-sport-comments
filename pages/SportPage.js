const BasePage = require("./BasePage");

class SportPage extends BasePage {
  constructor(page) {
    super(page);
    this.sportUrl = "https://www.bbc.co.uk/sport";
  }

  async openSportHome() {
    await this.open(this.sportUrl);
  }

  async openArticle(url) {
    await this.open(url);
  }
}

module.exports = SportPage;
