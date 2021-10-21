var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    email: String,
    location: String,
});

/**
 * Authenticates the user.
 */
 UserSchema.statics.authenticate = function (username, password, callback) {
    var User = mongoose.model('User', UserSchema);
    User.findOne({ username: username })
        .exec(function (err, user) {
            if (!user || err) {
                return callback(err);
            }
            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                    var token = jwt.sign({ id: user._id }, config.SECRET, {
                        expiresIn: config.SESSION_LENGTH
                    });
                    return callback(null, token);
                }
                return callback();
            });
        });
}

/**
 * When saving a user the password gets hashed.
 */
UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next();
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});

module.exports = mongoose.model('User', UserSchema);