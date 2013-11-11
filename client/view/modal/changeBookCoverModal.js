/**
 * HELPERS
 */

var x, // x position of crop image
y, // y position of crop image
width, // width of crop image
height, // height of crop image
error, // 
saveAvatarButton,
modal,
realImage,
displayImage, 
isShowCropAndButton = false,

widthAvatar = 160,
heightAvatar = 230;

Template.changeBookCoverModalBody.image = function(){
  return Meteor.user().profile.image; 
}
Template.changeBookCoverModal.rendered = function(){
    //console.log('[changeBookCoverModal].rendered');
    var tmpl = this;
    // cache the dom
    modal = $(tmpl.find('#changeBookCoverModal'));
    error = $(tmpl.find('.error'));
    saveAvatarButton = $(tmpl.find('#saveAvatarButton'));
    propSaveAvatarButton(false);
    realImage = tmpl.find('#realImage');

    modal.on('hide.bs.modal', function () {
        clear();
    });
    modal.on('show.bs.modal', function () {
        loadImage(tmpl, Meteor.user().profile.image);
        $(function () {
            displayImage.imgAreaSelect({ aspectRatio: '1:1', handles: true,
            fadeSpeed: 200, onSelectChange: preview });
        });
    });
}
Template.changeBookCoverModalBody.rendered = function(){
    displayImage = $(this.find('#avatarUserImg'));
    $(function () {
        displayImage.imgAreaSelect({ aspectRatio: '1:1', handles: true,
        fadeSpeed: 200, onSelectChange: preview });
    }); 
}
/**
 * EVENTS
 */
Template.changeBookCoverModalBody.events({
    "change input[name=avatarFile]": function(evt, tmpl){
        evt.preventDefault();
        var input = tmpl.find('input[name=avatarFile]');
        if(input.files && input.files[0]){
            PSLFileReader.previewImage(input.files[0], function(err, file){
                if (err){
                    console.log(err);
                    error.html(createAlertDanger(err.message));
                    Meteor.setTimeout(function(){
                        error.html('');
                    }, 5000);
                }
                else {
                    console.log(file);
                    loadImage(tmpl, file.result);
                    $(function () {
                        displayImage.imgAreaSelect({ aspectRatio: '1:1', handles: true,
                        fadeSpeed: 200, onSelectChange: preview });
                    });
                }
            });
        }
    },
    'click #changeAvatarButton': function(evt, tmp){
        evt.preventDefault();
        tmp.find('input[name=avatarFile]').click();
    }
});
Template.changeBookCoverModal.events({
    'click #saveAvatarButton': function(evt, tmp){
        evt.preventDefault();

        var canvas = document.createElement("canvas");
        canvas.width = widthAvatar;
        canvas.height = heightAvatar;
        var scaleX = realImage.width / displayImage.width();
        var scaleY = realImage.height / displayImage.height();
        var ctx = canvas.getContext("2d");
        ctx.drawImage(realImage, x*scaleX, y*scaleY, width*scaleX, height*scaleY, 0, 0, widthAvatar, heightAvatar);
        //console.log(canvas.toDataURL());
        Meteor.call('updateAvatar', canvas.toDataURL(), function(err, res){
            if (err){
                console.log('err', err);
                error.html(createAlertDanger(err.message));
                Meteor.setTimeout(function(){
                    error.html('');
                }, 5000);
            }
            else {
                console.log('res', res);
                modal.modal('hide');
            }
        });
    }
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
                //callback(new Meteor.Error(412, "not supported file type "+ file.type));
                callback(new Meteor.Error(412, "File format not supported. Please upload .jpg or .png"));
                return;
            }
            // check size
            if(file.size > FILEUPLOAD.IMG.MAXSIZE){
                //callback(new Meteor.Error(412, "over size !!!"));
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

function preview(img, selection) {
    if (!selection.width || !selection.height)
        return;
    var scaleX = widthAvatar / selection.width;
    var scaleY = heightAvatar / selection.height;
    $('#preview img').css({
        width: Math.round(scaleX * img.width),
        height: Math.round(scaleY * img.height),
        marginLeft: -Math.round(scaleX * selection.x1),
        marginTop: -Math.round(scaleY * selection.y1)
    });
    x = selection.x1;
    y = selection.y1;
    width = selection.width;
    height= selection.height;
    if(!isShowCropAndButton){
        open();
    }
};

function propSaveAvatarButton(bool){
    if(saveAvatarButton)
        saveAvatarButton.prop('disabled', !bool);
};

function loadImage(tmp, src){
    $(tmp.find('#avatarUserImg')).attr('src', src);
    $(tmp.find('#preview img')).attr('src', src);
    $(tmp.find('#realImage')).attr('src', src);
};

function open(){
    propSaveAvatarButton(true);
    $('#previewFrame').removeClass('hide');
    isShowCropAndButton = true;
}
function clear(){
    // hide crop area
    $('.imgareaselect-border1').parent().hide();
    $('.imgareaselect-outer').hide();
    isShowCropAndButton = false;
    $('#previewFrame').addClass('hide');
    // reset input
    //http://stackoverflow.com/questions/16452699/how-to-reset-a-form-using-jquery-with-reset-method
    var inputAvatar = $('input[name=avatarFile]');
    inputAvatar.wrap('<form>').closest('form').get(0).reset();
    inputAvatar.unwrap();
}