function setHeight() {
  windowHeight = $(window).innerHeight();
  $('.banner').css('min-height', windowHeight);
};






$(document).ready(function() {
  $(".video-wrapper").fitVids();

  setHeight();
  
  $(window).resize(function() {
    setHeight();
  });

  var $container = $('#story-boxes').masonry();
// layout Masonry again after all images have loaded
  $container.imagesLoaded( function() {
    $container.masonry({
      itemSelector: '.story-box'
    });
  });

});
