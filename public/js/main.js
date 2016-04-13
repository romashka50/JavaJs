require.config({
    paths: {
        backbone   : './libs/backbone/backbone',
        jQuery     : './libs/jquery/dist/jquery',
        underscore : './libs/underscore/underscore',
        text : './libs/text/text',
        model      : './models',
        collections: './collections',
        views      : './views',
        templates      : '../templates'
    },

    shim: {
        underscore: {
            exports: '_'
        },
        jQuery: {
            exports: '$'
        },
        backbone  : ['underscore', 'jQuery'],
        app       : ['backbone']
    }
});

require(['app'], function (app) {
    app.initialize();
});
