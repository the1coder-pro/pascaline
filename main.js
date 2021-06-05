const express = require('express')
const path = require('path')


// Init App
const app = express()

// Load View Engine
// app.use('/static', express.static(path.join(__dirname, 'views')))
// app.set('view engine', 'pug')

// app.use(express.static('public'))


// Home Route
app.get('/', (req, res) => {
    res.sendFile('home.html', { root: path.join(__dirname, './views') });
})

var PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
})

app.use(express.urlencoded({
    extended: true
}))
