module.exports = function (app) {
    var userRouter = require('./user');
    var postRouter = require('./post');
    var bodyParser = require('body-parser');
    
    function errorHandler(err, req, res, next) {
        var status = err.status || 500;

        if (process.env.NODE_ENV === 'production') {
            res.status(status).send({error: err.message});
        } else {
            res.status(status).send({error: err.message + '\n' + err.stack});
        }
    }
    
    app.use(bodyParser.json());

    app.use('/users', userRouter);
    app.use('/posts', postRouter);
    
    app.get('/isAuth', function(req, res, next){
        if(req.session && req.session.logged){
            return res.status(200).send({success: 200});
        }

        res.status(401).send({error: 401});
    });

    app.use(errorHandler);
};
