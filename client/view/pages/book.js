Template.booksOnRight.helpers({
    books: function(){
        return Books.find().fetch();
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