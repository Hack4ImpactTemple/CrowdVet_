var Config = require('./config.js');
import Loan from '../common/classes/Loan.js';
var express = require('express')
var app = express()
const fetch = require('isomorphic-fetch')


app.listen(Config.port, () => console.log(`Started server on port ${Config.port}!`))

app.get('/loan/', async function(req, res) {
    res.send("Return some number of loan (for the main page probz)")
});

app.get('/loan/:id', async function (req, res) {
    var loan = await Loan.fromId(req.params['id']);
    res.send(JSON.stringify(loan));
});

