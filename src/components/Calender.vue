<template>
  <div class="Calender">
    <p>Today's Hebrew Date: {{ hebrewDate }}</p>
    <h1>Yearly Calendar</h1>
    <table>
      <thead>
        <tr>
          <th class="month-header">{{ toHebrewNumber(jYear) }}</th>
          <th v-for="(day, index) in filledDaysOfWeek" :key="index">{{ daysOfWeek[index%7] }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(month, monthIndex) in months" :key="monthIndex">
          <td class="th">{{ month }}</td>
          <!-- Days of the week for the month -->
          <td v-for="(day, index) in getMonthDaysHebrow(monthIndex)" :key="index">
            <Date :date="day" />
          </td>
          <!-- Label for the month -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { jDate } from 'jcal-zmanim';
import Date from './Date.vue';
import { jgDate } from '../data/date';

export default {
  name: "Calender",
  data() {
    return {
      hebrewDate: null,
      daysOfWeek: ["א", "ב", "ג", "ד", "ה", "ו", "ש"],
      months: [
        "תשרי", "חשון", "כסלו", "טבת", "שבט", "אדר",
        "ניסן", "אייר", "סיון", "תמוז", "אב", "אלול",
      ],
      monthsG: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ],
    };
  },
  props: {
    jYear: String,
  },
  components: {
    Date,
  },
  created() {
    const hdate = jDate.now(); // Convert to Hebrew date
    this.hebrewDate = hdate.toString(); // Get the date in readable format
    if (jDate.isJdLeapY(this.jYear)) {
      console.log("Leap year");
      this.months[5] = "אדר א"; // Change Adar to Adar Alef for leap years
      this.months.splice(6, 0, "אדר ב"); // Add Adar Bet for leap years
    } // Add Adar Bet for leap years
  },
  computed: {
    filledDaysOfWeek() {
      // Create an array of length 35
      return Array.from({ length: 36 }, (_, i) => i);
    }
  },
  methods: {
    toHebrewNumber(number) {
      return new jgDate().toHebrewNumber(number);
    },
    getMonthDaysHebrow(monthIndex) {
      const jYear = Number(this.jYear) ?? jDate.now().Year; // Current Hebrew year
      console.log(jYear);
      let month = (monthIndex + 7) % (jDate.isJdLeapY(jYear) ? 13 : 12); // Convert to Hebrew month
      month === 0 ? month = jDate.isJdLeapY(jYear) ? 13 : 12 : null;
      return jgDate.getMonthDaysHebrow(jYear, month);
    },
  },
};
</script>

<style scoped>
.calendar {
  margin: 20px;
  font-family: Arial, sans-serif;
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: auto;
}

th,
td {
  border: 1px solid #ddd;
  padding: 2px;
  text-align: center;
}

.month-header, th, .th {
  background-color: #f0f0f0;
  font-weight: bold;
  text-align: center;
  border: none;
}

</style>