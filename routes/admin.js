const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

router.get('/', isAuth, adminController.home);

router.post('/post-blog', isAuth, adminController.postBlog);

router.post('/delete-blog', isAuth, adminController.deleteBlog);

module.exports = router;