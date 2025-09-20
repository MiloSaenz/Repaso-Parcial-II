const express = require('express');
const router = express.Router();
const controller = require('../controllers/habitacion27.controller');
router.get('/', controller.index);
module.exports = router;