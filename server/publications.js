Meteor.publish("books",function(id){
	if(id)
		Books.find(id);
    return Books.find({});
});
