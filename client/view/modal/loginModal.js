/**
 * HELPERS
 */
var options = {},
modal,
error,
timeOut = 5000;
Template.loginModal.created = function ( ) { 
    //console.log('loginModal.created');
}
Template.loginModal.rendered = function ( ) { 
    //console.log('loginModal.rendered');
    var tmpl = this;
    modal = $('#loginModal');
    error = $(tmpl.find('.alert-error'));
}
Template.loginModal.destroyed = function ( ) { 
    //console.log('loginModal.destroyed');
}

/**
 * EVENTS
 */
Template.loginModal.events({
    'click #loginButton':function(evt, tmp){
        evt.preventDefault();
        options = {};

        var email = tmp.find('#emailLoginInput').value.trim(),
        password = tmp.find('#passwordLoginInput').value;
        
        if(email.indexOf('@') == -1){
            options = {username: email};
        }
        else {
            if (email !== null ) {
                if (!validateEmail(email))
                    options = {username: email};
                else
                    options = {email: email};
            }
        }

        modal.modal('hide');
        setTimeout(function(){
            Meteor.loginWithPassword(options, password, function (error, result) {
                if (error) {
                    modal.modal('show');
                    showError(error.message);
                } else {
                    //TODO:                     
                }
            });
        }, 500);

    }
});
/**
 * FUNCTION CLASS DEFINE
 */
function showError(message){
    error.html(createAlertDanger(message));
    Meteor.setTimeout(function(){
        error.html('');
    }, timeOut);
}