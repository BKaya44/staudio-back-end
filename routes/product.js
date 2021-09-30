const express = require('express');
const product = express.Router();

/**
 * Routes for all product api responses
 */
 product.get("/", async (req, res) => {
    try {
        res.status(200);
        return res.send({ error: { "status": 200, "message": "Welcome to our product api." } });
    } catch {
        res.status(401);
        return res.send({ error: { "status": 401, "message": "Unauthorized." } });
    }
});


module.exports = product