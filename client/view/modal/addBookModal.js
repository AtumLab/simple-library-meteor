var error,
modal,
canvas,
img,
ctx;

Template.addBookModal.rendered = function(){
    var tmpl = this;
    // cache the dom
    modal = $(tmpl.find('#addBookModal'));
    error = $(tmpl.find('.error'));    
}
Template.addBookModalBody.helpers({
    status: function(){
        return BOOK.STATUS;
    }
});

Template.addBookModalBody.events({
    "change input[name=coverFile]": function(evt, tmpl){
        evt.preventDefault();
        var input = tmpl.find('input[name=coverFile]');
        if(input.files && input.files[0]){
            PSLFileReader.previewImage(input.files[0], function(err, file){
                if (err){
                    error.html(createAlertDanger(err.message));
                    Meteor.setTimeout(function(){
                        error.html('');
                    }, 5000);
                }
                else {
                    canvas = document.createElement("canvas");
                    img = document.createElement("img");
                    img.setAttribute('src', file.result);
                    //console.log(img);
                    canvas.width = 160;
                    canvas.height = 210;
                    ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 160, 210);
                    $(tmpl.find('#coverBookImg')).attr('src', canvas.toDataURL());
                }
            });
        }
    },
    'click #changeCoverButton': function(evt, tmp){
        evt.preventDefault();
        tmp.find('input[name=coverFile]').click();
    },
    'click #saveBookButton':  function(evt, tmp){
        evt.preventDefault();
        var book = {};
        book.cover = $('#coverBookImg').attr('src');
        book.author = tmp.find('#authorInput').value;
        book.title = tmp.find('#titleInput').value;
        book.status = tmp.find('#statusInput').value;
        book.description = tmp.find('#descriptionInput').value;
        try {
            check(book, validateBook);
            modal.modal('hide');
            Meteor.call('addBook', book, function (error, result) {
                if (error) {
                    modal.modal('show');
                    error.html(createAlertDanger(err.message));
                }
            });
        }
        catch (err) {
            error.html(createAlertDanger(err.message));
            Meteor.setTimeout(function(){
                error.html('');
            }, 5000);
        }
    },
});

/**
 * FUNCTION CLASS DEFINE
 */
var PSLFileReader = {
    previewImage: function(file, callback){
        var reader = new FileReader();
        reader.onload = function (e) {
            // check file
            if(!_.contains(FILEUPLOAD.IMG.TYPE, file.type)){
                callback(new Meteor.Error(412, "File format not supported. Please upload .jpg or .png"));
                return;
            }
            // check size
            if(file.size > FILEUPLOAD.IMG.MAXSIZE){
                callback(new Meteor.Error(412, "File is too large. 512kb size limit"));
                return;
            }
            file.result = e.target.result;
            callback(null, file);
        };
        reader.onerror = function () {
            callback(reader.error);
        };
        reader.readAsDataURL(file);
    }
};