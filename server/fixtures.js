var rootURL = Meteor.absoluteUrl(),
Users = Meteor.users;
function loadUsers (){
    if (!Users.findOne({username: 'admin'})) {
        Accounts.createUser({
            username: 'admin',
            password: 'admin',
            email: 'particle4dev@gmail.com',
            profile: {
                first_name: 'hoang',
                last_name: 'le'
            }
        });
    }
}

Meteor.startup(function () {
    // Now load data
    loadUsers();
});