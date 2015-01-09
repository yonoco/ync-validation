var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');
var validate = require('./validator');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.locals._ = _;
app.locals.pretty = true;

app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/', function(req, res) {
    res.render('index');
});

app.post('/signup', function(request, response) {

    console.log(JSON.stringify(request.body, null, 2));

    validate(request.body, function(error, result) {
        if (error) throw error;
        response.render('index', {
            result: result
        });
    });

});



app.listen(4000);
console.log('Running on port 4000');