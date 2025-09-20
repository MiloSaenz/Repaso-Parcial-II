const express = require('express');
const router = express.Router();
const controller = require('../controllers/habitacion27.controller');

router.get('/', controller.index);
// Order matters: place static routes before parameterized routes so '/create' is not
// captured by the '/:id' parameter.
router.get('/create', controller.create);
router.get('/:id', controller.show);
router.post('/', controller.store);

module.exports = router;