var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

var db = require('./config/db');
var settings = require('./config/settings');
var router = require('./router');
var passport = require('passport');

// Connect to DB
mongoose.connect(db.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(passport.initialize());
// parse application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/upload_dir', express.static('upload_dir'));
app.use(function (req, res, next){
    let origin = req.headers.origin;
    // console.log(origin);
    const allowedOrigins = [
        'http://localhost',
        'http://localhost:4200',
    ];
    
    // res.setHeader('Access-Control-Allow-Origin', '*');
    if (allowedOrigins.indexOf(origin) > -1) {
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Allow-Origin-With-Credentials', true);
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})


app.use('/api', router);
var port = settings.port;
app.listen(port, () => {
    console.log(`Recipe is cooking at port no:${port}`);    
});

module.exports = app;