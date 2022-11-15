const router = require('express').Router();
const Blog = require('../models/Blog');
const bodyParser = require('body-parser');

// Your routing code goes here
router.use(bodyParser.json());

async function main() {
    /*
    router.get('/blog', async (req,res)=>{
        
        // console.log(req.query);

        try {
            const blog = await Blog.find();
            res.status(200).json({
                status: 'Success',
                data: blog
            })
        } catch(e) {
            res.status(500).json({
                status: 'Failure',
                message: e.message
            })
        }
        
    })
    */

    router.get('/blog', async (req,res)=>{
        console.log('query params =>', req.query);
        const page = req.query.page || 0;
        const blogsPerPage = 5;
        const search = req.query.search;
        try {
            const blog = await Blog.find({topic: search}).skip(page * blogsPerPage).limit(blogsPerPage);
            // console.log('blog =>', blog);
            res.status(200).json({
                status: 'Success',
                data: blog
            })
        } catch(e) {
            res.status(500).json({
                status: 'Failure',
                message: e.message
            })
        }
        
    })

    router.post('/blog', async (req, res)=>{

        try {
            const blog = await Blog.create(req.body);
            console.log(req.body);
            res.status(200).json({
                status: 'Success',
                blog
            })
        } catch(e) {
            res.status(500).json({
                status: 'Failure',
                message: e.message
            })
        }
        
    })

    router.put('/blog/:id', async (req,res)=>{

        try {
            const blog = await Blog.findOneAndUpdate({_id: req.params.id}, req.body);
            res.status(200).json({
                status: "Success",
                blog
            })
        } catch(e) {
            res.status(500).json({
                status: "Failure",
                message: e.message
            })
        }
        
    })

    router.delete('/blog/:id', async (req,res)=>{

        try {
            const blog = await Blog.deleteOne({_id: req.params.id});
            res.status(200).json({
                status: "Success",
                blog
            })
        } catch(e) {
            res.status(500).json({
                status: "Failure",
                message: e.message
            })
        }
        
    })
}

main()
    .then(console.log())
    .catch(console.error())
    // .finally(() => Mongoose.disconnect());

module.exports = router;