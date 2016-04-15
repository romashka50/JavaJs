var APP = APP || {};

require.config({
    paths: {
        backbone   : './libs/backbone/backbone',
        jQuery     : './libs/jquery/dist/jquery',
        underscore : './libs/underscore/underscore',
        socket     : '../socket.io/socket.io',
        text       : './libs/text/text',
        model      : './models',
        collections: './collections',
        views      : './views',
        templates  : '../templates'
    },

    shim: {
        underscore: {
            exports: '_'
        },
        jQuery    : {
            exports: '$'
        },
        backbone  : ['underscore', 'jQuery'],
        app       : ['backbone']
    }
});

require(['app', 'socket'], function (app, socket) {
    var io = socket();

    io.on('customSocket', function(data){
        console.log(data);

        io.emit('response', '....... hdfkdhfg .....');
    });
    
    
    
    app.initialize();
});
