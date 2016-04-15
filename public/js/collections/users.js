define([
    'backbone',
    'model/user'
], function (Backbone, Model) {
    var Collection = Backbone.Collection.extend({
        model: Model,
        url  : '/users/',

        initialize: function (options) {
            var data = options ? options.data : {};
            var self = this;

            this.page = data.page || 1;
            this.count = data.count || 10; // best practice use constants

            this.on('add', function () {
                console.log('Added one model');
            });
            this.on('change', function () {
                console.log('Changed one model in collection');
            });
            this.on('remove', function () {
                console.log('Removed one model');
            });
            this.on('update', function () {
                console.log('Updated collection');
            });
            this.on('reset', function () {
                console.log('Reset collection');
            });

            this.fetchData(this.page, this.count, {
                success: function (model, xhr, options) {
                    console.log('--- Fetched ----');
                },
                error  : function (model, xhr, options) {
                    console.log('--- Fetched Error----')
                }
            });
        },

        fetchData: function (page, count, options) {
            var success = (options && options.success) || function () {};
            var error = (options && options.error) || function () {};

            if (!(typeof success === 'function')) {
                success = function () {
                };
            }
            if (!(typeof error === 'function')) {
                error = function () {
                };
            }

            this.fetch({
                reset  : true,
                data   : {
                    page: page,
                    count: count
                },//will send as query params
                success: success,
                error  : error
            });
        },

        nextPage: function(){
            var self = this;
            var page = this.page + 1;

            this.fetchData(page, this.count, {
                success: function (model, xhr, options) {
                    console.log('--- Fetched ----');
                    self.page = page;
                },
                error  : function (model, xhr, options) {
                    console.log('--- Fetched Error----')
                }
            });
        },
        prevPage: function(){
            var self = this;
            var page = this.page - 1;

            page = page || 1;
            
            this.fetchData(page, this.count, {
                success: function (model, xhr, options) {
                    console.log('--- Fetched ----');
                    self.page = page;
                },
                error  : function (model, xhr, options) {
                    console.log('--- Fetched Error----')
                }
            });
        }
    });

    return Collection;
});