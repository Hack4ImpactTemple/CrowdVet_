var Config = require('./public/config.js').default;
import Loan from './public/classes/Loan';
var express = require('express')
var app = express()
const fetch = require('isomorphic-fetch')
var cors = require('cors')

app.use(cors());
app.use(express.static('public'))

app.listen(Config.port, () => console.log(`Started server on port ${Config.port}!`))

app.get('/loan/', async function(req, res) {
    res.send("Return some number of loan (for the main page probz)")
});

app.get('/loan/:id', async function (req, res) {
    try {
        var loan = await Loan.fromId(req.params['id']);
        res.send(JSON.stringify(loan));
    } catch (error) {
        res.send(JSON.stringify({
            error: true,
            message: error.message
        }))
    }
});
