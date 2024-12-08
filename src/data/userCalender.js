import MonthlyCycle from "./monthlyCycle";
export default class UserCalender {
    constructor(email) {
        this.user = email;
        this.cycles = [];      
    }

    addCycle(firstBld) {
        this.cycles.push(new MonthlyCycle(firstBld, 5));//get user and the amount of days counted
        this.cycles.sort((a, b) => a.firstBld - b.firstBld);
    }
}