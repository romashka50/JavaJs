define([
    'backbone',
    'underscore',
    'text!templates/users/list.html'
], function(Backbone, _, listBody){
    return Backbone.View.extend({
        el: '#content',
        template: _.template(listBody),
        events: {
            'click li': 'onLiClick'
        },

        initialize: function(opt){
            this.render();
        },

        onLiClick: function(e){
            e.stopPropagation();
        },

        render: function(){
            this.$el.append(this.template(this.model.toJSON()));
        }
    });
});