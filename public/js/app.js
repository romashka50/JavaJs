define([
   /* 'views/users/list'*/
    'backbone',
    'jQuery',
    'router'
], function(Backbone, $, Router){
    function init(){
        var router = new Router();
        var url = window.location.hash;

        Backbone.history.start({silent: true});

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
