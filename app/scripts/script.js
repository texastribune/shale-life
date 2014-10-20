'use strict';
/* global YT */
/* exported onYouTubeIframeAPIReady */

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
    if ($e.hasClass('slide-box')) {
      setPosition('.flex-next', '.flex-prev', '.flex-active-slide > .nav-ref', 20);
      $('.lead-header').css('background-color', 'rgba(26, 26, 26, .7)');
    } else {
      setPosition('.flex-next', '.flex-prev', '.flex-active-slide > .nav-ref', 30);
      $('.lead-header').css('background-color', 'rgba(26, 26, 26, 0)');
    }
}

// Create nice scroll on href='#id' clicks
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

  // Make videos responsive
  // $('.video-wrapper').fitVids();

  //Create flexsliders
  // Top slideshow
  $('#slideshow').flexslider({
    animation: 'slide',
    animationLoop: false,
    slideshow: false,
    controlNav: false,
    //Position direction buttons on start
    start: function(slider) {
      setHeight('#slideshow > .flex-viewport', '.flex-active-slide');
      positionNav('nav-ref');
      $('.total-slides').text(slider.count-1);
    },
    // Re-position direction buttons after slide switches
    after: function(slider) {
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

  // Set height of tan box based on size of content inside
  setHeight('.story-box', '.story');
});

// var tag = document.createElement('script');

// tag.src = 'https://www.youtube.com/iframe_api';
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// var player;

// var playButton = document.getElementById('js-play-button');

// function onPlayerReady(event) {
//   playButton.addEventListener('click', function() {
//     console.log(event);
//     event.target.playVideo();

//   });
// }

// function onYouTubeIframeAPIReady() {
//   player = new YT.Player('ytplayer', {
//     events: {
//       'onReady': onPlayerReady
//     }
//   });
// }

// Reset heights/positions on window resize
$(window).resize(function() {
  $('.lead-header').css('max-width', $(window).outerWidth());
  positionNav('nav-ref');
  setHeight('.story-box', '.story');
  setHeight('#slideshow > .flex-viewport', '.flex-active-slide');
});

$(window).on( 'orientationchange', function() {
  $('.lead-header').css('max-width', $(window).outerWidth());
  positionNav('nav-ref');
  setHeight('.story-box', '.story');
  setHeight('#slideshow > .flex-viewport', '.flex-active-slide');
});
