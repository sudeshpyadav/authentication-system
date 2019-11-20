const config = require('config');
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./models/user_model').User;
const jwt = require('jsonwebtoken');
const logger = require('./logger');
const router = express.Router();


router.post('/login', async (req, res) => {
    let user =  await User.findOne({"username": req.body.username});
    if(user === null) return res.status(403).send("Can not find User");
    try {
        if(await bcrypt.compare(req.body.password, user.password)){
            token = jwt.sign({username:user.username}, process.env.ACCESS_TOKEN_SECRET);
            return res.json({token: token});
        }
        return res.status(400).send("Invalid username/password")
    } catch (e) {
        return res.status(500).send()
    }

});

router.post('/register', async (req, res) => {
    try{
        let hashedPassword = await bcrypt.hash(req.body.password, 10);
        let user = {username: req.body.username, password: hashedPassword}
        User.create(user);
        return res.sendStatus(201)
    } catch (e) {
        console.log(e);
        return res.sendStatus(500)
    }
});
module.exports = router;