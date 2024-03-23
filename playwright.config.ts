import { defineConfig } from '@playwright/test';
import path from 'path';

import { BASE_URL } from 'config/base.config';

export default defineConfig({
    testDir: path.resolve(__dirname, 'tests'),
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    preserveOutput: 'failures-only',
    outputDir: path.resolve(__dirname, 'target'),
    reporter: [
        ['github'],
        ['list', { printSteps: true }],
        ['html', { outputFolder: path.resolve(__dirname, 'html'), open: 'never' }],
    ],
    timeout: 1 * 60 * 1000,
    expect: {
        timeout: 0.5 * 60 * 1000,
    },
    use: {
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        baseURL: BASE_URL,
        trace: 'retain-on-failure',
        video: 'retain-on-failure',
        screenshot: { mode: 'only-on-failure', fullPage: true },
        headless: true,
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'Browser Tests',
            use: {
                viewport: null,
                browserName: 'chromium',
                channel: 'chrome',
                launchOptions: {
                    args: ['--start-maximized', '--start-in-incognito', '--disable-infobars', '--no-sandbox'],
                },
            },
        },
    ],
});
