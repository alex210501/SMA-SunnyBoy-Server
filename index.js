const express = require('express'); 
const router = require('./src/routes/routes.js');
const smaController = require('./src/controllers/sma-controller');

const app = express();
const port = 5000;
const UpdateValueInterval = 3000; // 3 s

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/', router);

app.listen(port, () => {
    console.log(`Now listening on port ${port}`); 
});

// Launch request every {UpdateValueInterval} ms
setInterval(() => smaController.updateAllValues(), UpdateValueInterval);