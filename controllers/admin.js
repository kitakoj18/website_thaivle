const Blog = require('../models/blog');

const dotenv = require('dotenv').config();
const tinyAPI = process.env.TINYMCE_API;

exports.home = (req, res, next) =>{
    res.render('admin/adminHome', {tinyAPI: tinyAPI});
};

exports.postBlog = (req, res, next) =>{

    const blogTitle = req.body.title;
    // add check if blogThumbnail exists since can be rejected if not right file type
    // added / to beginning to make absolute path
    const blogThumbnailUrl = '/' + req.file.path;
    const blogContent = req.body.blogContent;

    const blogPost = new Blog({
        blogTitle: blogTitle,
        blogThumbnailUrl: blogThumbnailUrl,
        blogContent: blogContent
    })

    blogPost.save();

    res.redirect('/thoughts');
};

exports.deleteBlog = (req, res, next) =>{
    const blogId = req.body.blogId;
    Blog.findByIdAndRemove(blogId)
        .then(() =>{
            res.redirect('/thoughts');
        })
};