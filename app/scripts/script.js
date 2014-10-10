function setHeight(target, reference) {
  var refHeight = $(reference).innerHeight();
  $(target).css('height', refHeight);
}

function setPosition(target, reference, x) {
  var refPosition = $(reference).height();
  $(target).css('top', refPosition + x);
}

function checkSlideshow (target) {
  if($(target).parents("#slideshow").length) {
    console.log('blah');
  } else {
    console.log("nope");
  }
}

checkSlideshow($('.flex-direction-nav'));
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

  $('#slideshow').flexslider({
    animation: 'slide',
    animationLoop: false,
    slideshow: false,
    controlNav: false,
    start: function(slider) {
      setHeight('#slideshow > .flex-viewport', '.flex-active-slide');
      setPosition('.flex-next', '.flex-active-slide > .slideshow-main', 35);
      setPosition('.flex-prev', '.flex-active-slide > .slideshow-main', 35);
      $('.total-slides').text(slider.count-1);
    },
    after: function(slider) {
      setHeight('#slideshow > .flex-viewport', '.flex-active-slide');
      $('.current-slide').text(slider.currentSlide);

      if (slider.currentSlide === 0) {
        setPosition('.flex-next', '.flex-active-slide > .slideshow-main', 35);
        setPosition('.flex-prev', '.flex-active-slide > .slideshow-main', 35);
        $('.lead-header').css('background-color', 'rgba(26, 26, 26, 0)');
      } else {
        setPosition('.flex-next', '.flex-active-slide > .slideshow-main', 25);
        setPosition('.flex-prev', '.flex-active-slide > .slideshow-main', 25);
        $('.lead-header').css('background-color', 'rgba(26, 26, 26, .7)');
      }
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
    // setPosition('.flex-next', '.flex-active-slide > .slideshow-main', 25);
    // setPosition('.flex-prev', '.flex-active-slide > .slideshow-main', 25);
  });
});
