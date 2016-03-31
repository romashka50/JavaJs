var express = require('express');
//var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://testJava:1234567890@localhost:27017/java_js', function(err, db){
    var app;

    if(err){
        return console.error(err);
    }

    console.log('====== Connected ====');

    db.collection('users').insert({
        firstName: 'Ivan',
        lastName: 'Pupkin',
        dateOfBirth: new Date()
    }, function(err, resp){
        if(err){
            return console.error(err);
        }

        console.dir(resp);
    });

    app = express();
    app.listen(3030, function(){
        console.log('====== Server started ======');
    })
});

