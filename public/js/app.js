var Model = Backbone.Model.extend({
    idAttribute: '_id', //id

    defaults: {
        firstName: '',
        lastName: 'Pupkin',
        dateOfBirth: new Date(),
        posts: [],
        friends: []
    },

    parse: function (resp) {
        resp.a = 500;

        return resp;
    },

    validate: function(attrs){
        if(attrs.dateOfBirth) {
            if((Date.now() - attrs.dateOfBirth) < 567648000000){
                return 'This service is available only for > 18';
            }
        }
    },

    urlRoot: function(){
        return '/users/'
    },

    initialize: function (options) {
        this.a = options.a;
        this.b = 300;

        this.on('invalid', function(model, error){
            console.log('Invalid model ' + error);
        });
    }
});

var user = new Model({a: 100, firstName: 'Ivan'}, {parse: true});