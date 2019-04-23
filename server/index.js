var Config = require('./public/config.js').default;
import Loan from './public/classes/Loan';
import { UserRefreshClient } from 'google-auth-library';
var express = require('express')
var app = express()
var cors = require('cors')
const fetch = require('isomorphic-fetch')
var bodyParser = require('body-parser')
import User from './public/classes/User.js';

// Configure Firebase
var admin = require('firebase-admin');
var serviceAccount = require(__dirname + "/firebase-credentials.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://kiva-crowdvet.firebaseio.com"
});


// Publish the files in the public folder
app.use(cors());
app.use(express.static('public'))
app.use( bodyParser.json() );

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

app.get('/user/get', async function(req, res) {

    try {

        var decodedToken = await admin.auth().verifyIdToken(req.query['token']);
        var uid = decodedToken.uid;

        var user = new User(uid);
        await user.init();

        await res.send(JSON.stringify(user));
    
    } catch (error) {
        res.send(JSON.stringify({
            error: true,
            message: error.message
        }))
    }

});

app.post('/user/update', async function (req, res) {
    try {

        var decodedToken = await admin.auth().verifyIdToken(req.query['token']);
        var uid = decodedToken.uid;
        var updates = req.body.updates;
    
        console.log("Token: " + req.query['token'])
        console.log("UID: " + uid)
        console.log("updates: " + JSON.stringify(req.body.updates))

        var user = new User(uid);
        await user.init(uid);
        var result = await user.update(updates);

        console.log(JSON.stringify(result));

        res.send(JSON.stringify(result));
        //user = await user.fromId(uid);
        //await user.update(updates);
    
    } catch (error) {

        res.send(JSON.stringify({
            error: true,
            message: error.message
        }))

    }
});