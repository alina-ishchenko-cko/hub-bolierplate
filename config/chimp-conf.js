const gutil = require('gulp-util');
const portSelenium = Math.floor(Math.random() * 5000) + 1000;
const portWebDriverio = Math.floor(Math.random() * 9000) + 1000;
const isLocalEnv = !!(process.env.CHIMP_CI === void 0);
gutil.log(
  'Selenium running in port:    ' + gutil.colors.bold.white.bgBlue(portSelenium)
);
gutil.log(
  'WebDriverio running in port: ' +
    gutil.colors.bold.white.bgBlue(portWebDriverio)
);
module.exports = {
  singleRun: true,
  debug: false,
  seleniumStandaloneOptions: {
    drivers: {
      chrome: { version: '2.30' },
    },
  },
  port: portSelenium,

  webdriverio: {
    desiredCapabilities: {
      chromeOptions: {
        prefs: {
          'profile.default_content_settings.popups': 0,
          'download.default_directory': 'test/e2e_downloads',
        },
        args: [
          'headless',
          'disable-gpu',
          'window-size=1920x1080',
          'no-sandbox',
        ],
      },
      isHeadless: true,
    },
    logLevel: 'silent',
    logOutput: './test/e2e_output/logs',
    port: portWebDriverio,
    coloredLogs: true,
    screenshotPath: './test/e2e_output/screenshots',
  },
  /*mocha : false,
      mochaConfig: {
    
            reporter: 'mochawesome',
            reporterOptions: {
                enableCode: false,
                autoOpen: true
            }
      },*/
  /*mocha: true,
    reporter: 'mochawesome',
	reporterOptions: {
		enableCode: false,
		autoOpen: false
    },*/
  //features: './test/e2e',
  path: './test/e2e/features',
  //reportHTML: true,
  domainSteps: './test/e2e/specs',
  format: 'pretty',
  tags: '~@ignore',
  // tags: '@watch ',
  //screenshotsOnError: true,
  //screenshotsPath: './test/e2e_output/screenshots',
  //jsonOutput: './test/e2e_output/cucumber.json',
  //htmlReport: true,
  //output: './test/e2e_output/report/cucumber.html',

  // For HTML Report
  //theme: 'bootstrap',
  //jsonFile: './test/e2e_output/cucumber.json',
  //reportSuiteAsScenarios: true,
  //launchReport: true,
  output: {
    screenshotsPath: './reports/screenshots',
    jsonOutput: './reports/cucumber.json',
  },
  htmlReport: {
    enable: isLocalEnv,
    jsonFile: './reports/cucumber.json',
    output: './reports/report/cucumber.html',
    reportSuiteAsScenarios: isLocalEnv,
    launchReport: isLocalEnv,
  },
};
