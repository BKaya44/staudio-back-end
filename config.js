module.exports = {
    //Port used to put webapp online.
    'PORT': 8000,

    //Used for Session secret key.
    'SECRET': 'staudiosecret',

    //Database connection for mongodb.
    'DATABASE': 'mongodb://localhost:27017/staudio',

    //Webserver URL.
    'URL': 'http://127.0.0.1:8000',

    //Session length for expiring.
    'SESSION_LENGTH': 31536000, // 1 year
};