const jwt = require('jsonwebtoken');
var config = require('../config');

/**
 * Checks if user has a login token and decodes theses and puts them in a variable
 */
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, config.SECRET);
        req.user_id = decoded.id;
        req.user_type = decoded.type;
        req.user_name = decoded.name;
        next();
    } catch {
        res.status(400);
        res.send({"status": 400, "message": "Failed to authenticate token." });
        return;
    }
};