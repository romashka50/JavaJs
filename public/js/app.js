define([
   /* 'views/users/list'*/
    'backbone',
    'jQuery',
    'underscore',
    'router'
], function(Backbone, $, _, Router){
    function init(){
        var url = window.location.hash;
        var router;

        APP.channel = _.extend({}, Backbone.Events);

        Backbone.history.start({silent: true});

        router = new Router({channel: APP.channel});
        
        $.ajax({
            url: 'isAuth',
            success: function(success){
                Backbone.history.fragment = '';
                Backbone.history.navigate(url, {trigger: true});
            },
            error: function(error){
                Backbone.history.navigate('#myApp/login', {trigger: true});
            }
        });
    }
    
    
    return {
        initialize: init
    }
});
