// @ts-check
const { defineConfig,devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  projects:[
    {name: 'chrome',
        use: {

            Name:'chromium',
            launchOptions: {
              //args: ['--ignore-certificate-errors'],
              executablePath: 'C:/Users/SEDHU/Downloads/chromium-win64/chrome-win/chrome.exe'
              //'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' // Replace with your path
            },
            trace: 'on',
    screenshot: 'on',
    headless: false,
    ignoreHTTPSErrors: true

    }
},
    {name: 'edge',
        use: {

            Name:'Microsoft Edge',
            launchOptions: {
              //args: ['--ignore-certificate-errors'],
              executablePath: //'C:/Users/SEDHU/Downloads/chromium-win64/chrome-win/chrome.exe'
              'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' // Replace with your path
            },
            trace: 'on',
    screenshot: 'on',
    headless: false,
    ignoreHTTPSErrors: true,
   // ...devices['Galaxy Note II landscape']
    

    }
}]
 
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
 
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    
    

});
//use npx playwright codegen --channel chrome https://google.com to run codegen test runner tool
// use npx playwright test ./tests/selectDropdown.spec --debug to run in debug mode
//npx playwright test tests/clientapp.spec.js --config playwright.config1.js - used to run tests with custom config file
//npx playwright test tests/clientapp.spec.js --config playwright.config1.js --project=edge- run tests for particular project

