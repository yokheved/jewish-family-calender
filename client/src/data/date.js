import { jDate } from "jcal-zmanim";
export class jgDate {
    constructor(params) {
        // Initialize all properties to default values
        this.jYear = 0;
        this.jMonth = 0;
        this.jDay = 0;
        this.year = 0;
        this.month = 0;
        this.day = 0;
        this.dayOfWeek = 0;

        // Check the type of params to determine initialization
        if (params) {
            if (params.jYear && params.jMonth && params.jDay) {
                // Hebrew date initialization
                this.jYear = params.jYear;
                this.jMonth = params.jMonth;
                this.jDay = params.jDay;

                const gDate = jDate.sdFromAbs(jDate.absJd(params.jYear, params.jMonth, params.jDay));
                this.year = gDate.getFullYear();
                this.month = gDate.getMonth() + 1;
                this.day = gDate.getDate();
                this.dayOfWeek = gDate.getDay();
            } else if (params.year && params.month && params.day) {
                // Gregorian date initialization
                const jeDate = jDate.toJDate(params);
                this.jYear = jeDate.Year;
                this.jMonth = jeDate.Month;
                this.jDay = jeDate.Day;
                this.year = params.year;
                this.month = params.month;
                this.day = params.day;
                this.dayOfWeek = jeDate.DayOfWeek;
            }
        }
    }

    get jDayName() {
        return this.toHebrewNumber(this.jDay);
    }

    get jMonthName() {
        return this.toHebrewMonth(this.jMonth, this.jYear);
    }

    get jYearName() {
        return this.toHebrewNumber(this.jYear);
    }

    get gMonthName() {
        return this.toGMonth(this.month);
    }

    get parasha() {
        let jD = new jDate(this.jYear, this.jMonth, this.jDay);
        let par = jD.getSedra().toStringHeb();
        while(jD.getDayOfWeek() !== 6) {
            jD = jD.addDays(1);
        }
        if(jD.isYomTov()){
            par = "";
        }
        return par;
    }

    static getMonthDaysHebrow(jYear, month) {
        const jDaysInMonth = jDate.daysJMonth(jYear, month); // Hebrew days in the month
        const jFirstDay = new jDate(jYear, month).getDayOfWeek(); // Hebrew day of the week for the 1st
        // Initialize days array with empty slots for alignment
        const days = Array(jFirstDay).fill(new jgDate());

        // Loop through each day of the month
        for (let day = 1; day <= jDaysInMonth; day++) {
            const hebrewDate = new jgDate({ jYear: jYear, jMonth: month, jDay: day }); // Convert to Hebrew date
            // Add the date to the array
            days.push(hebrewDate);
        }

        // Fill the remaining slots with empty spaces to complete the week
        while (days.length / 7 <= 5 || days.length % 7 !== 1) {
            days.push(new jgDate());
        }

        return days;
    }

    toHebrewNumber(num) {
        if (num < 1 || num > 10000) {
            throw new Error("Number out of range (1–10,000)");
        }

        const units = ["", "א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט"];
        const tens = ["", "י", "כ", "ל", "מ", "נ", "ס", "ע", "פ", "צ"];
        const hundreds = ["", "ק", "ר", "ש", "ת"];
        const thousands = ["", "א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ז׳", "ח׳", "ט׳"];

        let result = "";

        // Handle thousands (1000–9000)
        if (num >= 1000) {
            const thousandPart = Math.floor(num / 1000);
            result += thousands[thousandPart];
            num %= 1000; // Remove thousands
        }

        // Handle hundreds (100–900)
        if (num >= 100) {
            while (num / 100 >= 5) {
                result += "ת";
                num -= 400; // Remove hundreds
            }
            const hundredPart = Math.floor(num / 100);
            result += hundreds[hundredPart];
            num %= 100; // Remove hundreds
        }

        // Handle special cases for 15 and 16
        if (num === 15) {
            result += "טו";
            return result;
        }
        if (num === 16) {
            result += "טז";
            return result;
        }

        // Handle tens (10–90)
        if (num >= 10) {
            const tenPart = Math.floor(num / 10);
            result += tens[tenPart];
            num %= 10; // Remove tens
        }

        // Handle units (1–9)
        if (num > 0) {
            result += units[num];
        }

        return result;
    }

    toHebrewMonth(month, year) {
        let months = [
            "תשרי", "חשון", "כסלו", "טבת", "שבט", "אדר",
            "ניסן", "אייר", "סיון", "תמוז", "אב", "אלול",
        ]
        if (jDate.isJdLeapY(year)) {
            months[5] = "אדר א"; // Change Adar to Adar Alef for leap years
            months.splice(6, 0, "אדר ב"); // Add Adar Bet for leap years
        }
        return months[month - 1];
    }

    toGMonth(month) {
        return [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ][month - 1];
    }
}