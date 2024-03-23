import { test, expect } from 'hooks/fixtures';
import { setupGlobalHooks } from 'hooks/global-hooks';
import { CONTACT_FORM_ERROR_MESSAGES_EMAIL } from 'data/test.data';
import { UserModel } from 'models/user.model';

setupGlobalHooks();

test.describe('home page', () => {
    test('has title', async ({ page }) => {
        await expect(page).toHaveTitle(/Restful-booker-platform demo/);
    });

    test(
        'should able to fill and submit contact form without a valid email',
        { tag: '@test' },
        async ({ homePage }) => {
            const user: UserModel = new UserModel();

            await test.step('fill contact form without email', async () => {
                await homePage.setContactName(user);
                await homePage.setContactPhone(user);
                await homePage.setContactSubject(user);
                await homePage.setContactDescription(user);
            });

            await test.step('submit contact form', async () => {
                await homePage.clickSubmitButton();
            });

            await test.step('should display alert message', async () => {
                expect(await homePage.getAlertMessage()).toContain(CONTACT_FORM_ERROR_MESSAGES_EMAIL);
            });
        },
    );
});
