import { createHmac } from 'crypto';

export class Encryptor {
    private plainPassword: string;

    constructor(password: string) {
        this.plainPassword = password;
    }

    encrypt(): string {
        return createHmac("sha256", "mah10mou11ddo7ha2mam19dou97hshe19ri98f")
            .update(this.plainPassword).digest("base64");
    }
}