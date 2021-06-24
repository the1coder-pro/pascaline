const express = require('express')
const path = require('path')


// new edit

// Init App
const app = express()

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
