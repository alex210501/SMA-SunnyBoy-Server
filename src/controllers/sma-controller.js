const smaApi = require('../models/sma-api');
const smaConfig = require('../models/sma-config');

class SmaController {
    logIn(req, res) {
        smaApi.logIn().then((response) => {
            res.json(response);
        });
    }

    logOut(req, res) {
        smaApi.logOut().then((response) => {
            res.json(response);
        });
    }

    getValues(req, res) {
        res.json(smaConfig);
    }

    updateAllValues() {
        smaApi.getAllValues().then((response) => {
            console.log(response);
            smaConfig.updateByCode(response);
        });
    }
}

module.exports = new SmaController();