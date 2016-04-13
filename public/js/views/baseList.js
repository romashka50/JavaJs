define([
    'backbone',
], function (Backbone) {
    return Backbone.View.extend({
        el      : '#container',
        events  : {
            'click #createBtn': 'onCreate',
            'click #editBtn'  : 'onEdit',
            'click #removeBtn': 'onRemove'
        },

        initialize: function (opt) {
            this.render();
        },

        onCreate: function (e) {
            var navigateUrl = '#myApp/' + this.contentType + '/create';
            
            e.stopPropagation();

            Backbone.history.navigate(navigateUrl, {trigger: true});
        },
        onEdit: function (e) {
            e.stopPropagation();
        },
        onRemove: function (e) {
            var $target = $(e.target);
            var $tr = $target.closest('tr');
            var userId = $tr.attr('id');
            var model = this.collection.get(userId);

            e.stopPropagation();

            if (!model){
                return false;
            }

            model.destroy({
                wait: true,
                success: function(model){
                    console.log('-- Removed ' + model.id + ' ----');
                    Backbone.history.fragment = '';
                    Backbone.history.navigate('#myApp/users', {trigger: true});
                },
                error: function(model, xhr){
                    alert(xhr.statusText);
                }
            });
        },

        render: function () {
            this.$el.html(this.template({collection: this.collection.models}));
        }
    });
});