const path = require('node:path'); 
const https = require('https');
const fs = require('fs');

const express = require('express'); 
const session = require('express-session');

const router = require('./src/routes/routes.js');
const smaController = require('./src/controllers/sma-controller');

const options = {
    key: fs.readFileSync(path.join('ssl', 'key.pem'), 'utf-8'),
    cert: fs.readFileSync(path.join('ssl', 'cert.pem'), 'utf-8')
};

const app = express();
const port = 5000;
const UpdateValueInterval = 3000; // 3 s

app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: true }));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/', router);

https.createServer(options, app).listen(port, () => {
    console.log(`Now listening on port ${port}`); 
});

// Launch request every {UpdateValueInterval} ms
setInterval(() => smaController.updateAllValues(), UpdateValueInterval);