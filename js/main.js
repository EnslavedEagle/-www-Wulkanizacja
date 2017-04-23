

$(document).ready(function() {
  var $mainNav = $('.main-nav-container');
  var $seeMorePricesContainer = $('#price_list .see-more-container');
  var $seeMorePricesLink = $('#price_list .see-more-link'); 
  
  var $animation_elements = $('body > header, body > section, body > footer');
  var $window = $(window);
  
  function toggleMenu() {
    $mainNav.toggleClass('hidden');
  }
  
  function togglePrices() {
    $seeMorePricesContainer.toggleClass("visible");
    if($seeMorePricesContainer.hasClass("visible")) {
      $seeMorePricesLink.text("Zobacz mniej");
    } else {
      $seeMorePricesLink.text("Zobacz więcej");
    }
  }
  
  function smoothScroll(event) {
    event.preventDefault();
    if(location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name="' + this.hash.slice(1) +'"]');
      if(target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 750, 'easeOutQuad');
        return false;
      }
    }
  }
  
  function checkInView() {
    var window_h = $window.height();
    var window_top_pos = $window.scrollTop();
    var window_bottom_pos = window_top_pos + window_h;
    var offsetY = 120;
    
    $.each($animation_elements, function() {
      var $el = $(this);
      var element_height = $el.height();
      var element_top_pos = $el.offset().top;
      var element_bottom_pos = element_top_pos + element_height;
      
      if((element_bottom_pos >= window_top_pos + offsetY) && (element_top_pos <= window_bottom_pos - offsetY)) {
        $el.addClass("in-view");
      }
    });
    
    return false;
  };
  
  function animateOnScroll() {
    checkInView();
  }
  
  $('body').addClass('js-enabled');
  
  $window.on('scroll resize', animateOnScroll);
  
  $('.menu-toggle').click(toggleMenu);
  $('a[href^="#"]').click(smoothScroll);
  
  $seeMorePricesLink.click(togglePrices);
  
  checkInView();
});


/*
 * part of jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 */
jQuery.easing['jswing'] = jQuery.easing['swing'];
jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	}
});