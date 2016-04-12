/*
var user = new Model({a: 100, firstName: 'Ivan'}, {parse: true});

//var users = new Collection(user);
var users = new Collection({firstName: 'Petya'});

//users.fetch({reset: true});
*/

define(['views/user/list'], function(UserList){
    function init(){
        var user = new UserList();
    }
    
    
    return {
        initialize: init
    }
});
