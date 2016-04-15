var express = require('express');
var mongoose = require('mongoose');
var http = require('http');
var path = require('path');
var expressSesion = require('express-session');
var MemoryStore = require('connect-mongo')(expressSesion);
var socketio = require('socket.io');

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
    var sessionConfig = {
        mongooseConnection: db
    };
    var server;
    var sockets;
    var app;

    console.log('====== Connected ====');

    app = express();
    server = http.createServer(app);
    sockets = socketio(server);

    sockets.on('connection', function(socket){
        socket.on('response', function(data){
            console.log(data);
        });
        socket.emit('customSocket', 'Hello from server');
    });
    
    app.use(express.static(path.join(__dirname, 'public')));

    app.use(expressSesion({
        name             : 'java_js',
        key              : "javaJs",
        secret           : '1q2w3e4r5tdhgkdfhgejflkejgkdlgh8j0jge4547hh',
        resave           : false,
        saveUninitialized: false,
        store            : new MemoryStore(sessionConfig)
    }));

    app.get('/', function (req, res, next) {
        res.sendFile(__dirname + '/index.html')
    });

    require('./routes/index')(app);
    server.listen(3030, function () {
        console.log('====== Server started ======');
    }) 
});
