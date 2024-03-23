import { faker } from '@faker-js/faker';

export class UserModel {
    private firstname: string;
    private lastname: string;
    private email: string;
    private phone: string;
    private subject: string;
    private message: string;

    constructor() {
        this.firstname = faker.person.firstName();
        this.lastname = faker.person.lastName();
        this.email = faker.internet.email();
        this.phone = faker.phone.number();
        this.subject = faker.word.words(3);
        this.message = faker.word.words(20);
    }

    public setFirstname(): string {
        return this.firstname;
    }

    public setLastname(): string {
        return this.lastname;
    }

    public setEmail(): string {
        return this.email;
    }

    public setPhoneNumber(): string {
        return this.phone;
    }

    public setSubject(): string {
        return this.subject;
    }

    public setMessage(): string {
        return this.message;
    }
}
