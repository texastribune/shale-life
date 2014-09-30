$(document).ready(function() {
  $(".video-wrapper").fitVids();

  $('.flexslider').flexslider({
    animation: "slide",
    animationLoop: true,
    itemWidth: 210,
    itemMargin: 5
  });

  function setHeight() {
    windowHeight = $(window).innerHeight();
    $('.banner').css('min-height', windowHeight);
  };
  setHeight();
  
  $(window).resize(function() {
    setHeight();
  });
});
