const Blog = require('../models/blog');

const dotenv = require('dotenv').config();
const tinyAPI = process.env.TINYMCE_API;

exports.addBlog = (req, res, next) =>{
    res.render('admin/addBlog', {
        tinyAPI: tinyAPI,
        pageTitle: 'Write a blog post below!',
        isEditing: false
    });
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

exports.getEditBlog = (req, res, next) =>{
    const isEditing = req.query.edit;
    if(!isEditing){
        return res.redirect('/thoughts');
    }

    const blogId = req.params.blogId;
    Blog.findById(blogId)
        .then(blog =>{
            if(!blog){
                return res.redirect('/thoughts');
            }
            res.render('admin/addBlog', {
                tinyAPI: tinyAPI,
                pageTitle: 'Edit your blog below!',
                isEditing: isEditing,
                blog: blog
            });
        })
        .catch(err => console.log(err));
};

exports.postEditBlog = (req, res, next) =>{
    const blogId = req.body.blogId;
    const updatedTitle = req.body.title;
    const updatedThumbnailUrl = req.file;
    const updatedContent = req.body.blogContent;

    Blog.findById(blogId)
        .then(blog =>{
            blog.blogTitle = updatedTitle;
            blog.blogContent = updatedContent;
            if(updatedThumbnailUrl){
                blog.blogThumbnailUrl = '/' + updatedThumbnailUrl.path;
            }
            return blog.save()
        })
        .then(result =>{
            res.redirect('/thoughts');
        })
        .catch(err => console.log(err));
}

exports.deleteBlog = (req, res, next) =>{
    const blogId = req.body.blogId;
    Blog.findByIdAndRemove(blogId)
        .then(() =>{
            res.redirect('/thoughts');
        })
};