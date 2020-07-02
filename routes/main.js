const express = require('express');
const router = express.Router();

const routesController = require('../controllers/main');

router.get('/', routesController.home);

router.get('/research', routesController.research);

router.get('/thoughts', routesController.thoughts);

router.get('/contact', routesController.contact);

router.post('/contact', routesController.sendEmail);

module.exports = router;