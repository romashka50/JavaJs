var express = require('express');
var mongoose = require('mongoose');
var env = process.env;
var db;

require('./config/' + env.NODE_ENV);

/*db = mongoose.createConnection(env.DB_HOST, env.DB_NAME, env.DB_PORT, {
    user: env.DB_USER,
    pass: env.DB_PASS
});*/
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
    require('./routes/index')(app);
    app.listen(3030, function () {
        console.log('====== Server started ======');
    }) 
});
