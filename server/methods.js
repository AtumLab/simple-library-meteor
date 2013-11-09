/**
 * Method
 */
Meteor.methods({
    borrowBook: function(idBook) {
        var id = this.userId;
        if (!id) {
            throw new Meteor.Error(403, "You must be logged in");
        }
        if(!isStudent())
            throw new Meteor.Error(403, "Your account does not support this feature");
        try {
        
        }
        catch (e) {
            throw e;
        }
    }
});