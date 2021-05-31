const prompt = require('prompt-sync')();

function find_age(current_date, current_month, current_year, birth_date, birth_month, birth_year){
    var month = [31, 28, 31, 30, 31, 30, 31, 31, 30 ,31 ,30, 31];

    if (birth_date > current_date){
        current_month = current_month - 1;
        current_date = current_date + month[birth_month - 1]
    }

    if (birth_month > current_month){
        current_year = current_year - 1;
        current_month = current_month + 12;
    }

    var calculated_date = current_date - birth_date;
    var calculated_month = current_month - birth_month;
    var calculated_year = current_year - birth_year;

    console.log("Present Age");
    console.log(`Years: ${calculated_year}`);
    console.log(`Months: ${calculated_month}`);
    console.log(`Days: ${calculated_date}`);

    return [calculated_year, calculated_month, calculated_date];
}

let ts = Date.now();
let date_ob = new Date(ts);

var current_date = date_ob.getDate();
var current_month = date_ob.getMonth() +1;
var current_year = date_ob.getFullYear();

var birth_date = prompt('Enter your birth Day /dd/: ');
var birth_month = prompt('Enter your birth month /mm/: ');
var birth_year = prompt('Enter your birth year /yyyy/: ');

var [resultYear, resultMonth, resultDate] = find_age(current_date, current_month, current_year, birth_date, birth_month, birth_year);

var birthDay_date = new Date(`${birth_year}-${birth_month}-${birth_date}`);
var today_date = new Date(`${current_year}-${current_month}-${current_date}`)

var days = (today_date.getTime() - birthDay_date.getTime()) / 1000;
days /= (60 * 60 * 24);
days = Math.ceil(days);

var YearWithMonths = resultYear;


function getMonthANDDays(years){
  return {
    months: years * 12 + resultMonth,
    days: resultDate
  }
}

var splitMonthsAndDays = getMonthANDDays(YearWithMonths)

var YearsToMonths = parseInt(splitMonthsAndDays.months);
var restOfMonths = resultDate;

var MonthsToWeeks = Math.floor(days / 7)
var restOfWeeks = days % 7
var WeeksToDays = MonthsToWeeks * 7 + restOfWeeks;

function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

var DaysToHours = WeeksToDays * 24;
var DaysToHoursWithCommas = numberWithCommas(DaysToHours);

var HoursToMinutes = DaysToHours * 60;
var HoursToMinutesWithCommas = numberWithCommas(HoursToMinutes);

var MinutesToSeconds = HoursToMinutes * 60;
var MinutesToSecondsWithCommas = numberWithCommas(MinutesToSeconds);

var SecondsToMilliseconds = MinutesToSeconds * 1000;
var SecondsToMillisecondsWithCommas = numberWithCommas(SecondsToMilliseconds);

var MillisecondsToMicroSeconds = SecondsToMilliseconds * 1000;
var MillisecondsToMicroSecondsWithCommas = numberWithCommas(MillisecondsToMicroSeconds);

var MicroSecondsToNanoSeconds = MillisecondsToMicroSeconds * 1000;
var MicroSecondsToNanoSecondsWithCommas = numberWithCommas(MicroSecondsToNanoSeconds);

console.log(`or ${YearsToMonths} Months & ${restOfMonths} Days`);
console.log(`or ${MonthsToWeeks} Weeks & ${restOfWeeks} Days`);
console.log(`or ${numberWithCommas(WeeksToDays)} Days`);
console.log(`or ${DaysToHoursWithCommas} Hours`);
console.log(`or ${HoursToMinutesWithCommas} Minutes`);
console.log(`or ${MinutesToSecondsWithCommas} Seconds`);
console.log(`or ${SecondsToMillisecondsWithCommas} Milliseconds`);
console.log(`or ${MillisecondsToMicroSecondsWithCommas} Microseconds`);
console.log(`or ${MicroSecondsToNanoSecondsWithCommas} Nanoseconds`);
