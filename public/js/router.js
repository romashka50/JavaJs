define([
    'backbone'
], function (Backbone) {
    return Backbone.Router.extend({
        view: null,

        routes: {
            'myApp/login'                        : 'login',
            'myApp/:content(/p=:page)(/c=:count)': 'contentRouter',
            'myApp/users/create'                 : 'createUser',
            '*any'                               : 'default'
        },

        initialize: function (options) {
            this.channel = options.channel;

            this.channel.on('customEvent', function (a, b, c) {
                console.log(a, b, c);
            });
        },

        contentRouter: function (content, page, count) {
            var self = this;
            var collectionUrl = 'collections/' + content;
            var viewUrl = 'views/' + content + '/list';

            console.log('p=', page, 'c=', count);

            function viewCreator() {
                var collection = this;

                require([
                    viewUrl
                ], function (View) {
                    if (self.view) {
                        self.view.undelegateEvents();
                    }

                    self.view = new View({collection: collection, channel: self.channel});
                });
            }

            require([
                collectionUrl
            ], function (Collection) {
                var collection;

                page = page || 1;
                count = count || 10;

                collection = new Collection({
                    reset: true,
                    data : {
                        page : page,
                        count: count
                    }
                });

                collection.on('reset', viewCreator, collection);
            });
        },
        login        : function () {
            var self = this;

            require([
                'views/login'
            ], function (Login) {
                if (self.view) {
                    self.view.undelegateEvents();
                }

                self.view = new Login();
            });
        },
        createUser   : function () {
            var self = this;

            require([
                'views/users/create'
            ], function (CreateView) {
                if (self.view) {
                    self.view.undelegateEvents();
                }

                self.view = new CreateView();
            });
        },
        default      : function () {
            console.log('I\'m in default');
        }
    });
});