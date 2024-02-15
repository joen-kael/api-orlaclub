const express = require('express');
const authSchema = require('./schema');
const router = express.Router();
const AuthService = require('../../../modules/auth/service');

router.post('/', async (req, res) => {
    const { body: auth } = req;
    try {
      await authSchema.validate(auth, { abortEarly: false });
      try {
        const token = await AuthService.config().create(auth);
        res.status(200).json(token);
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
    } catch (error) {
      res.status(500).json({ error: error.errors });
    }
})

module.exports = router