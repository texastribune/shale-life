function setHeight(target, reference) {
  var refHeight = $(reference).innerHeight();
  $(target).css('height', refHeight);
}

function setPosition(target, reference) {
  var refPosition = $(reference).height();
  $(target).css('top', refPosition);
}

// Not currently using
// function setLead () {
//   var leadHeight = $('.story-box').height() + $('.lead-header').height();
//   $('.lead-content').css('height', leadHeight);
// }

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

  $('.slideshow').flexslider({
    animation: 'slide',
    animationLoop: false,
    slideshow: false,
    controlNav: false,
    start: function(slider) {
      setHeight('.flex-viewport', '.flex-active-slide');
      setPosition('.flex-next', '.flex-active-slide > .slideshow-main');
      setPosition('.flex-prev', '.flex-active-slide > .slideshow-main');
      setHeight('.story-box', '.story');
      $('.total-slides').text(slider.count-1);
    },
    after: function(slider) {
      setHeight('.flex-viewport', '.flex-active-slide');
      setPosition('.flex-next', '.flex-active-slide > .slideshow-main');
      setPosition('.flex-prev', '.flex-active-slide > .slideshow-main');
      // setPosition('.story-box', '.flex-active-slide', 0);
      $('.current-slide').text(slider.currentSlide);

    }
  });

  $('.nav-slider').flexslider({
    animation: 'slide',
    animationLoop: false,
    slideshow: false,
    itemWidth: 200,
    itemMargin: 5
  });

  setHeight('.banner', window);


  $(window).resize(function() {
    setHeight('.banner', window);
    setHeight('.story-box', '.story');
  });
});
