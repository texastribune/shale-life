
// Set element height based on height of reference element
function setHeight(target, reference) {
  var refHeight = $(reference).innerHeight();
  $(target).css('height', refHeight);
}

// Set thumbnail heights on landing based on width of square thumbnails
function setThumbnails() {
  var refWidth = $(window).width();
  var refWidthWide = $(window).width()/4;

  if ($(window).width() < 500) {
    $('.square').css('width', refWidth).css('height', refWidth);
    $('.tall').css('width', refWidth).css('height', refWidth*2)
    $('.wide').css('width', refWidth).css('height', refWidth/2);
    $('.lg-square').css('width', refWidth).css('height', refWidth);
  } else {
    $('.square').css('height', refWidthWide).css('width', refWidthWide);
    $('.tall').css('height', refWidthWide*2).css('width', refWidthWide);
    $('.wide').css('height', refWidthWide).css('width', refWidthWide*2);
    $('.lg-square').css('height', refWidthWide*2).css('width', refWidthWide*2);
  }

  $('h3.hide-until-load').removeClass('hide-until-load');
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
  setHeight('.landing-banner', window);
  // Set height of thumbnails on landing
  setThumbnails();
});

// Reset heights/positions on window resize
$(window).resize(function() {
  setHeight('.landing-banner', window);
  setThumbnails();
});

$(window).on( "orientationchange", function() {
  setHeight('.landing-banner', window);
  setThumbnails();
});
