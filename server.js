var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var env = process.env;
var db;

require('./config/' + env.NODE_ENV);

mongoose.connect(env.DB_HOST, env.DB_NAME, env.DB_PORT, {
    user: env.DB_USER,
    pass: env.DB_PASS
});
db = mongoose.connection;
db.on('error', function(err){
    console.error(err);
});
db.once('connected', function(){
    var app;

    console.log('====== Connected ====');

    app = express();
    app.use(express.static(path.join(__dirname, 'public')));

    app.get('/', function (req, res, next) {
        res.sendFile(__dirname + '/index.html')
    });

    require('./routes/index')(app);
    app.listen(3030, function () {
        console.log('====== Server started ======');
    }) 
});
