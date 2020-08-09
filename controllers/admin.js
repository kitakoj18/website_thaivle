const dotenv = require('dotenv').config();
const tinyAPI = process.env.TINYMCE_API;

exports.home = (req, res, next) =>{
    res.render('admin/adminHome', {tinyAPI: tinyAPI});
};

exports.postBlog = (req, res, next) =>{

    const blogTitle = req.body.title;
    const blogContent = req.body.blogContent;

    res.redirect('/admin');
}