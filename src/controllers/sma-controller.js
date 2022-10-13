const crypto = require('crypto');
const smaApi = require('../models/sma-api');
const smaConfig = require('../models/sma-config');
const userValidation = require('../utils/user-validation');

const invalidTokenMessage = 'Invalid token !';

class SmaController {
    logIn(req, res) {
        userValidation.checkUserPassword(req.body.username, req.body.password).then((result) => {
            console.log(result);
            if (!result) {
                res.status(401).json({
                    error: 'Bad username and password combination !'
                });
                return;
            }

            console.log(req.header('authorization'));
            if (!req.session.token) {
                req.session.token = crypto.randomBytes(64).toString('hex');
            }
            console.log(req.session.token);
        res.json({ token: req.session.token });
        });
    }

    logOut(req, res) {
        if (!this.#checkToken(req)) {
            res.status(403).json({
                error: invalidTokenMessage
            });

            return;
        }

        const token = this.#getToken(req.header('authorization'));

        req.session.destroy();
        res.sendStatus(200);
    }

    getValues(req, res) {
        if (!this.#checkToken(req)) {
            res.status(403).json({
                error: invalidTokenMessage
            });

            return;
        }
        
        res.json(smaConfig);
    }

    updateAllValues() {
        smaApi.getLocalTime().then((response) => {
            console.log(response);
            smaConfig.setTime(response.tm ?? 0, response.ofs ?? 0);
        });

        smaApi.getAllValues().then((response) => {
            console.log(response);
            smaConfig.updateByCode(response);
        });
    }

    #getToken(authorized) {
        if (authorized === undefined) {
            return '';
        }

        // Check if it's a bearer token and take the result after 'Bearer'
        if (authorized.startsWith('Bearer')) {
            return authorized.split(' ')[1];
        }

        return authorized;
    }

    #checkToken(request) {
        const token = this.#getToken(request.header('authorization'));

        return request.session.token == token;
    }
}

module.exports = new SmaController();