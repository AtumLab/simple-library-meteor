// application subscriptions
var bookComputation = Deps.autorun(function () {
	Meteor.subscribe('books', {
        onError: function(){console.log("[ board.js ]","Deps.subscribe.gameBoards.ERROR")},
        onReady: function(){console.log("[ board.js ]","Deps.subscribe.gameBoards.READY")}
    });
});