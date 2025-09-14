/** Playwright config for basic UAT flows (example) */
module.exports = {
  timeout: 30000,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000,
    ignoreHTTPSErrors: true
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } }
  ],
  testDir: 'playwright-tests'
}
