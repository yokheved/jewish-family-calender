import { jDate } from "jcal-zmanim";

export default class MonthlyCycle {
    //all dates are jDate objects
    /**
     * @param { jDate } firstBld
     * @param { number } countDaysToHefsek
     */
    constructor(firstBld, countDaysToHefsek) {
        this._firstBld = firstBld;
        this._firstHefsek = firstBld.addDays(countDaysToHefsek);
        this._goodHefsek = undefined;
        this._firstCheck = undefined;
        this._lastCheck = undefined;
        this._mikvaNight = undefined;
        this._prisha = undefined;
    }

    /**
     * @param { jDate } value
     */
    set goodHefsek(value) {
        //check if the value is jdate type
        if(!(value instanceof jDate)) {
            throw new Error("Value must be of type jDate");
        }
        if(value < this._firstHefsek) {
            throw new Error("Hefsek Tahara must be after the first Hefsek option");
        }
        this._goodHefsek = value;
        this._firstCheck = value.addDays(1);
        this._lastCheck = value.addDays(7);
        this._mikvaNight = value.addDays(8);//the night after the last check, the night begining the 8th day!!!
    }
}