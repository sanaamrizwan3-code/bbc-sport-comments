const { Before, After, setDefaultTimeout, setWorldConstructor } = require("@cucumber/cucumber");
const { chromium } = require("@playwright/test");
const HomePage = require("../pages/HomePage");
const SportPage = require("../pages/SportPage");
const ArticlePage = require("../pages/ArticlePage");

setDefaultTimeout(60 * 1000);

class CustomWorld {
  constructor({ parameters }) {
    this.parameters = parameters || {};
    this.browser = null;
    this.context = null;
    this.page = null;
    this.homePage = null;
    this.sportPage = null;
    this.articlePage = null;
  }
}

setWorldConstructor(CustomWorld);

Before(async function () {
  const headless = this.parameters.headless !== false;

  this.browser = await chromium.launch({ headless });
  this.context = await this.browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  this.page = await this.context.newPage();
  this.homePage = new HomePage(this.page);
  this.sportPage = new SportPage(this.page);
  this.articlePage = new ArticlePage(this.page);
});

After(async function () {
  if (this.context) {
    await this.context.close();
  }

  if (this.browser) {
    await this.browser.close();
  }
});
