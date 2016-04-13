define([
    'backbone'
], function(Backbone){
    return Backbone.Router.extend({
        view: null,

        routes: {
            'myApp/login': 'login',
            'myApp/:content': 'contentRouter',
            'myApp/users/create': 'createUser',
            '*any': 'default'
        },

        contentRouter: function(content){
            var self = this;
            var collectionUrl = 'collections/' + content;
            var viewUrl = 'views/' + content + '/list';

            function viewCreator(){
                var collection = this;

                require([
                    viewUrl
                ], function(View){
                    if(self.view){
                        self.view.undelegateEvents();
                    }

                    self.view = new View({collection: collection});
                });
            }
            
            require([
                collectionUrl
            ], function(Collection){
               var collection = new Collection();

                collection.fetch({reset: true});
                collection.on('reset', viewCreator, collection)
            });
        },
        login: function(){
            var self = this;

            require([
                'views/login'
            ], function(Login){
                if(self.view){
                    self.view.undelegateEvents();
                }

                self.view = new Login();
            });
        },
        createUser: function(){
            var self = this;

            require([
                'views/users/create'
            ], function(CreateView){
                if(self.view){
                    self.view.undelegateEvents();
                }

                self.view = new CreateView();
            });
        },
        default: function(){
            console.log('I\'m in default');
        }
    });
});