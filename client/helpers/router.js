Router.configure({
    layoutTemplate: 'layout',
    autoRender: false
});

Router.configure({
  notFoundTemplate: 'notFound' // this will render
});

// this hook will run on almost all routes
Router.before(checkLoggedIn, {except: ['login', 'signup', 'forgotPassword']});

Router.map(function () {
    /**
     * The route's name is "home"
     * The route's template is also "home"
     * The default action will render the home template
     */
    this.route('home', {
        path: '/',
        template: 'home'
    });

    /**
     * The route's name is "posts"
     * The route's path is "/posts"
     * The route's template is inferred to be "posts"
     */
    this.route('books', {
        path: '/books',
        template: 'books'
    });

    this.route('book', {
        path: '/books/:_id',
        load: function () {
            // called on first load
            console.log('load');
            Session.set('selectBookID', this.params._id);
        },

        // before hooks are run before your action
        before: [
            function () {
                var book = Books.findOne(this.params._id);
                if(!book)
                    this.subscribe('books', this.params._id).wait();
                //this.subscribe('posts'); // don't wait
            },

            function () {
                // we're done waiting on all subs
                if (this.ready()) {
                    //NProgress.done(); 
                } else {
                    //NProgress.start();
                    this.stop(); // stop downstream funcs from running
                }
            }
        ],

        action: function () {
            var params = this.params; // including query params
            var hash = this.hash;
            var isFirstRun = this.isFirstRun;
            
            this.render('book');
        },

        unload: function () {
            // before a new route is run
            Session.set('selectBookID', null);
        },
        data: function () {
            var params = this.params,
            book = Books.findOne(params._id);
            if(!book){
                this.render('notFound');
                // stop the rest of the before hooks and the action function 
                this.stop();
                return null;
            }
            else {
                var due = (book.status == BOOK.STATUS[1]) ? '' : 'disabled';
                return {
                    book: book,
                    isDue: due
                }
            }
        }

    });
});

function checkLoggedIn (){
    console.log('checkLoggedIn');
}