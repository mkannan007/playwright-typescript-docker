import { Page } from '@playwright/test';

import { UserModel } from 'models/user.model';

export class HomePage {
    protected readonly page: Page;
    protected locators: {
        contactNameTextField: string;
        contactEmailTextField: string;
        contactPhoneTextField: string;
        contactSubjectTextField: string;
        contactDescriptionTextField: string;
        submitButton: string;
        alertMessage: string;
    };

    constructor(page: Page) {
        this.page = page;
        this.locators = {
            contactNameTextField: 'ContactName',
            contactEmailTextField: 'ContactEmail',
            contactPhoneTextField: 'ContactPhone',
            contactSubjectTextField: 'ContactSubject',
            contactDescriptionTextField: 'ContactDescription',
            submitButton: 'Submit',
            alertMessage: '.alert-danger',
        };
    }

    public async setContactName(user: UserModel): Promise<void> {
        return await this.page
            .getByTestId(this.locators.contactNameTextField)
            .fill(`${user.setFirstname()} ${user.setLastname()}`);
    }

    public async setContactEmail(user: UserModel): Promise<void> {
        return await this.page.getByTestId(this.locators.contactEmailTextField).fill(user.setEmail());
    }

    public async setContactPhone(user: UserModel): Promise<void> {
        return await this.page.getByTestId(this.locators.contactPhoneTextField).fill(user.setPhoneNumber().toString());
    }

    public async setContactSubject(user: UserModel): Promise<void> {
        return await this.page.getByTestId(this.locators.contactSubjectTextField).fill(user.setSubject());
    }

    public async setContactDescription(user: UserModel): Promise<void> {
        return await this.page.getByTestId(this.locators.contactDescriptionTextField).fill(user.setMessage());
    }

    public async clickSubmitButton(): Promise<void> {
        return await this.page.getByRole('button', { name: this.locators.submitButton, exact: true }).click();
    }

    public async getAlertMessage(): Promise<string[]> {
        await this.page.locator(this.locators.alertMessage).waitFor({ state: 'visible' });
        return await this.page.locator(this.locators.alertMessage).allTextContents();
    }
}
