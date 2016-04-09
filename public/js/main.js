require.config({
    paths: {
        backbone   : './libs/backbone/backbone',
        jQuery     : './libs/jquery/dist/jquery',
        underscore : './libs/underscore/underscore',
        model      : './models',
        collections: './collections',
        views      : './views'
    },

    shim: {
        underscore: {
            exports: '_'
        },
        backbone  : ['underscore', 'jQuery'],
        app       : ['backbone']
    }
});

require(['app'], function (app) {
    app.initialize();
});
