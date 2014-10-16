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

function setPosition(target, reference, x) {
  var refTop = $(reference).height();
  // var refMargin = $(reference).css('margin-left');
  $(target).animate({
    top: refTop + x
    // 'margin-left': refMargin
  }, 200);
}

function positionNav(klass) {
    var $e = $('.flex-active-slide > .' + klass);
    if ($e.hasClass('slide-box')) {
      setPosition('.flex-next', '.flex-active-slide > .nav-ref', 20);
      setPosition('.flex-prev', '.flex-active-slide > .nav-ref', 20);
      $('.lead-header').css('background-color', 'rgba(26, 26, 26, .7)');
    } else {
      setPosition('.flex-next', '.flex-active-slide > .nav-ref', 30);
      setPosition('.flex-prev', '.flex-active-slide > .nav-ref', 30);
      $('.lead-header').css('background-color', 'rgba(26, 26, 26, 0)');
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
      positionNav('nav-ref');
      $('.total-slides').text(slider.count-1);
    },
    after: function(slider) {
      setHeight('#slideshow > .flex-viewport', '.flex-active-slide');
      $('.current-slide').text(slider.currentSlide);
      positionNav('nav-ref');
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
  setHeight('.landing-banner', window);

  // var $container = $('#landing-grid').masonry();

  // // layout Masonry again after all images have loaded
  // $container.imagesLoaded( function() {
  //   $container.masonry({
  //     itemSelector: '.thumbnail',
  //     columnWidth: 100,
  //     gutterWidth: 0
  //   });
  // });

  setThumbnails();
});

var waitForIt = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout (timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();

$(window).resize(function() {
  setHeight('.landing-banner', window);
  $('.lead-header').css('max-width', $(window).outerWidth());
  waitForIt(function(){
    positionNav('nav-ref');
    setHeight('.story-box', '.story');
    setHeight('#slideshow > .flex-viewport', '.flex-active-slide');
  }, 200, "some unique string");

  setThumbnails();
});
