const express = require('express'); 
const app = express();       
const port = 5000;

app.get('/', (req, res) => { 
    res.end('Hello world !');
});

app.listen(port, () => {
    console.log(`Now listening on port ${port}`); 
}); 