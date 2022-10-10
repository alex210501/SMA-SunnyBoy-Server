const smaApiClass = require('../src/controllers/sma-controller');
const smaApi = new smaApiClass();

smaApi.logIn().then(() => smaApi.logOut());