Template.borrowBookModal.events({
    'click #borrowBookButton': function(evt, tmp){
        evt.preventDefault();
        var button = $(tmp.find('#borrowBookButton'));
        button.prop('disabled', true);
        var bookID = Session.get('selectBookID');
        if(bookID)
            Meteor.call('borrowBook', bookID, function(err, res){
                button.prop('disabled', false);
                $('#borrowBookModal').modal('hide');
            });
    }
});