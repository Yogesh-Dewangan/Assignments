const mongooose = require('mongoose');

const blogSchema = new mongooose.Schema({
    // Your code goes here
    topic: {type: String, required: true},
    description: {type: String, required: true},
    posted_at: {type: Date, required: true},
    posted_by: {type: String, required: true}
})

const Blog = mongooose.model('blog', blogSchema);

module.exports = Blog;