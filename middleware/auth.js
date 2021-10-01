const jwt = require('jsonwebtoken');
var config = require('../config');

/**
 * Checks if user has a login token and decodes theses and puts them in a variable
 */
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, config.SECRET);
        req.accountId = decoded.id;
        next();
    } catch {
        res.status(500);
        res.send({ error: { "status": 500, "message": "Failed to authenticate token." } });
        return;
    }
};