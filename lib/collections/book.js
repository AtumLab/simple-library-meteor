Books = new Meteor.Collection('books');
Books.deny({
    insert: function(){return true; },
    update: function(){return true; },
    remove: function(){return true; }
});