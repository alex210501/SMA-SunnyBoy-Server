const fs = require('fs');

// Path to the file containing the keys of the SMA configurations
const configPath = 'src/configs/sma-keys.json';

/*
    Keep in memory the configurations of a SMA device
*/
class SmaConfig {
    constructor() {
        this.configs = SmaConfig.readConfigKeys();
        console.log(this.configs);
    }

    /*
        Override the toJSON function.
        @return String JSON with the data to send to the client.
    */
    toJSON() {
        let json = {};

        Object.keys(this.configs).forEach((keyCode) => {
            json[this.configs[keyCode].key] = {
                value: this.configs[keyCode].value,
                unit: this.configs[keyCode].unit
            };
        });

        return json;
    }

    /*
        Read the configuration file and return the JSON data.

        @return JSON data from the file.
    */
    static readConfigKeys() {
        let fileData = fs.readFileSync(configPath, { encoding: 'utf-8' });

        return JSON.parse(fileData);
    }
}

module.exports = SmaConfig;