import { BaseModel } from "./Base.Model";

export class User extends BaseModel {
    _id?: string;
    name: string;
    email: string;
    password: string;

    constructor(name: string, email: string, password: string) {
        super();
        this.name = name;
        this.email = email;
        this.password = password;
    }
}