var express = require('express');
var app = express();
var logic = require('./controllers/logic');
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(bodyParser.json()); 
// var jsonParser = bodyParser.json()

app.get('/', function(req, res) {
    res.render('index.html');
});

app.post('/move', logic.move);
app.post('/reset', logic.reset);

app.listen(process.env.PORT || 8080);