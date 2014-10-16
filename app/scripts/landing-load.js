function setHeight(target, reference) {
  var refHeight = $(reference).innerHeight();
  $(target).css('height', refHeight);
}

function setThumbnails() {
  var refWidth = $('.square').width();
  $('.square').css('height', refWidth);
  $('.tall').css('height', refWidth*2);
  $('.wide').css('height', refWidth);
  $('.lg-square').css('height', refWidth*2);
}

$(document).ready(function() {
  setThumbnails();
  setHeight('.landing-banner', window);
});

$(window).resize(function() {
  setThumbnails();
  setHeight('.landing-banner', window);
});
