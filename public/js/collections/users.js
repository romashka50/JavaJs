define([
    'backbone',
    'model/user'
], function(Backbone, Model){
    var Collection = Backbone.Collection.extend({
        model: Model,
        url: '/users/',

        initialize: function(options){
            this.on('add', function(){
                console.log('Added one model');
            });
            this.on('change', function(){
                console.log('Changed one model in collection');
            });
            this.on('remove', function(){
                console.log('Removed one model');
            });
            this.on('update', function(){
                console.log('Updated collection');
            });
            this.on('reset', function(){
                console.log('Reset collection');
            });

            this.fetch({
                reset: true,
                data: {a: [10, 20], b: 20},//will send as query params
                success: function(model, xhr, options){
                    console.log('--- Fetched ----');
                },
                error: function(model, xhr, options) {
                    console.log('--- Fetched Error----')
                }
            });
        }
    });

    return Collection;
});