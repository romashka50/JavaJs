define([
   /* 'views/user/list'*/
    'backbone',
    'router'
], function(Backbone, Router){
    function init(){
        var router = new Router();

        Backbone.history.start({silent: true});

        Backbone.history.navigate('#user', {trigger: true}); //* same result
        //Backbone.history.navigate('#user');
        //window.location.hash = '#user'; //* same result
    }
    
    
    return {
        initialize: init
    }
});
