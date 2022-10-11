const jwt = require('jsonwebtoken');

const smaApi = require('../models/sma-api');
const smaConfig = require('../models/sma-config');
const userValidation = require('../utils/user-validation');

const invalidTokenMessage = 'Invalid token !';

class SmaController {
    logIn(req, res) {
        // If token is registed, it mean that you're connected
        if (req.session.token) {
            res.status(401).json({
                error: 'Already connected !'
            });
            return;
        }

        userValidation.checkUserPassword(req.body.username, req.body.password).then((result) => {
            console.log(result);
            if (!result) {
                res.status(401).json({
                    error: 'Bad username and password combination !'
                });
                return;
            }

            console.log(req.header('authorization'));
            jwt.sign({ session: req.session }, 'secretkey', (err, token) => {
                req.session.token = token;
                console.log(req.session);
                res.json({ token });
            });
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

        jwt.verify(token, 'secretkey', (err, authData) => {
            if (err) {
                res.status(403).json({
                    error: invalidTokenMessage
                });
            }
        });

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