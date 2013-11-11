Template.booksOnRight.helpers({
    books: function(){
        return Books.find({}, {sort: {updated: -1}}).fetch();
    }
});
Template.book.helpers({
    isStudent: function(){
        return isStudent();
    },
    isManager: function(){
        return isManager();
    }
});

Template.book.events({
    /**
    'click #borrowBookButton': function(evt, tmp){
        evt.preventDefault();
        var button = $(tmp.find('#borrowBookButton'));
        //button.prop('disabled', true);
        Meteor.call('borrowBook', this.book._id, function(err, res){
            console.log(err);
            console.log(res);

            //if(err)
            //if(res)
        });
    }
    */
});
