var error,
modal,
canvas,
img,
ctx;

Template.editBookModal.rendered = function(){
    var tmpl = this;
    // cache the dom
    modal = $(tmpl.find('#editBookModal'));
    error = $(tmpl.find('.error'));

    var option = Books.findOne(Session.get('selectBookID')).status;
    $('#statusInput option:eq('+option+')').prop('selected', true); 
}
Template.editBookModalBody.helpers({
    status: function(){
        return BOOK.STATUS;
    },
    book: function(){
        return Books.findOne(Session.get('selectBookID'));
    }
});

Template.editBookModalBody.events({
    "change input[name=coverEditFile]": function(evt, tmpl){
        evt.preventDefault();
        var input = tmpl.find('input[name=coverEditFile]');
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
                    $(tmpl.find('#coverEditBookImg')).attr('src', canvas.toDataURL());
                }
            });
        }
    },
    'click #changeCoverEditButton': function(evt, tmp){
        evt.preventDefault();
        tmp.find('input[name=coverEditFile]').click();
    },
    'click #saveBookButton':  function(evt, tmp){
        evt.preventDefault();
        var book = {};
        book.cover = $('#coverEditBookImg').attr('src');
        book.author = tmp.find('#authorEditInput').value;
        book.title = tmp.find('#titleEditInput').value;
        book.status = tmp.find('#statusEditInput').value;
        book.description = tmp.find('#descriptionEditInput').value;
        try {
            check(book, validateBook);
            modal.modal('hide');
            var _id = Books.findOne(Session.get('selectBookID'))._id;
            Meteor.call('updateBook', _id, book, function (error, result) {
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