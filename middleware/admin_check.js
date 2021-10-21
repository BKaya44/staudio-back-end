/**
 * Checks if user is admin
 */
module.exports = (req, res, next) => {
    try {
        if (req.user_type !== "ADMIN"){
            res.status(401);
            return res.send({ error: { "status": 400, "message": "Unauthorized." } });
        }
        next();
    } catch {
        res.status(500);
        res.send({ error: { "status": 500, "message": "Failed to check authorization." } });
        return;
    }
};