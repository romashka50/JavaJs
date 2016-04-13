define([
    'backbone',
    'underscore',
    'models/user',
    'text!templates/users/create.html'
], function (Backbone, _, User, create) {
    return Backbone.View.extend({
        el      : '#container',
        template: _.template(create),
        events  : {
            'click #saveBtn'  : 'onSave',
            'click #cancelBtn': 'onCancel'
        },

        initialize: function (opt) {
            this.render();
        },

        onSave  : function (e) {
            var $thisEl = this.$el;
            var firstName;
            var lastName;
            var pass;
            var dob;

            e.stopPropagation();
            e.preventDefault();

            firstName = $thisEl.find('#firstName').val();
            lastName = $thisEl.find('#lastName').val();
            pass = $thisEl.find('#pass').val();
            dob = $thisEl.find('#dob').val();

            this.model = new User({
                firstName: firstName,
                lastName: lastName,
                pass: pass,
                dateOfBirth: dob
            });

            this.model.urlRoot = '/users';

            this.model.save(null, {
                wait: true,
                success: function(model){
                    console.log('-- Created with id' + model.id + ' ----');
                    Backbone.history.navigate('#myApp/users', {trigger: true});
                },
                error: function(model, xhr){
                    alert(xhr.statusText);
                }
            });
        },
        onCancel: function (e) {
            e.stopPropagation();

            Backbone.history.navigate('#myApp/users', {trigger: true});
        },

        render: function () {
            this.$el.html(this.template());
        }
    });
});