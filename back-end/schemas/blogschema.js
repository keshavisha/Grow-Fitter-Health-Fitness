import mongoose from 'mongoose'

const BlogSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
      }
      ,
    user: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  },
  modelverified: {
    type: Boolean,
    default: false
  },
  adminverified: {
    type: Boolean,
    default: false
  }
});

const Blog = mongoose.model('Blog', BlogSchema);

export default Blog
