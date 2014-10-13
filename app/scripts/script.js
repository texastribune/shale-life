function setHeight(target, reference) {
  var refHeight = $(reference).innerHeight();
  $(target).css('height', refHeight);
}

function setPosition(target, reference, x) {
  var refTop = $(reference).height();
  var refMargin = $(reference).css('margin-left');
  $(target).css('top', refTop + x).css('margin-left', refMargin);
}

function positionNav(x) {
    if (x.currentSlide === 0) {
      setPosition('.flex-next', '.flex-active-slide > .nav-ref', 35);
      setPosition('.flex-prev', '.flex-active-slide > .nav-ref', 35);
      $('.lead-header').css('background-color', 'rgba(26, 26, 26, 0)');
    } else {
      setPosition('.flex-next', '.flex-active-slide > .nav-ref', -60);
      setPosition('.flex-prev', '.flex-active-slide > .nav-ref', -60);
      $('.lead-header').css('background-color', 'rgba(26, 26, 26, .7)');
    }
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
  $('.video-wrapper').fitVids();

  $('#slideshow').flexslider({
    animation: 'slide',
    animationLoop: false,
    slideshow: false,
    controlNav: false,
    start: function(slider) {
      setHeight('#slideshow > .flex-viewport', '.flex-active-slide');
      positionNav(slider);
      $('.total-slides').text(slider.count-1);
    },
    after: function(slider) {
      setHeight('#slideshow > .flex-viewport', '.flex-active-slide');
      $('.current-slide').text(slider.currentSlide);
      positionNav(slider);
    }
  });

  $('.nav-slider').flexslider({
    animation: 'slide',
    animationLoop: false,
    slideshow: false,
    itemWidth: 200,
    itemMargin: 5
  });

  setHeight('.story-box', '.story');
  setHeight('.banner', window);


  $(window).resize(function() {
    setHeight('.banner', window);
    setHeight('.story-box', '.story');
    setHeight('#slideshow > .flex-viewport', '.flex-active-slide');

    setPosition('.flex-next', '.flex-active-slide > .nav-ref', 35);
    setPosition('.flex-prev', '.flex-active-slide > .nav-ref', 35);
  });
});
