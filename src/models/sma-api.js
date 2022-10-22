// Module used to make HTTP request
const axios = require('axios');
const fs = require('fs');

// Path to the configuration file
const configPath = 'src/configs/sma-configs.json';

// Default values
const defaultHost = 'http://localhost';
const defaultPort = 80;
const defaultRight = 'usr';
const defaultPassword = '1234';

/*
    Class that manage the communication with the SMA sunny boy server.
*/
class SmaApi {
    #uri;
    #right;
    #password;

    constructor() {
        this.sid = '';
        this.isConnected = false;

        this.#getConfigFromFile();
    }

    /*
        Login to the SMA server.
    */
    async logIn () {
        const url = `${this.#uri}/dyn/login.json`;
        const body = {
                right: this.#right,
                pass: this.#password
        };

        // Send the POST request and get the data
        let response = await axios.post(url, body);
        let result = response.data;

        // If the result is not an error, then get the SID
        if ('result' in result) {
            this.isConnected = true;
            this.sid = result.result.sid;

            console.log(`Logged In with SID: ${this.sid}`);
        } else {
            console.error(`Cannot log in with error ${result.err}`);
        }
        
        return response.data;
    }

    /*
        Logout from the SMA server.
     */
    async logOut() {
        const url = `${this.#uri}/dyn/logout.json`;
        const options = this.#getOptionRequest();

        let response = await axios.post(url, {}, options);
        let result = response.data;

        if ('result' in result) {
            this.isConnected = result.result.isLogin;

            console.log("Disconnected from the SMA server"); 
        }
        
        return result;
    }

    /*
        Get the values passed from keys.

        @param {array} keysList - Keys to get the values
    */
    async getValues(keysList) {
        if (!this.isConnected) {
            await this.logIn();
        }

        const url = `${this.#uri}/dyn/getValues.json`;
        const options = this.#getOptionRequest();
        const data = {
            destDev: [],
            keys: keysList
        };

        let response = await axios.post(url, data, options);
        let result = response.data;

        // If a result is received, remove the super key '012F-7309B431'
        if ('result' in result) {
            let superKey = Object.keys(result.result)[0];
            
            return result.result[superKey];
        }

        return result;
    }

    /*
        Get all the values from the SMA
    */
    async getAllValues() {
        if (!this.isConnected) {
            await this.logIn();
        }

        const url = `${this.#uri}/dyn/getAllOnlValues.json`;
        const options = this.#getOptionRequest();
        const data = {
            destDev: [],
        };

        let response = await axios.post(url, data, options);
        let result = response.data;

        // If a result is received, remove the super key '012F-7309B431'
        if ('result' in result) {
            let superKey = Object.keys(result.result)[0];
            
            return result.result[superKey];
        }

        return result;
    }

    /*
        Get the local time of the SMA

        @return Local time
    */
    async getLocalTime() {
        if (!this.isConnected) {
            await this.logIn();
        }

        const url = `${this.#uri}/dyn/getTime.json`;
        const options = this.#getOptionRequest();
        const data = {
            destDev: [],
        };

        let response = await axios.post(url, data, options);
        let result = response.data;

        // If a result is received, remove the super key '012F-7309B431'
        if ('result' in result) {
            let superKey = Object.keys(result.result)[0];
            
            return result.result[superKey];
        }

        return result;
    }

    /*
        Return the options to pass to the POST request

        @return Object with the options to send into the request
    */
    #getOptionRequest() {
        return {
            params: {
                sid: this.sid
            }
        };
    }

    /*
        Get the configurations of the server from the file
    */
    #getConfigFromFile() {
        const fileData = fs.readFileSync(configPath, { encoding: 'utf-8' });
        const jsonData = JSON.parse(fileData);
        const host = jsonData.host ?? defaultHost;
        const port = jsonData.port ?? defaultPort;

        this.#uri = `${host}:${port}`;
        this.#right = jsonData.right ?? defaultRight;
        this.#password = jsonData.password ?? defaultPassword;
        console.log(this);
    }
}

module.exports = new SmaApi();