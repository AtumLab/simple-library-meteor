var root = this;

root.createAlert = {
    'error' : function(message) {
        return '<div class="alert alert-danger">' + message + '</div>';
    },
    'success' : function(message) {
        return '<div class="alert alert-success">' + message + '</div>';
    },
    'alert' : function(message) {
        return '<div class="alert alert-warning">' + message + '</div>';
    },
    'info' : function(message) {
        return '<div class="alert alert-info">' + message + '</div>';
    }
};
createAlertDanger = function(message) {
    return createAlert['error'](message);
}
createAlertSuccess = function(message) {
    return createAlert['success'](message);
}
createAlertInfo = function(message){
    return createAlert['info'](message);
}

root.emailVerified = function (user) {
    return _.some(user.emails, function (email) {
        return email.verified;
    });
}

/**
 * handlebars helpers
 */
if (typeof Handlebars !== 'undefined') {
    Handlebars.registerHelper('safeString', function(str) {
        return new Handlebars.SafeString(str);
    });

    Handlebars.registerHelper('moment', function (time, format) {
        var t = moment(time)
        return t.format(format);
    });
}