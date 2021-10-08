const express = require('express');
const api = express.Router();

const productRoutes = require("./product");
const reviewRoutes = require("./review");
const userRoutes = require("./user");
const orderRoutes = require("./order");
const dealRoutes = require("./deal");

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

/**
 * All product routes
 */
api.use("/product", productRoutes);

/**
 * All review routes
 */
 api.use("/product/review", reviewRoutes);

 /**
 * All user routes
 */
  api.use("/user", userRoutes);

  /**
 * All order routes
 */
 api.use("/order", orderRoutes);

 /**
 * All deal routes
 */
  api.use("/deal", dealRoutes);

module.exports = api