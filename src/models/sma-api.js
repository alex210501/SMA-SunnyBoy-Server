// Module used to make HTTP request
const axios = require('axios');

// IP address of the SMA server
const smaHost = 'http://192.168.1.150';


/*
    Class that manage the communication with the SMA sunny boy server.
*/
class SmaApi {
    constructor() {
        this.sid = '';
        this.isConnected = false;
    }

    /*
        Login to the SMA server.
    */
    async logIn () {
        const url = `${smaHost}/dyn/login.json`;
        const body = {
                right: 'usr',
                pass: 'Lucialej1021'
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
        const url = `${smaHost}/dyn/logout.json`;
        const options = {
            params: {
                sid: this.sid
            }
        }

        let response = await axios.post(url, {}, options);
        let result = response.data;

        if ('result' in result) {
            this.isConnected = result.result.isLogin;

            console.log("Disconnected from the SMA server");
        }
        
        return response.data;
    }
}

module.exports = SmaApi;