$(document).ready(function() {
    $('.new-tweet').on('keyup', function() {
      var max = 140;
      var len = $(this).find('textarea').val().length;
      var remainingChars = $(this).find('.counter');
      console.log(len)
      remainingChars.text(max - len);
      if(len >= max) {
        remainingChars.addClass("lblCountRed");
        } else {
        remainingChars.removeClass('lblCountRed');
        }
    });
});