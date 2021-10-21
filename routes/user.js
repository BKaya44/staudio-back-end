const express = require('express');
var bcrypt = require('bcrypt');
const user = express.Router();

var userModel = require('../models/user');

//Routes for all user api responses
//'<domain>/api/user'

/**
 * Gets all users.
 */
user.get("/", async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200);
        return res.send(users);
    } catch {
        res.status(404);
        return res.send({ error: { "status": 404, "message": "Something went wrong, please try again." } });
    }
});

/**
 * Register new user.
 * Requires the following params:
 * username: <string>
 * password: <string>
 * passwordconf: <string>
 * email: <string>
 * location: <string> (not required)
 */
user.post('/', async (req, res) => {
    if (!req.body.username || !req.body.password || !req.body.passwordconf || !req.body.email) {
        res.status(400);
        return res.send({ error: { "status": 400, "message": "Missing params." } });
    }
    if (req.body.password !== req.body.passwordconf) {
        res.status(400);
        return res.send({ error: { "status": 400, "message": "Password verification is incorrect." } });
    }
    try {
        const users = new userModel({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        });
        if (req.body.location) users.location = req.body.location
        
        await users.save();
        res.status(200);
        return res.send({ "status": "success", "message": "User has been registered." });
    } catch {
        res.status(400);
        return res.send({ error: { "status": 400, "message": "User could not be added." } });
    }
});

/**
 * Checks if user exists and gives it a token.
 * Requires the following params:
 * username: <string>
 * password: <string>
 */
user.post('/authorize', async (req, res) => {
    try {
        await userModel.authenticate(req.body.username.toLowerCase(), req.body.password, function (error, token) {
            if (error || !token) {
                res.status(401);
                return res.send({ error: { "status": 401, "message": "Incorrect username or password." } });
            } else {
                res.status(200);
                return res.json({ "token": token });
            }
        });
    } catch {
        res.status(404);
        return res.send({ error: { "status": 404, "message": "Something went wrong, please try again." } });
    }
});

/**
 * removes existing user.
 * Requires the following params:
 * userid: <string>
 * password: <string>
 */
user.delete('/:id', async (req, res) => {
    try {
        const users = await userModel.findOne({_id: req.params.id});
        var password = req.body.password;
        if (bcrypt.compareSync(password, users.password)) {
            await userModel.deleteOne(users);
            res.status(200);
            return res.send({error: {"status": 200, "message": "User has been deleted."}});
        } else {
            res.status(400);
            return res.send({error: {"status": 400, "message": "Current password is wrong."}});
        }
    } catch {
        res.status(404);
        return res.send({ error: { "status": 404, "message": "Something went wrong, please try again." } });
    }
});

/**
 * Updates user.
 * Requires the following params:
 * userid: <string>
 * oldpassword: <string>
 * oldpasswordconf: <string>
 * newpassword: <string>
 */
user.patch("/:id", async (req, res) => {
    try {
        const users = await userModel.findOne({_id: req.params.id});
        if (req.body.oldpassword || req.body.oldpasswordconf || req.body.newpassword) {
            if (req.body.oldpassword !== req.body.oldpasswordconf) {
                res.status(400);
                return res.send({error: {"status": 400, "message": "Password verification is incorrect."}});
            }

            if (bcrypt.compareSync(req.body.oldpassword, users.password)) {
                users.password = req.body.newpassword;
                await users.save();
                res.status(200);
                return res.send({ "status": 200, "message": "Password has been updated." });
            } else {
                res.status(400);
                return res.send({error: {"status": 400, "message": "Current password is wrong."}});
            }
        } else {
            res.status(400);
            return res.send({error: {"status": 400, "message": "Missing params."}});
        }
    } catch {
        res.status(400);
        return res.send({ error: { "status": 400, "message": "User does not exist." } });
    }
});


module.exports = user