var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var validate = require('./validator');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/', function(req, res) {
    res.render('index');
});

app.post('/signup', function(request, response) {

    console.log(JSON.stringify(request.body, null, 2));

    validate(request.body, function(error, result) {
        response.render('index', {
            result: JSON.stringify(result, null, 2)
        });
    });

});

app.listen(4000);