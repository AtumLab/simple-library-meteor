isStudent = function(){
    return isRoles(USER.ROLES[1]);
}
isManager = function(){
    return isRoles(USER.ROLES[0]);
}
var isRoles = function(role){
    var loggedInUser = Meteor.user();
    if(!_.isArray(role)){
        role = [role];
    }
    if(!loggedInUser)
        return false;
    if (Roles.userIsInRole(loggedInUser, role)) {
        return true;
    }
    return false;
}