<template>
    <div :class="hasEvent(date)">
        <p :class="{ 'smallFont': this.date.day === 1 }">
            {{ date.day !== 0 ? date.day : "" }} {{ date.day == 1 ? date.gMonthName : "" }}
        </p>
        <p>{{ date.jDay !== 0 ? date.jDayName : "" }}</p>
        <p class="smallFont">{{ date.dayOfWeek === 6 ? getParasha(date) : "" }}</p>
    </div>
</template>

<script>
import {jDate} from 'jcal-zmanim';
export default {
    props: {
        date: Object,
    },
    methods: {
        hasEvent(day) {
            // Example logic to add events (you can customize this)
            let event = "";
            const jD = new jDate(day.jYear, day.jMonth, day.jDay);
            if (jD.isErevYomTov()) {
                event += "ErevYomTov";
            } else if (jD.isYomTov()) {
                event += "YomTov";
            } else if (jD.getDayOfWeek() === 6) {
                event += "Shabbos";
            } else if (jD.isYomTovOrCholHamoed()) {
                event += "CholHamoed";
            } else if (day.jDay ==30 || day.jDay == 1) {
                event += "RoshChodesh";
            }
            return event;
        },
        getParasha(day) {
            let par = day.parasha;
            console.log(par);
            return par;
        }
    }
}
</script>

<style scoped>
div{
    width: 35px;
    height: 100%;
    margin: 0;
}
p{
    margin: 0;
    text-align: center;
}
.smallFont{
    font-size: 12px;
}
.Shabbos{
    background-color: #f5e4ac;
}
.ErevYomTov{
    background-color: #fccee3;
}
.YomTov{
    background-color: #fda1ca;
}
.CholHamoed{
    background-color: #f8b0e8;
}
.RoshChodesh{
    background-color: #c5dafa;
}
</style>