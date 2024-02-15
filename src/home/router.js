const express = require('express');
const path = require('path');

const router = express.Router();

const dirPath = path.join(__dirname, '../doc');

router.use(express.static(dirPath));

module.exports = router