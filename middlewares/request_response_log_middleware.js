const logger = require('../logger');
module.exports = (req, res, next) => {
    logger.info({
        message: "Again hello world",
        url: req.url,
        query: req.query,
        body: req.body,
        params: req.params,
        protocol: req.protocol,
        method: req.method,
        ip: req.ip,
        cookies: req.cookies,
        baseUrl: req.baseUrl,
        path: req.path,
        route: req.route
    });
    next();
};