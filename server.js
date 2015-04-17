/* Define requirements */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logic = require('./controllers/logic');

/* Set up middleware */
app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(bodyParser.json()); 

/* Define routes */
app.get('/', function(req, res) {
    res.render('index.html');
});

app.post('/move', logic.move);

app.post('/reset', logic.reset);

app.get('*', function(req, res){
  res.redirect('/');
});
/* ************* */

app.listen(process.env.PORT || 8080);