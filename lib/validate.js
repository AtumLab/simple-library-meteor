validString = Match.Where(function (x) {
    check(x, String);
    return (x.length > 0) && (x.length < 255);  //Do we need longer strings?
});

validEmail = Match.Where( function( email ){
	check(email, String);
	if(! isValidEmail(email))
		throw new Match.Error("Email don't match");
	return true;
});

validateUser = Match.Where( function( options ){
	check(options, Match.ObjectIncluding({
        username: validString,
        password: validString,
        email: validEmail,
        profile: Object
    }));

	return _.contains(USER.ROLES, options.roles);
});

validateBook = Match.Where( function( options ){
    check(options, Match.ObjectIncluding({
        cover: String,
        author: validString,
        title: validString,
        status: validString,
        description: String
    }));

    return true;
});