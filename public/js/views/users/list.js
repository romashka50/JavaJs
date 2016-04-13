define([
    'backbone',
    'underscore',
    'collections/users',
    'text!templates/users/listHeader.html',
    'views/baseList'
], function (Backbone, _, Users, header, BaseList) {
    return BaseList.extend({
        contentType      : 'users',
        template: _.template(header)
    });
});