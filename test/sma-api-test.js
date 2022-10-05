const smaApiClass = require('../src/models/sma-api');
const smaApi = new smaApiClass();

smaApi.logIn().then(() => smaApi.logOut());