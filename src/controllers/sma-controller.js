const smaApi = require('../models/sma-api');

class SmaController {
    constructor() {
        this.smaApi = new smaApi();
    }

    logIn(req, res) {
        this.smaApi.logIn().then((response) => {
            res.json(response);
        });
    }

    logOut(req, res) {
        this.smaApi.logOut().then((response) => {
            res.json(response);
        });
    }
}

module.exports = SmaController;