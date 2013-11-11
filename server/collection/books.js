BooksModal = {};
BooksModal.insert = function(book){
    try {
        check(book, validateBook);
        book.updated = new Date();
        return Books.insert(book);
    }
    catch (e) {
        throw e;
    }
}
BooksModal.update = function(id, book){
    try {
        check(book, validateBook);
        book.updated = new Date();
        return Books.update(id, book);
    }
    catch (e) {
        throw e;
    }
}