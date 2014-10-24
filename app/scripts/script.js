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

// var tag = document.createElement('script');

// tag.src = 'https://www.youtube.com/iframe_api';
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Fires whenever a player has finished loading
// function onPlayerReady(event) {
//     event.target.playVideo();
// }

// Fires when the player's state changes.
// function onPlayerStateChange(event) {
//     // Go to the next video after the current one is finished playing
//     if (event.data === 0) {
//         $.fancybox.next();
//     }
// }

// The API will call this function when the page has finished downloading the JavaScript for the player API
// function onYouTubePlayerAPIReady() {

//   $(".fancybox")
//       .attr('rel', 'gallery')
//       .fancybox({
//           openEffect  : 'none',
//           closeEffect : 'fade',
//           nextEffect  : 'none',
//           prevEffect  : 'none',
//           padding     : 0,
//           margin      : 50,
//           type        : "iframe",
//           closeBtn    : true,
//           iframe      : {
//             preload: false
//           },
//           helpers     : {
//             overlay: {
//               css: {'background-color': 'rgba(26, 26, 26, .9)'}
//             }
//           },
//           beforeShow  : function() {
//             // Find the iframe ID
//             var id = $.fancybox.inner.find('iframe').attr('id');

//             // Create video player object and add event listeners
//             var player = new YT.Player(id, {
//                 events: {
//                     'onReady': onPlayerReady,
//                     'onStateChange': onPlayerStateChange
//                 }
//             });
//           }
//       });

// }

$('.video').magnificPopup({
  type: 'iframe',


  iframe: {
     markup: '<div class="mfp-iframe-scaler">'+
                '<div class="mfp-close"></div>'+
                '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
                '<div class="mfp-title">Some caption</div>'+
              '</div>'
  },
  callbacks: {
    markupParse: function(template, values, item) {
     values.title = item.el.attr('title');
    }
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
