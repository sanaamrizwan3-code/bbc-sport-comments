module.exports = {
  default: {
    paths: [
      "features/automated/**/*.feature"
    ],
    require: [
      "step-definitions/hooks.js",
      "step-definitions/comments.steps.js"
    ],
    format: [
      "progress-bar",
      "html:reports/cucumber-report.html",
      "json:reports/cucumber-report.json"
    ],
    publishQuiet: true
  },
  manual: {
    paths: [
      "features/manual/**/*.feature"
    ],
    require: [
      "step-definitions/hooks.js",
      "step-definitions/comments.steps.js"
    ],
    format: [
      "progress-bar"
    ],
    tags: "@manual",
    publishQuiet: true
  }
};
