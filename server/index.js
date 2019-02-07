var Config = require('./config.js');
import Loan from '../common/classes/Loan.js';
var express = require('express')
var app = express()
const fetch = require('isomorphic-fetch')


app.listen(Config.port, () => console.log(`Started server on port ${Config.port}!`))

app.get('/helloworld', function (req, res) {
    var loan = new Loan();
    loan.bind({
        id: 123,
        name: "Brendan's Bank Account",
        image: "imgur.com/gif.gif",
        geocode: {
            city: "Philadelphia",
            country: {
                name: "EEUU",
                region: "Noreste"
            }
        }
    })
    loan.bind({
        geocode: {
            city: "Río de Janero"
        }
    })
    res.send(loan.name + "<br>" + loan.geocode.city + "<br>" + loan.geocode.country.name);
});

