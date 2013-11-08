var root = this;
// Validate emails when entered by user
function checkEmail(email){
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
    return email && email.match(regex);
};

root.isValidEmail = function(emails){
    var result = true;
    if(_.isString(emails)){
        emails = emails.trim();
        result = checkEmail(emails);
    }
    else if(_.isArray(emails)){
        _.each(emails, function(n){
            if(!_.isString(n) || !checkEmail(n)){
                result = false;
            }
        });    
    }
    else {
        result = false;
    }
    return !!result;
};