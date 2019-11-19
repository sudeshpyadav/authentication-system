require('dotenv').config();
const logger = require('./logger');
const config = require('config');
const port = config.get('client.port');
const express = require('express');
const User = require('./models/user_model').User;
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());
const users = [];

const auth_route = require('./auth');

app.use('/', (req, res, next) => {
    logger.info({
        message: "Again hello world",
        url: req.url,
        query: req.query,
        body: req.body,
        params: req.params,
        protocol: req.protocol,
        ip: req.ip,
        cookies: req.cookies,
        baseUrl: req.baseUrl,
        path: req.path,
        route: req.route
    });
    next();
});

app.use('/auth', auth_route);

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

app.get('/users', authenticateToken, async (req, res) => {
    let users = await User.findAll();
    res.json(users);
});

app.listen(port);

module.exports = app;