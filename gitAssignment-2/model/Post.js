const mongoose = rquired('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema ({
    title: String,
    body : String,
    image: String,
    user: [{ObjectId: Schema.Types.ObjectId, ref: 'User'}]
});

const BlogModel = mongoose.model('Blog', blogSchema);

module.exports = BlogModel;