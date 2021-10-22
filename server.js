const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./documentation/swagger.json');

const apiRoutes = require("./routes/api");
const config = require('./config');

/**
 * Creates a mongodb connection.
 */ 
 mongoose
 .connect(config.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => {
     const app = express();
     /**
      * Session configuration
      */
     app.use(session({
         resave: true,
         saveUninitialized: true,
         secret: config.SECRET,
         cookie: { maxAge: config.SESSION_LENGTH }
     }));

     /**
      * Standard configuration to prevent certain attacks.
      */
     app.disable('x-powered-by')
     app.set('view engine', 'html');
     app.use(express.json({limit: '50mb'}));
     app.use(express.urlencoded({limit: '50mb', extended: true}));
     
     //Creates routes for api.
     app.use("/api", apiRoutes);
     app.use('/api-docs', swaggerUi.serve);
     app.get('/api-docs', swaggerUi.setup(swaggerDocument));

     /**
     * Throws a 404 page when page doesn't exists.
     */
     app.use(function (req, res) {
         res.status(404);
         res.send({ error: { "status": 404, "message": "page not found.", } });
     });

     /**
     * Throws a 500 error when all else fails.
     */
     app.use(function (err, req, res) {
         res.status(500);
         res.send({ error: { "status": 500, "message": err.message, } });
     });

     app.listen(config.PORT, function () {
         console.log(config.URL)
     });
 });