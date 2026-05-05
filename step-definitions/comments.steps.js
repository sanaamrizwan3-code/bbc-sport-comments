const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const {
  findArticleWithComments,
  findArticleWithoutComments,
  findArticleByCommentSupport
} = require("../utils/findArticleWithComments");

Given("the user opens a BBC Sport article with comments enabled", async function () {
  const result = await findArticleWithComments(this.page, false);
  console.log(`Article with comments found result: ${result + "#comments"}`);
  this.currentArticle = result + "#comments";

  const articlePath = new URL(this.page.url()).pathname;

  await this.page
    .locator(`a[href*="${articlePath}"][href*="#comments"]`)
    .first()
    .click();

});

Given("the user opens a BBC Sport article without comments enabled", async function () {
  const result = await findArticleWithoutComments(this.page, false);
  console.log(`Article without comments found result: ${result}`);
  this.currentArticle = result + "#comments";

  await this.page.goto(this.currentArticle, {
    waitUntil: "domcontentloaded"
  });

  await this.page.waitForTimeout(5000);
  
});

Given("the user opens a random BBC Sport article", async function () {
  this.currentArticle = await findArticleWithComments(this.page);
  await this.articlePage.open(this.currentArticle.articleUrl);
  await this.articlePage.waitForPageReady();
});

When("the user scrolls to the comments section", async function () {
  //await this.page.waitForTimeout(5000);
  //await this.articlePage.scrollToComments();
});

Then("the comments section should be visible", async function () {
  await expect.poll(async () => this.articlePage.isCommentsSectionVisible()).toBeTruthy();
});

Then('the page should display the text {string}', async function (expectedText) {
  await expect(this.page.getByText(expectedText, { exact: false }).first()).toBeVisible();
});

Then('the comments section should contain a {string} button', async function (buttonText) {
  const buttonMap = {
    "Sign in": () => this.articlePage.isSignInButtonVisible(),
    "Register": () => this.articlePage.isRegisterButtonVisible()
  };

  const buttonCheck = buttonMap[buttonText];
  await expect(buttonCheck, `Unsupported button text: ${buttonText}`).toBeDefined();
  await expect.poll(async () => buttonCheck()).toBeTruthy();
});

Then("the comments section should not be visible", async function () {
  console.log(`Checking that comments section is not visible...  ${await this.articlePage.isCommentsSectionVisible()}`);
  await expect(await this.articlePage.isCommentsSectionVisible()).toBeFalsy();
});

Given("the user signs in with a valid BBC account", async function () {
  return "Not Implemented";
});

Then("existing comments should be visible to the signed-in user", async function () {
  return "pending";
});

Then("the total number of comments should be displayed", async function () {
  return "pending";
});

Then('the comment sorting control should default to "Highest Rated"', async function () {
  return "pending";
});

Then("the page should not contain a comment area", async function () {
  return "pending";
});

Given("the user has an expired BBC account session", async function () {
  return "pending";
});

When("the user attempts to interact with the comments section", async function () {
  return "pending";
});

Then("the user should be redirected to the BBC sign-in page", async function () {
  return "pending";
});
