function setHeight(target, reference) {
  refHeight = $(reference).innerHeight();
  $(target).css('min-height', refHeight);
}

function setPosition(target, reference) {
  refPosition = $(reference).height();
  $(target).css('top', refPosition);
}

$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
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

  setHeight('.banner', window);
  setHeight('.story-box', '.story');
  setPosition('.story-box', '.lead-header');

  $(window).resize(function() {
    setHeight('.banner', window);
  });
});
