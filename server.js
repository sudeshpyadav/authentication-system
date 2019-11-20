const config = require('config');
const express = require('express');

const logger = require('./logger');
const port = config.get('client.port');

const User = require('./models/user_model').User;

// Middlewares
const authenticationMiddleware = require('./middlewares/authentication_middleware');
const requestResponseLogMiddleware = require('./middlewares/request_response_log_middleware');


// Routes
const auth_router = require('./routes/auth_routes');
const user_router = require('./routes/user_routes');

const app = express();
app.use(express.json());

app.use('/', requestResponseLogMiddleware);
app.use('/auth', auth_router);
app.use('/', authenticationMiddleware);


app.use('/users', user_router);

app.listen(port);
module.exports = app;