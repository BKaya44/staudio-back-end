const express = require('express');
const api = express.Router();

const productRoutes = require("./product");

/**
 * All api routes
 */
 api.get("/", async (req, res) => {
    try {
        res.status(200);
        return res.send({ error: { "status": 200, "message": "Welcome to our api." } });
    } catch {
        res.status(401);
        return res.send({ error: { "status": 401, "message": "Unauthorized." } });
    }
});

api.use("/product", productRoutes);

module.exports = api