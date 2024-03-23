import { test } from 'hooks/fixtures';

export const setupGlobalHooks = async () => {
    test.beforeEach(async ({ page, baseURL }) => {
        await test.step('Navigate to Automation in test Home Page', async () => {
            await page.goto(baseURL);
            await page.waitForLoadState('domcontentloaded');
        });
    });
};
