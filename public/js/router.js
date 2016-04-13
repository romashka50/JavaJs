define([
    'backbone'
], function(Backbone){
    return Backbone.Router.extend({
        routes: {
            'users': 'usersRouter',
            '*any': 'default'
        },

        usersRouter: function(){
            console.log('I\'m in usersRouter');
        },
        default: function(){
            console.log('I\'m in default');
        }
    });
});