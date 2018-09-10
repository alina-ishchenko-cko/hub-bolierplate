module.exports = {
  // - - - - GULP CHIMP SETTINGS - - - -
  path: './test/e2e/features',
  domainSteps: './test/e2e/specs',
  showXolvioMessages: false,
  timeout: 5000,
  port: 4455,
  format: 'pretty',
  tags: '~@ignore',
  tags: '@watch ',

  // - - - - GULP CHIMP CUCUMBER - - - -
  jsonOutput: './reports/json/cucumber.json',
  screenshotsOnError: true,
  screenshotsPath: './reports/screenshots',
  saveScreenshotsToDisk: true,
  saveScreenshotsToReport: true,

  // - - - - REPORTER - - - -
  theme: 'bootstrap',
  jsonFile: './reports/json/cucumber.json',
  output: './reports/html/cucumber.html',
  reportSuiteAsScenarios: true,
  launchReport: true,
};
