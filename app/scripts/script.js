function setHeight() {
  windowHeight = $(window).innerHeight();
  $('.grand-header-image').css('min-height', windowHeight);
  $('.image-replace').css('min-height', windowHeight);
};

$(document).ready(function() {
  $(".video-wrapper").fitVids();

  $('.flexslider').flexslider({
    animation: "slide",
    animationLoop: true,
    itemWidth: 210,
    itemMargin: 5
  });

  setHeight();
  
  $(window).resize(function() {
    setHeight();
  });
});
