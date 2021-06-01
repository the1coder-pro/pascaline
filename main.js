const express = require('express')
const path = require('path')
const { body, validationResult } = require('express-validator');


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


app.get('/:year/:month/:day', (req, res) => {
    res.send(req.params)
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


