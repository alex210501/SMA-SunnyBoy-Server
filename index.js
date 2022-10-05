const express = require('express'); 
const router = require('./src/routes/routes.js');

const app = express();       
const port = 5000;

app.use(express.urlencoded({extended:true}));

app.use('/', router);

app.listen(port, () => {
    console.log(`Now listening on port ${port}`); 
});