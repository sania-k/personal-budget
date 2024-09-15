const express = require('express');
const budget = require('./budget.json');
const app = express();
const port = 3456;

app.use('/', express.static('public'));



app.get('/hello', (req, res) => {
    res.send('Hello World! :D');
});

app.get('/budget', (req, res) => {
    res.json(budget)
});



app.listen(port, () => {
    console.log(`Example app listening @ http://localhost:${port}`)
});
