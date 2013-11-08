Template.booksOnRight.helpers({
    books: function(){
        return Books.find().fetch();
    }
});