module.exports = function(app){
    var userRouter = require('./user');
    
    app.get('/', function(req, res, next){
        res.status(200).send('Hello World');
    });
    app.use('/users', userRouter);
};
