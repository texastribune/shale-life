'use strict';

// Set element height based on height of reference element
function setHeight(target, reference) {
  var refHeight = $(reference).innerHeight();
  $(target).css('height', refHeight);
}


// Set position of Slideshow direction buttons
function setPosition(targetA, targetB, reference, x) {
  var refTop = $(reference).height();
  $(targetA).animate({
    top: refTop + x
  }, 200);
  $(targetB).animate({
    top: refTop + x
  }, 200);
}

// Change slideshow direction button positions
// Depending on whether flex-active-slide is lead or regular img slide
function positionNav(klass) {
    var $e = $('.flex-active-slide > .' + klass);
    var next = $('.slideshow').find('.flex-next');
    var prev = $('.slideshow').find('.flex-prev');

    if ($e.hasClass('slide-box')) {
      setPosition(next, prev, '.flex-active-slide > .nav-ref', 25);
      $('.lead-header').css('background-color', 'rgba(26, 26, 26, .7)');
      $(next).css('left', '4em');
    } else {
      setPosition(next, prev, '.flex-active-slide > .nav-ref', 40);
      $(next).css('left', '0');
      $('.lead-header').css('background-color', 'rgba(26, 26, 26, 0)');
    }
}

$(document).ready(function() {

  //Create flexsliders
  // Top slideshow
  $('#slideshow').flexslider({
    animation: 'slide',
    animationLoop: false,
    slideshow: false,
    controlNav: false,
    touch: true,
    //Position direction buttons on start
    start: function(slider) {
      setHeight('#slideshow > .flex-viewport', '.flex-active-slide');
      positionNav('nav-ref');
      $('.total-slides').text(slider.count-1);
    },
    before: function(slider) {
      $('.slideshow-caption').css('visibility', 'hidden');
      $('.share-story').css('visibility', 'hidden');
    },
    // Re-position direction buttons after slide switches
    after: function(slider) {
      $('.slideshow-caption').css('visibility', 'visible');
      $('.share-story').css('visibility', 'visible');
      setHeight('#slideshow > .flex-viewport', '.flex-active-slide');
      $('.current-slide').text(slider.currentSlide);
      positionNav('nav-ref');
    }
  });

  // Story navigation carousel
  $('.nav-slider').flexslider({
    animation: 'slide',
    animationLoop: false,
    slideshow: false,
    itemWidth: 200,
    itemMargin: 5
  });

});

$('.video').magnificPopup({
  type: 'iframe',
  iframe: {
    markup: '<div class="mfp-iframe-scaler">'+
                '<div class="mfp-close"></div>'+
                '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
              '</div>',
    patterns: {
      youtube: {
        index: 'youtube.com/',
        id: 'v=',
        src: '//www.youtube.com/embed/%id%?autoplay=1&controls=2&enablejsapi=1&modestbranding=1&rel=0&showinfo=0'
      }
    },
    srcAction: 'iframe_src'
  }
});

// Reset heights/positions on window resize
$(window).resize(function() {
  $('.lead-header').css('max-width', $(window).outerWidth());
  positionNav('nav-ref');
  setHeight('#slideshow > .flex-viewport', '.flex-active-slide');
});

$(window).on( 'orientationchange', function() {
  $('.lead-header').css('max-width', $(window).outerWidth());
  positionNav('nav-ref');
  setHeight('#slideshow > .flex-viewport', '.flex-active-slide');
});
