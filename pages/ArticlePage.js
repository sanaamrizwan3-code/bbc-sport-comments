const BasePage = require("./BasePage");

class ArticlePage extends BasePage {
  
  constructor(page) {
    super(page);

    this.commentsSection = page.locator(
      'h2#section-heading:has-text("Comments")'
    ).first();
    this.joinConversationText = page.getByText("Join the conversation", { exact: false }).first();
    this.signInButton = page.locator('span.call-to-action-link-text-wrapper', {
      hasText: 'Sign in'
    }).first();

    this.registerButton = page.locator('a[href*="action=register"]', {
      hasText: 'Register'
    }).first();
  }

  async open(url) {
    await super.open(url);
    await this.dismissOverlays();
  }

  async openSportHome() {
    await this.open("https://www.bbc.co.uk/sport");
    await this.waitForPageReady();
  }

  async dismissOverlays() {
    const cookieButton = this.page.getByRole("button", {
      name: /accept additional cookies|yes, i agree/i
    }).first();

    if (await cookieButton.isVisible().catch(() => false)) {
      await cookieButton.click();
    }
  }

  async scrollToComments() {
    const hash = this.page.url().includes("#comments");

    if (!hash) {
      await this.page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
    }

    if (await this.commentsSection.count()) {
      await this.scrollIntoView(this.commentsSection);
    } else {
      await this.page.locator("body").press("End").catch(() => { });
    }
  }

  async isCommentsSectionVisible() {
    return this.commentsSection.isVisible().catch(() => false);
  }

  async isJoinConversationVisible() {
    return this.joinConversationText.isVisible().catch(() => false);
  }

  async isSignInButtonVisible() {
    return this.signInButton.isVisible().catch(() => false);
  }

  async isRegisterButtonVisible() {
    return this.registerButton.isVisible().catch(() => false);
  }

  getJoinConversationLocator() {
    return this.joinConversationText;
  }
}

module.exports = ArticlePage;
