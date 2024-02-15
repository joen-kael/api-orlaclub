const express = require('express');
const router = express.Router();
const activities = require('./activities/routes.js');
const users = require('./users/routes.js');
const authenticate = require('../../../middleware/auth.js');

router.use(authenticate);
router.use('/activities', activities);
router.use('/users', users);

module.exports = router