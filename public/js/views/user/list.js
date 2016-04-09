define([
    'backbone',
    'collections/user'
], function(Backbone, Users){
    return Backbone.View.extend({
        /*el: '#container'*/
        tagName: 'ul',
        className: 'my-class',
        id: 'temp',
        attributes: {
            'data-name': 'temp'
        }
    });
});