Template.generalModal.helpers({
  isAdmin: function(){
    return isAdmin();
  },
  isReferee: function(){
    return isReferee();
  },
  isGuest: function(){
    return isGuest();
  },
  isAmateur: function(){
    return isAmateur();
  },
  isPro: function(){
    return isPro();
  },
  isTrialpro: function(){
    return isTrialpro();
  },
  isAdminOrReferee: function(){
    return isAdmin()||isReferee();
  }
});