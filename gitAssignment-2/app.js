const express = require('express');
const mongoose = require('mongoose');
const loginRoute = require('./routes/login');
const userRoute = require('./routes/user'); 
const postRoute = require('./routes/post');
const jwt = require('jsonwebtoken');
const secret = 'SECRET';

mongoose.connect("mongodb://localhost:27017/git-assignmet-2")
    .then(console.log('mongodb is ready'))
    .catch(console.error())

const app = express();

app.use(express.static('images'))

app.use('/v1/posts', (req, res, next) => {

    try {
        const token = req.headers.authorization;
        console.log(token);
        if(token) {
            jwt.verify(token, secret, (err, decoded) => {
                if(err) {
                    res.status(400).json({
                        status: "Failed",
                        message: err.message
                    })
                }

                if(decoded) {
                    req.user = decoded.data;
                    next();
                }
            })
        } else {
            res.status(400).json({
                status: "Failed",
                message: "Invalid Token"
            })
        }
    } catch (e) {
        res.status(400).json({
            status: "Failed",
            message: e.message
        })
    }
})

app.use('/v1', loginRoute);
app.use('/v1/users', userRoute);
app.use('/v1/posts', postRoute)

app.get('/', (req, res) => {
    try {
        res.status(200).send("Hello, welcome to assignment-2")
    } catch (e) {
        res.status(400).json({
            status: "Failed",
            message: e.message
        })
    }
})

app.listen(3000, () => console.log("Server is up at 3000 port"))