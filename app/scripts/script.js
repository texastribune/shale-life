function setHeight() {
  windowHeight = $(window).innerHeight();
  $('.banner').css('min-height', windowHeight);
};

$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

$(document).ready(function() {
  $(".video-wrapper").fitVids();

  $('.flexslider').flexslider({
    animation: "slide",
    animationLoop: false,
    slideshow: false,
    itemWidth: 200,
    itemMargin: 5
  });

  setHeight();

  $(window).resize(function() {
    setHeight();
  });
});
