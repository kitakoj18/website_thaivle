const Blog = require('../models/blog');

const dotenv = require('dotenv').config();
const tinyAPI = process.env.TINYMCE_API;

exports.home = (req, res, next) =>{
    res.render('admin/adminHome', {tinyAPI: tinyAPI});
};

exports.postBlog = (req, res, next) =>{

    const blogTitle = req.body.title;
    const blogContent = req.body.blogContent;

    const blogPost = new Blog({
        blogTitle: blogTitle,
        blogContent: blogContent
    })

    blogPost.save();

    res.redirect('/admin');
}