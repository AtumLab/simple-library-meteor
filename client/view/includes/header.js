Template.header.helpers({
    user: function(){
        return Meteor.user();
    },
    email: function(){
        var user = Meteor.user();
        if (user)
            return user.emails[0].address
        return '';
    },
    isStudent: function(){
        return isStudent();
    },
    isManager: function(){
        return isManager();
    }
});

Template.header.events({
    // was in client/misc/logout.js
    'click #logoutButton':function(event){
        event.preventDefault();
        Meteor.logout();
    }
});
