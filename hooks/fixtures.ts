import { Page, test as base } from '@playwright/test';

import { HomePage } from 'pages/home.page';

declare global {
    const page: Page;
    const expect: typeof base.expect;
    const test: typeof base;
}

type pages = {
    homePage: HomePage;
};

const basePage = base.extend<{
    page: Page;
}>({
    page: async ({ browser }, use) => {
        await use(await browser.newPage());
    },
});

const testPages = base.extend<pages>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
});

export const page = basePage;
export const test = testPages;
export const expect = testPages.expect;
