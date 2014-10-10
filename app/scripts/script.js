function setHeight(target, reference) {
  var refHeight = $(reference).innerHeight();
  $(target).css('min-height', refHeight);
}

function setPosition(target, reference, x) {
  var refPosition = $(reference).height() + x;
  $(target).css('top', refPosition);
}

function setLead () {
  var leadHeight = $('.story-box').height() + $('.lead-header').height();
  $('.lead-content').css('height', leadHeight);
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

  $('.slideshow').flexslider({
    animation: 'slide',
    animationLoop: false,
    slideshow: false,
    controlNav: false,
    start: function(slider) {
      setPosition('.flex-next', '.flex-active-slide', 0);
      setPosition('.flex-prev', '.flex-active-slide', 0);
      setHeight('.story-box', '.story');
      setPosition('.story-box', '.lead-header');
      setLead();
      $('.total-slides').text(slider.count-1);
    },
    after: function(slider) {
      setPosition('.flex-next', '.flex-active-slide', 0);
      setPosition('.flex-prev', '.flex-active-slide', 0);
      setPosition('.story-box', '.lead-header');
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
    setPosition('.story-box', '.lead-header', 0);
    setLead();
  });
});
