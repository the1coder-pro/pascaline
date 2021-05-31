const express = require('express')
const path = require('path')
const { body, validationResult } = require('express-validator');


// Init App
const app = express()

// Load View Engine
app.use('/static', express.static(path.join(__dirname, 'views')))
app.set('view engine', 'pug')

// const MONTHSOptions = { "January": 1, "February": 2, "March": 3, "April": 4, "May": 5, "June": 6, "July": 7, "August": 8, "September": 9, "October": 10, "November": 11, "December": 12 };

// Home Route
app.get('/', (req, res) => {
    res.render('index')
})

const port = 3000

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
})

app.use(express.urlencoded({
    extended: true
}))

app.post('/result', (req, res) => {
    const inputRequest = req.body
    var showResponseMessage = false
    var ResponseMessage
    if (inputRequest.inputYear == '') {
        showResponseMessage = true
        ResponseMessage = "missing Year"
    } else if (inputRequest.inputDay == '') {
        showResponseMessage = true
        ResponseMessage = "missing Day"

    } else if (inputRequest.inputDay > '28' && inputRequest.inputMonth == '2') {
        showResponseMessage = true
        ResponseMessage = "wrong day"

    } else {
        showResponseMessage = false
        ResponseMessage = "Thank you"
    }


    console.log(inputRequest)
    res.render('index', {
        showMessage: showResponseMessage,
        theMessage: ResponseMessage
    })
})


