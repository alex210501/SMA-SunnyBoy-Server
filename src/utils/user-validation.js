const crypto = require('crypto');

const database = require('../services/database');

class UserValidation {
    /*
        Check that the password of the user correspond with the one in the database

        @param {String} username - Username to check the password
        @param {String} password - Password to check
        @return {bool} True if the password is correct, false otherwise
    */
    static async checkUserPassword(username, password) {
        if (!password) {
            return false;
        }

        password = crypto.createHash('sha256').update(password).digest('hex');

        return  password == await database.getPasswordByUsername(username ?? "");
    }
}

module.exports = UserValidation;