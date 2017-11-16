var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var listas = require('./routes/listas');
var productos = require('./routes/productos');

var port = process.env.PORT || 8080;

var app = express();

//View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

app.get('/', function(req, res) {

    // ejs render automatically looks in the views folder
    res.render('index');
});


// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api', listas);
app.use('/api', productos);

app.listen(port, function(){
    console.log('Server started on port '+port);
});