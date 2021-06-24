var find_age = (current_date, current_month, current_year, birth_date, birth_month, birth_year) => {

    var month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (birth_date > current_date) {
        current_month = current_month - 1;
        current_date = current_date + month[birth_month - 1]
    }

    if (birth_month > current_month) {
        current_year = current_year - 1;
        current_month = current_month + 12;
    }

    var calculated_date = current_date - birth_date;
    var calculated_month = current_month - birth_month;
    var calculated_year = current_year - birth_year;

    let ts = Date.now();
    let date_ob = new Date(ts);

    var current_date = date_ob.getDate();
    var current_month = date_ob.getMonth() + 1;
    var current_year = date_ob.getFullYear();


    var birthDay_date = new Date(`${birth_year}-${birth_month}-${birth_date}`);
    var today_date = new Date(`${current_year}-${current_month}-${current_date}`)

    var days = (today_date.getTime() - birthDay_date.getTime()) / 1000;
    days /= (60 * 60 * 24);
    days = Math.ceil(days);

    var YearWithMonths = calculated_year;

    function getMonthANDDays(years) {
        return {
            months: years * 12 + calculated_month,
            days: calculated_date
        }
    }

    var splitMonthsAndDays = getMonthANDDays(YearWithMonths)

    var YearsToMonths = parseInt(splitMonthsAndDays.months);
    var restOfMonths = calculated_date;

    var MonthsToWeeks = Math.floor(days / 7)
    var restOfWeeks = days % 7
    var WeeksToDays = MonthsToWeeks * 7 + restOfWeeks;

    var DaysToHours = WeeksToDays * 24;

    var HoursToMinutes = DaysToHours * 60;

    var MinutesToSeconds = HoursToMinutes * 60;

    var SecondsToMilliseconds = MinutesToSeconds * 1000;

    var MillisecondsToMicroSeconds = SecondsToMilliseconds * 1000;

    var MicroSecondsToNanoSeconds = MillisecondsToMicroSeconds * 1000;

    return [calculated_date, calculated_month, calculated_year, current_date, current_month, current_year, birthDay_date, today_date, days, YearWithMonths, YearsToMonths, restOfMonths, MonthsToWeeks, restOfWeeks, WeeksToDays, DaysToHours, HoursToMinutes, MinutesToSeconds, SecondsToMilliseconds, MillisecondsToMicroSeconds, MicroSecondsToNanoSeconds]
}

function changeBtnName() {
    var elem = document.getElementById("showMoreLessBtn");
    if (elem.value == "Show Less") {
        elem.value = "Show More"
    } else {
        elem.value = "Show Less"
    };
}

