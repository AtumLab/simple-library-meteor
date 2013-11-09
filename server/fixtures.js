var rootURL = Meteor.absoluteUrl(),
Users = Meteor.users;
function loadUsers (){
    console.log('--process : add users');
    var id;
    if (!Users.findOne({username: 'admin'})) {
        id = Accounts.createUser({
            username: 'admin',
            password: 'admin',
            email: 'admin@gmail.com',
            profile: {
                first_name: 'hoang',
                last_name: 'le'
            }
        });
        //add role
        Roles.addUsersToRoles(id, USER.ROLES[0]);
    }
    if (!Users.findOne({username: 'reader'})) {
        id = Accounts.createUser({
            username: 'reader',
            password: 'reader',
            email: 'reader@gmail.com',
            profile: {
                first_name: 'hoang',
                last_name: 'le'
            }
        });
        //add role
        Roles.addUsersToRoles(id, USER.ROLES[1]);
    }
}
function loadBooks(){
    console.log('--process : add books collection');
    if (Books.find().count() == 0) {
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