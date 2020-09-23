const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

router.get('/add-blog', isAuth, adminController.addBlog);

router.post('/post-blog', isAuth, adminController.postBlog);

router.get('/edit-blog/:blogId', isAuth, adminController.getEditBlog);

router.post('/edit-blog', isAuth, adminController.postEditBlog);

router.post('/delete-blog', isAuth, adminController.deleteBlog);

module.exports = router;