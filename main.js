const express = require('express')
const path = require('path')
var ageFinder = require('./views/age')
// const { body, validationResult } = require('express-validator');


// Init App
const app = express()

// Load View Engine
app.use('/static', express.static(path.join(__dirname, 'views')))
app.set('view engine', 'pug')



// const MONTHSOptions = { "January": 1, "February": 2, "March": 3, "April": 4, "May": 5, "June": 6, "July": 7, "August": 8, "September": 9, "October": 10, "November": 11, "December": 12 };

// var inputYear = document.getElementById("inputYear").value;
// var inputMonth = document.getElementById("inputMonth").value;
// var inputDay = document.getElementById("inputDay").value;


// Home Route
app.get('/', (req, res) => {
    res.render('index')
})


// app.post('/', (req, res) => {
//     res.render('index')
// })

var PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
})

app.use(express.urlencoded({
    extended: true
}))

var numberWithCommas = (x) => {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

app.post('/:year/:month/:day', (req, res) => {
    var requestParams = req.params;
    let showTimes = false;

    let ts = Date.now();
    let date_ob = new Date(ts);
    var current_date = date_ob.getDate();
    var current_month = date_ob.getMonth() + 1;
    var current_year = date_ob.getFullYear();

    if (requestParams.year != "" && requestParams.month != "" && requestParams.day != "") {
        var [calculated_date, calculated_month, calculated_year, current_date, current_month, current_year, birthDay_date, today_date, days, YearWithMonths, YearsToMonths, restOfMonths, MonthsToWeeks, restOfWeeks, WeeksToDays, DaysToHours, HoursToMinutes, MinutesToSeconds, SecondsToMilliseconds, MillisecondsToMicroSeconds, MicroSecondsToNanoSeconds] = ageFinder.find_age(current_date, current_month, current_year, requestParams.day, requestParams.month, requestParams.year);
        showTimes = true;
        res.render('index', {
            showTimes: showTimes,
            age_years: calculated_year,
            age_months: calculated_month,
            age_days: calculated_date,
            yearsToMonths: YearsToMonths,
            restOfMonths: restOfMonths,
            monthsToWeeks: MonthsToWeeks,
            restOfWeeks: restOfWeeks,
            ageInDays: numberWithCommas(WeeksToDays),
            hours: numberWithCommas(DaysToHours),
            minutes: numberWithCommas(HoursToMinutes),
            seconds: numberWithCommas(MinutesToSeconds),
            milliseconds: numberWithCommas(SecondsToMilliseconds),
            microseconds: numberWithCommas(MillisecondsToMicroSeconds),
            nanoseconds: numberWithCommas(MicroSecondsToNanoSeconds)

        })
    } else {
        res.render('index')
    }

})

// app.post('/', (req, res) => {
//     var requestQuery = req.query
//     console.log(req.query.inputYear)
//     console.log(req.query.inputMonth)
//     console.log(req.query.inputDay)
//     // const inputRequest = req.body
//     var showResponseMessage = false
//     var ResponseMessage

//     if (requestQuery.inputYear == '') {
//         showResponseMessage = true
//         ResponseMessage = "missing Year"
//     } else if (requestQuery.inputDay == '') {
//         showResponseMessage = true
//         ResponseMessage = "missing Day"
//     } else if (requestQuery.inputDay > '28' && requestQuery.inputMonth == '2') {
//         showResponseMessage = true
//         ResponseMessage = "wrong day"

//     } else {
//         showResponseMessage = false
//         ResponseMessage = "Thank you"
//     }


//     console.log(requestQuery)
//     res.render('index', {
//         showMessage: showResponseMessage,
//         theMessage: ResponseMessage
//     })
// })


