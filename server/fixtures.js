var rootURL = Meteor.absoluteUrl(),
Users = Meteor.users;
function loadUsers (){
    if (!Users.findOne({username: 'admin'})) {
        console.log('--process : add users');
        Accounts.createUser({
            username: 'admin',
            password: 'admin',
            email: 'particle4dev@gmail.com',
            profile: {
                first_name: 'hoang',
                last_name: 'le'
            }
        });
    }
}
function loadBooks(){
    if (Books.find().count() == 0) {
        console.log('--process : add books collection');
        [
            {
                author: 'author',
                title: 'title',
                status: BOOK.STATUS[1],
                description: 'description',
                cover: '/img/1.jpg'//'img base64'
            },
            {
                author: 'author',
                title: 'title',
                status: BOOK.STATUS[0],
                description: 'description',
                cover: '/img/2.jpg'//'img base64'
            },
            {
                author: 'author',
                title: 'title',
                status: BOOK.STATUS[1],
                description: 'description',
                cover: '/img/3.jpg'//'img base64'
            },
            {
                author: 'author',
                title: 'title',
                status: BOOK.STATUS[0],
                description: 'description',
                cover: '/img/4.jpg'//'img base64'
            },
            {
                author: 'author',
                title: 'title',
                status: BOOK.STATUS[1],
                description: 'description',
                cover: '/img/5.jpg'//'img base64'
            },
            {
                author: 'author',
                title: 'title',
                status: BOOK.STATUS[1],
                description: 'description',
                cover: '/img/6.jpg'//'img base64'
            }
        ].forEach(function(book) {
            Books.insert(book);
        });
    }
}
Meteor.startup(function () {
    // Now load data
    loadUsers();
    loadBooks();
});