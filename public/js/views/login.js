define([
    'backbone',
    'underscore',
    'models/user',
    'text!templates/login.html'
], function (Backbone, _, User, create) {
    return Backbone.View.extend({
        el      : '#container',
        template: _.template(create),
        events  : {
            'click #logIn'  : 'onLogin',
            'click #signUp': 'onSignUp'
        },

        initialize: function (opt) {
            this.render();
        },

        onLogin  : function (e) {
            var $thisEl = this.$el;
            var firstName;
            var pass;

            e.stopPropagation();
            e.preventDefault();

            firstName = $thisEl.find('#firstName').val();
            pass = $thisEl.find('#pass').val();

            this.model = new User({
                firstName: firstName,
                pass: pass
            });

            this.model.urlRoot = '/users/login';

            this.model.save(null, {
                wait: true,
                validate: false,
                success: function(model){
                    console.log('-- Created with id' + model.id + ' ----');
                    Backbone.history.navigate('#myApp/users', {trigger: true});
                },
                error: function(model, xhr){
                    alert(xhr.statusText);
                }
            });
        },
        onSignUp: function (e) {
            e.stopPropagation();

            Backbone.history.navigate('#myApp/users/create', {trigger: true});
        },

        render: function () {
            this.$el.html(this.template());
        }
    });
});