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

});
