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
            var book = Books.findOne(idBook);
            if(!book)
                throw new Meteor.Error(404, 'The book dont exists.');
            Books.update(idBook, {$set: {status: BOOK.STATUS[0]}});
            return true;   
        }
        catch (e) {
            throw e;
        }
    },
    insertAccount: function(object) {
        var id = this.userId;
        if (!id) {
            throw new Meteor.Error(403, "You must be logged in");
        }
        if(!isManager())
            throw new Meteor.Error(403, "Your account does not support this feature");

        // validation
        check(object, validateUser);
        var role = object.roles;
        object.roles = null;
        var newID = Accounts.createUser(object);
        // add roles
        Roles.addUsersToRoles(newID, role);
        return true;
    }
});