function ageCalculator() {
    //collect input from HTML form and convert into date format
    var dob_Year = document.getElementById("dobyear").value;
    var dob_Month = document.getElementById("dobmonth").value;
    var dob_Day = document.getElementById("dobday").value;

    var dob = new Date(`${dob_Year}/${dob_Month}/${dob_Day}`);
    var msg = document.getElementById("message");

    //check user provide input or not
    if (dob_Year == null || dob_Year == '') {
        msg.innerHTML = "Please provide your Birth Year";
        setTimeout(() => { msg.innerHTML = "" }, 3000)
        return false;
    } else if (dob_Day == null || dob_Day == '') {
        msg.innerHTML = "Please provide your Birth Day";
        setTimeout(() => { msg.innerHTML = "" }, 3000)
        return false;
    }

    //execute if the user entered a date 
    else {
        //extract the year, month, and date from user date input
        var dobYear = dob.getFullYear();
        var dobMonth = dob.getMonth() + 1;
        var dobDate = dob.getDate();

        // console.table({"Year": dobYear, "Month":dobMonth, "Day": dobDate})

        //get the current date from the system
        let ts = Date.now();
        var now = new Date(ts);

        //extract the year, month, and date from current date
        var currentYear = now.getFullYear();
        var currentMonth = now.getMonth() + 1;
        var currentDate = now.getDate();

        var birthDay_date = new Date(`${dobMonth}/${dobDate}/${dobYear}`);
        var today_date = new Date(`${currentMonth}/${currentDate}/${currentYear}`);


        var Difference_In_Time = today_date.getTime() - birthDay_date.getTime();
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

        //declare a variable to collect the age in year, month, and days
        var age = {};
        var ageString = "";

        //get years
        yearAge = currentYear - dobYear;

        //get months
        if (currentMonth >= dobMonth)
            //get months when current month is greater
            var monthAge = currentMonth - dobMonth;
        else {
            yearAge--;
            var monthAge = 12 + currentMonth - dobMonth;
        }

        //get days
        if (currentDate >= dobDate)
            //get days when the current date is greater
            var dateAge = currentDate - dobDate;
        else {
            monthAge--;
            var dateAge = 31 + currentDate - dobDate;

            if (monthAge < 0) {
                monthAge = 11;
                yearAge--;
            }
        }
        //group the age in a single variable
        age = {
            years: yearAge,
            months: monthAge,
            days: dateAge,
            daysAge: Difference_In_Days
        };

        if ((age.years > 0) && (age.months > 0) && (age.days > 0))
            ageString = age.years + " years, " + age.months + " months, and " + age.days + " days old.";
        else if ((age.years == 0) && (age.months == 0) && (age.days > 0))
            ageString = "Only " + age.days + " days old!";
        //when current month and date is same as birth date and month
        else if ((age.years > 0) && (age.months == 0) && (age.days == 0))
            ageString = age.years + " years old. Happy Birthday!! 🎂";
        else if ((age.years > 0) && (age.months > 0) && (age.days == 0))
            ageString = age.years + " years and " + age.months + " months old.";
        else if ((age.years == 0) && (age.months > 0) && (age.days > 0))
            ageString = age.months + " months and " + age.days + " days old.";
        else if ((age.years > 0) && (age.months == 0) && (age.days > 0))
            ageString = age.years + " years, and" + age.days + " days old.";
        else if ((age.years == 0) && (age.months > 0) && (age.days == 0))
            ageString = age.months + " months old.";
        //when current date is same as dob(date of birth)
        else ageString = "Welcome to Earth! <br> It's first day on Earth! 👶";

        var [calculated_date, calculated_month, calculated_year, current_date, current_month, current_year, birthDay_date, today_date, days, YearWithMonths, Months, restOfMonths, Weeks, restOfWeeks, Days, Hours, Minutes, Seconds, Milliseconds, MicroSeconds, NanoSeconds] = find_age(currentDate, currentMonth, currentYear, dobDate, dobMonth, dobYear);


        var numberWithCommas = (x) => {
            return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        }

        //display the calculated age
        document.getElementById("result").innerHTML = `<h1 style="font-size: 32px; font-family: 'Playfair Display', serif;">${ageString}</h1>`;

        document.getElementById("more-result").innerHTML = "";
        document.getElementById("moreStuff").innerHTML = "";

        var contents = [`Or ${numberWithCommas(Months)} Months and ${age.days} Days`, `Or ${numberWithCommas(Weeks)} Weeks and ${restOfWeeks} Days`, `Or ${numberWithCommas(age.daysAge)} days`, `Or ${numberWithCommas(Hours)} Hours`, `Or ${numberWithCommas(Minutes)} Minutes`, `Or ${numberWithCommas(Seconds)} Seconds`]
        var moreStuffList = [`Or ${numberWithCommas(Milliseconds)} MilliSeconds`, `Or ${numberWithCommas(MicroSeconds)} MicroSeconds`, `Or ${numberWithCommas(NanoSeconds)} NanoSeconds`]


        for (i = 0; i < contents.length; i++) {
            var tag = document.createElement("h3");
            var text = document.createTextNode(contents[i]);
            tag.appendChild(text)
            var element = document.getElementById("more-result");
            element.appendChild(tag);
        }

        for (i = 0; i < moreStuffList.length; i++) {
            var tag = document.createElement("h5");
            var text = document.createTextNode(moreStuffList[i]);
            tag.appendChild(text)
            var element = document.getElementById("moreStuff");
            element.appendChild(tag);
        }
        document.getElementById("moreStuffAria").hidden = false;

    }

}
