const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../model/User');

router.use(bodyParser.json());

router.get('/', async (req,res) => {
    try {
        const user = await User.find();
        res.status(200).json({
            status: "Success",
            data: user
        })
    } catch (e) {
        res.status(400).json({
            status: "Failed",
            message: e.message
        })
    }
})

/*
router.post('/', async (req,res) => {
    try {
        console.log(req.body)
        const user = await User.create(req.body);
        res.status(200).json({
            status: "Success",
            user
        })
    } catch (e) {
        res.status(400).json({
            status: "Failed",
            message: e.message
        })
    }
})
*/

module.exports = router;