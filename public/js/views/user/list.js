define([
    'backbone',
    'underscore',
    'collections/user',
    'text!templates/users/listHeader.html',
    'views/user/listItem'
], function(Backbone, _, Users, header, ListItem){
    return Backbone.View.extend({
        el: '#container',
        template: _.template(header),
        events: {
            'click li': 'onLiClick'
        },

        initialize: function(opt){
            this.collection = new Users();

            this.collection.fetch({reset: true});
            this.collection.on('reset', this.render, this);
        },

        onLiClick: function(e){
            e.stopPropagation();
        },

        render: function(){
            this.$el.html(this.template());

            this.collection.each(function(model){
                var view = new ListItem({model: model});
            });
        }
    });
});