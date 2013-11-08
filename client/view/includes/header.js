Template.header.helpers({
    user: function(){
        return Meteor.user();
    },
    email: function(){
        var user = Meteor.user();
        if (user)
            return user.emails[0].address
        return '';
    }
});

Template.header.events({
    // was in client/misc/logout.js
    'click #logoutButton':function(event){
        event.preventDefault();
        Meteor.logout();
    }
});
