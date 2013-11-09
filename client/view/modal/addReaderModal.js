/**
 * HELPERS
 */
var options = {},
modal,
error,
timeOut = 5000;
Template.addReaderModal.rendered = function ( ) { 
    var tmpl = this;
    modal = $('#addReaderModal');
    error = $(tmpl.find('.alert-error'));
}

Template.addReaderModalBody.helpers({
    roles: function(){
        return USER.ROLES;
    }
});

/**
 * EVENTS
 */
Template.addReaderModal.events({
    'click #createReaderButton':function(evt, tmp){
        evt.preventDefault();
        options = {};

        options.email = tmp.find('#emailReaderInput').value.trim(),
        options.password = tmp.find('#passwordReaderInput').value,
        options.username = tmp.find('#usernameReaderInput').value.trim(),
        options.profile = {};
        options.profile.firstName = tmp.find('#firstnameReaderInput').value.trim(), 
        options.profile.lastName = tmp.find('#lastnameReaderInput').value.trim(),
        options.roles = tmp.find('#rolesReaderSelect').value.trim();
        try {
            check(options, validateUser);
            modal.modal('hide');
            setTimeout(function(){
                Meteor.call('insertAccount', options, function (error, result) {
                    if (error) {
                        modal.modal('show');
                        showError(error.message);
                    } else {

                    }
                });
            }, 500);
        }
        catch( e ){
            showError(e.message);
        }
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