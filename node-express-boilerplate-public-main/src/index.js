const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000

app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// your code goes here

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('user.ejs', {msg})
    msg = {};
})

app.get('/add', (req, res) => {
    res.render('add.ejs', {msg})
    msg = {};
})

app.get('/sub', (req, res) => {
    res.render('sub.ejs', {msg})
    msg = {};
})

app.get('/multiply', (req, res) => {
    res.render('multiply.ejs', {msg})
    msg = {};
})

app.get('/divide', (req, res) => {
    res.render('divide.ejs', {msg})
    msg = {};
})

let msg = {};
app.post('/data', (req, res) => {
    let sum = parseFloat(req.body.num1) + parseFloat(req.body.num2);
    let product = parseFloat(req.body.num1) * parseFloat(req.body.num2);
    let diff = parseFloat(req.body.num1) - parseFloat(req.body.num2);
    let divide = parseFloat(req.body.num1) / parseFloat(req.body.num2);

    if (req.body.num1.match(/[^0-9,^.,^-]/g) !== null  || req.body.num1.match(/[^0-9,^.,^-]/g) !== null) {
        msg = {
            status: 'error',
            err: "Invalid data types"
        }
        res.redirect('/');

    } else if (parseFloat(req.body.num1) > 1000000 || parseFloat(req.body.num2) > 1000000) {
        msg = {
            status: 'error',
            err: "Overflow"
        }
        res.redirect('/');

    } else if (parseFloat(req.body.num1) < -1000000 || parseFloat(req.body.num2) < -1000000) {
        msg = {
            status: 'error',
            err: "Underflow"
        }
        res.redirect('/');

    } else if (parseFloat(req.body.num2) === 0 && req.body.action === 'divide') {
        msg = {
            status: 'error',
            err: "Cannot divide by zero"
        };
        res.redirect('/');

    } else {

        if(req.body.action === 'add') {
            console.log(sum);
            if (sum > 1000000) {
                msg = {
                    status: 'error',
                    reply: 'Overflow',
                    result: ''
                }

            } else if (sum < -1000000) {
                msg = {
                    status: 'error',
                    reply: 'Underflow',
                    result: ''
                }

            } else {
                msg = {
                    status: 'Success',
                    reply: 'The Sum of given two numbers',
                    result: sum
                }
            }
            res.redirect('/add');

        } else if(req.body.action === 'sub') {

            if (diff > 1000000) {
                msg = {
                    status: 'error',
                    reply: 'Overflow',
                    result: ''
                }

            } else if (diff < -1000000) {
                msg = {
                    status: 'error',
                    reply: 'Underflow',
                    result: ''
                }

            } else {
                msg = {
                    status: 'Success',
                    reply: 'The Difference of given two numbers',
                    result: diff
                }
            }
            res.redirect('/sub');

        } else if(req.body.action === 'multiply') {
            if (product > 1000000) {
                msg = {
                    status: 'error',
                    reply: 'Overflow',
                    result: ''
                }

            } else if (product < -1000000) {
                msg = {
                    status: 'error',
                    reply: 'Underflow',
                    result: ''
                }

            } else {
                msg = {
                    status: 'Success',
                    reply: 'The Product of given two numbers',
                    result: product
                }
            }
            res.redirect('/multiply');

        } else if(req.body.action === 'divide') {
            msg = {
                status: 'Success',
                reply: 'The Division of given two numbers',
                result: divide
            }
            res.redirect('/divide');
        }

    }
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;