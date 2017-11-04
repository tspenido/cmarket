jQuery(document).ready(function($) {
   
    // ---------------------------------------------- //
    // Configuration Options
    // ---------------------------------------------- //
    var useFixedHeader = true;
    var showScrollToTopButton = false;
    var homeSliderAutoAnimated = true;
    var homeSliderAutoAnimatedDelay = 3000;
    var homeSliderAnimation = 'crossfade';
    var homeSliderAnimationSpeed = 1000;
    
    
    // Stretch the image within the container using Backstretch plugin
    var width = parseInt($('#home-slider-container').css('width').replace('px', ''));
    // Run only for small mobile and tablet size like iPad
    if(width <= 479 || (width >= 768 && width <= 959)) {
        if($('.stretch-image').length > 0) {
            $('.stretch-image').each(function() {
                var originalImg = $(this);
                var parentTag = $(this).parent();
                
                parentTag.backstretch(originalImg.attr('src'));
                parentTag.find('div.backstretch').find('img').attr('alt', originalImg.attr('alt'));
                    
                originalImg.remove();
            });
        }
    }
    
    // Stretch the home slider's images and header images (always stretch on all resolutions by default)
    if($('.home-slider-item, #header-image').length > 0) {
        $('.home-slider-item, #header-image').each(function() {
            var originalImg = $(this).find('img');
            var parentTag = $(this);
            parentTag.backstretch(originalImg.attr('src'));
            parentTag.find('div.backstretch').find('img').attr('alt', originalImg.attr('alt'));
            originalImg.remove();
        });
    }
    
    // "placeholder" attribute fix for all browsers
    $('[placeholder]').focus(function() {
      var input = $(this);
      if (input.val() == input.attr('placeholder')) {
        input.val('');
        input.removeClass('placeholder');
      }
    }).blur(function() {
      var input = $(this);
      if (input.val() == '' || input.val() == input.attr('placeholder')) {
        input.addClass('placeholder');
        input.val(input.attr('placeholder'));
      }
    }).blur();
    $('[placeholder]').parents('form').submit(function() {
      $(this).find('[placeholder]').each(function() {
        var input = $(this);
        if (input.val() == input.attr('placeholder')) {
          input.val('');
        }
      })
    });
    
  
    // Home Slider
    if($('#home-slider').length > 0) {
        $('#home-slider').carouFredSel({
            responsive: true,
            swipe: true,
            width: '100%',
            onCreate: function(data) {
				$('#slider-controller').fadeIn(2000);
                $('#home-slider .home-slider-item').stop().animate({
                    opacity: 1
                }, 800, function() {
                    $('.slider-caption').stop().animate({
                        opacity: 1
                    }, 500, function() {
						
                        $('#slider-controller').stop().animate({
                            opacity: 1
                        }, 800);
                    });
                });
                
            },
            scroll: {
                fx: homeSliderAnimation,
                duration: homeSliderAnimationSpeed,
            },
            auto: {
                play: homeSliderAutoAnimated,
                timeoutDuration: homeSliderAutoAnimatedDelay,
            },
            prev: {
                button: '#slider-prev',
            },
            next: {
                button: '#slider-next',
            },
        },
        {
            transition: true,
        });
    }
    
    
    
    
});