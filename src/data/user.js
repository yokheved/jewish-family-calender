import UserCalender from "./userCalender";
export default class User {
    constructor(params) {
        this.name = params.name;
        this.email = params.email;
        this._password = params.password;
        this.calender = new UserCalender(params.email);
    }

    set password({value, confirm}) {
        if(value !== confirm) {
            throw new Error("Passwords do not match");
        }
        if(value.length < 4) {
            throw new Error("Password must be at least 4 characters long");
        }
        this._password = value;
    }

    checkPassword(password) {
        return this._password === password;
    }
}