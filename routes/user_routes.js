const express = require('express');
const router = express.Router();
const User = require('../models/user_model').User;

router.get('/', async (req, res) => {
    let users = await User.findAll();
    res.json(users);
});

module.exports = router;