var express = require('express')
var app = express()

app.listen(3000, () => console.log(`Started server on port ${3000}!`))

app.get('/helloworld', function (req, res) {
    res.send("Hello World!");
});

