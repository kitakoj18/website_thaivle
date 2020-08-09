const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/', adminController.home);

router.post('/post-blog', adminController.postBlog)

module.exports = router;