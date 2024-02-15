const express = require('express');
const router = express.Router();
const admin = require('./admin/router.js');
const public = require('./public/router.js');
const auth = require('./auth/routes.js');


router.use('/admin', admin);
router.use('/public', public);
router.use('/auth/', auth);

module.exports = router