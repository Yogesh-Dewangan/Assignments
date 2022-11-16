const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Post = require('../model/Post');

router.use(bodyParser.json());

router.get('/', (req, res) => {
    try {
        const post = Post.find();
        res.status(200).json({
            status: "Success",
            data: post
        })
    } catch(e) {
        res.status(400).json({
            status: "Failed",
            message: e.message
        })
    }
})

router.post('/', (req, res) => {
    try {
        const post = Post.create();
        res.status(200).json({
            status: "Success",
            post
        })
    } catch(e) {
        res.status(400).json({
            status: "Failed",
            message: e.message
        })
    }
})

router.put('/:id', (req, res) => {
    try {
        const post = Post.updateOne({_id: req.params.id}, req.body);
        res.status(200).json({
            status: "Success",
            post
        })
    } catch(e) {
        res.status(400).json({
            status: "Failed",
            message: e.message
        })
    }
})

router.delete('/:id', (req, res) => {
    try {
        const post = Post.delete({_id: req.params.id});
        res.status(200).json({
            status: "Success",
            message: "Post deleted"
        })
    } catch(e) {
        res.status(400).json({
            status: "Failed",
            message: e.message
        })
    }
})

module.exports = router;