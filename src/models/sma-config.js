const fs = require('fs');

// Path to the file containing the keys of the SMA configurations
const configPath = 'src/configs/sma-keys.json';

/*
    Keep in memory the time configuration of the SMA device
*/
class SmaTimeConfiguration {
    constructor() {
        this.currentTime = 0;
        this.offset = 0;
    }
}

/*
    Keep in memory the configurations of a SMA device
*/
class SmaConfig {
    constructor() {
        this.time = new SmaTimeConfiguration();
        this.configs = SmaConfig.readConfigKeys();
        console.log(this.configs);
    }

    /*
        Convert key into their SMA code

        @param {array} keys - Keys to search the code
        @return The SMA codes list
    */
    keyToCode(keys) {
        return keys.map((key) => {
            return Object.keys(this.configs)
                            .find((keyConfig) => this.configs[keyConfig].key == key);
        });
    }

    /*
        Update values by SMA code

        @param {Object} newConfig - Config with the new values to update
    */
    updateByCode(newConfig) {
        Object.keys(newConfig).map((code) => {
            if (code in this.configs) {
                this.configs[code].value = newConfig[code].val ?? 0;
            }
        });
    }

    setTime(time, offset) {
        this.time.currentTime = time;
        this.time.offset = offset;
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

        // Add the time values into the json to return
        json.time = this.time;

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

module.exports = new SmaConfig();