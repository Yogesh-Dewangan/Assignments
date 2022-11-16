const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const bodyParser = require('body-parser');
const User = require('../model/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = 'SECRET';

router.use(bodyParser.json());

router.post('/register', body('email').isEmail(), body('name').isAlpha(), body('password').isLength({min: 6, max: 16}), async (req,res) => {
    
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty) {
            res.status(400).json({
                errors: errors.array
            })
        }

        const {name, email, password} = req.body;

        let user = await User.findOne({email});

        if(user) {
            return res.status(400).json({
                status: "Failed",
                message: "Email already exists"
            })
        }

        bcrypt.hash(password, 10, async (err, hash) => {
            if(err) {
                res.status(400).json({
                    status: "Failed",
                    message: err.message
                })
            }

            user = await User.create({
                name,
                email,
                password: hash
            })

            return res.status(200).json({
                status: "Success",
                user
            })
        })


    } catch (e) {
        res.status(400).json({
            status: "Failed",
            message: e.message
        })
    }
})

router.post('/login', body('email').isEmail(), async (req,res) => {

    try {
        const errors = validationResult(req);
        if(!errors.isEmpty) {
            return res.status(400).json({
                errors: errors.array
            })
        }

        const {email, password} = req.body;

        let user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({
                status: "Failed",
                message: "User Does not Exists"
            })
        }

        bcrypt.compare(password, user.password, async (err, result) => {
            if(err) {
                return res.status(400).json({
                    status: "Failed",
                    message: err.message
                })
            }
            if(result) {
                const token = jwt.sign({
                    exp: Math.floor(Date.now()/1000) + (60*60),
                    data: user._id
                }, secret)

                return res.status(200).json({
                    status: "Success",
                    message: "Login Successful",
                    token
                })
            } else {
                return res.status(400).json({
                    status: "Failed",
                    message: "Invalid credential! Please provide valid email/passward"
                })
            }
        })

    } catch (e) {
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
})

module.exports = router;