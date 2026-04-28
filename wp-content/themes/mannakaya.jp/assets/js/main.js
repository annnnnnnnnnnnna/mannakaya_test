$(function() {

  (function($) {
    var cName;
    switch (true) {
      case (window._ua.Tablet):
        cName = 'tablet';
        break;
      case (window._ua.Mobile):
        cName = 'mobile';
        break;
      default:
        cName = '';
    }
    $('body').addClass(cName);
    var isTouchDevice = (function(d) {
      var iframe = d.createElement('iframe');
      d.body.appendChild(iframe);
      var result = ('ontouchstart' in iframe.contentWindow);
      d.body.removeChild(iframe);
      return result;
    })(document);
    if (!isTouchDevice) {
      $('body').addClass('touch-disabled');
    }
  })($)

  var headerHeight = 0;
  var headerOffset = 0;
  var footerOffset = 0;
  $('header').addClass('low');
  $('footer').addClass('low');
  $('.pagetop').hide().addClass('hidden');

  var ua = navigator.userAgent;
  if (ua.indexOf('Android') !== -1) {
    $('.menu_icon a').addClass('fix');
  }
  if (ua.indexOf('iPhone') !== -1 || ua.indexOf('iPad') !== -1) {
    $('.parallax').addClass('ios');
  }

  // scrollbar
  var scrollbarWidth = window.innerWidth - document.body.clientWidth;

  // sp gnav
  $('.menu_icon a').on('click', function(e) {
    e.preventDefault();
    $(this).toggleClass('close').parent().prev()
    $('body').removeClass('down').addClass('up');
    $(this).closest('header').toggleClass('menu_open');
  });

  // gnav
  var navi_event = 'click';
  if ($('.global_nav').css('list-style-position') === 'inside') {
    navi_event =
      (!$('body.mobile').length && !$('body.tablet').length) ?
      'mouseenter mouseleave' : 'touchend';
    $('.has_under').on('click', function(e) {
      var tagName = e.target.tagName.toLowerCase();
      if (!tagName === 'a' || $(e.target.parentNode).hasClass('has_under')) {
        e.preventDefault();
      }
    });
  }
  $('.has_under').on(navi_event, function(e) {
    var tagName = e.target.tagName.toLowerCase();
    if (tagName === 'a' && !$(e.target.parentNode).hasClass('has_under')) {
      return;
    }
    e.preventDefault();
    var $self = $('>a', $(this));
    //var $self = $(this);
    if (!$self.hasClass('menu_under_open') && $('.menu_under_open').length) {
      $('.menu_under_open')
        .removeClass('menu_under_open')
        .next().stop().slideToggle(200);
    }
    $self.toggleClass('menu_under_open');
    $self.next().stop().slideToggle(200);
  });
  $('.gnav_search>a').on('click', function(e) {
    e.preventDefault();
    //$(this).toggleClass('menu_under_open');
    $(this).next().slideToggle(200);
  });

  // pagetop
  $('.pagetop a').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    });
  });

  // iOS svg tap fix
  if ($('body.mobile').length || $('body.tablet').length) {
    $('header .title a').on('touchend', function(e) {
      e.preventDefault();
      location.href = this.href;
    });
  }

  // swipebox
  if ($.isFunction($().swipebox)) {
    var swipebox = $('.swipebox').swipebox();
    $(document).on('click touchend', '#swipebox-overlay', function(e) {
      e.preventDefault();
      if ($(e.target).hasClass('slide')) $.swipebox.close();
    })
  }

  // slider
  if ($.isFunction($().sliderPro)) {
    var sliderDefaults = {
      center: {
        width: 1000,
        height: 450,
        slideDistance: 0,
        visibleSize: '100%',
        arrows: true,
        fadeArrows: false,
        autoScaleLayers: false,
        breakpoints: {}
      },
      wide: {
        width: '100%',
        autoHeight: true,
        slideDistance: 0,
        arrows: true,
        fadeArrows: false,
        fade: true,
        autoScaleLayers: false,
        touchSwipe: false,
        breakpoints: {}
      },
      contents: {
        width: 450,
        height: 300,
        aspectRatio: 1.5,
        slideDistance: 10,
        visibleSize: '100%',
        arrows: true,
        fadeArrows: false,
        buttons: false,
        fadeCaption: false,
        breakpoints: {}
      }
    };
    $('.slider-pro').each(function() {
      var opt = $(this).data();
      var number_of_slide = $(this).find('.sp-slide').length;
      $(this).addClass(opt.type || 'center');
      if (!this.hasAttribute('data-type')) {
        return true;
      }
      var options = $.extend(true, (sliderDefaults[opt.type] || sliderDefaults.center), {});
      if (opt.width) {
        options.width = opt.width
      }
      if (opt.height) {
        options.height = opt.height
      }
      if (typeof opt.distance !== 'undefined') {
        options.slideDistance = opt.distance
      }
      if (opt.type == 'contents') {
        if (opt.width || opt.height) {
          options.aspectRatio = Math.round(options.width / options.height * 100) / 100;
        }
        if (number_of_slide % 2 === 0) {
          options.visibleSize = options.width * (number_of_slide - 1) + options.slideDistance * (number_of_slide - 2);
        }
      }
      if (typeof opt.autoplay !== 'undefined') {
        options.autoplay = opt.autoplay
      }
      if (typeof opt.arrows !== 'undefined') {
        switch (opt.arrows) {
          case false:
            options.arrows = false;
            $(this).addClass('disable-arrows');
            break;
          case 'pc-only':
            var bp = 768 - scrollbarWidth - 1;
            options.breakpoints[bp] = options.breakpoints[bp] || {};
            options.breakpoints[bp].arrows = false;
            $(this).addClass('sp-disable-arrows');
            break;
        }
      }
      if (typeof opt.buttons !== 'undefined') {
        switch (opt.buttons) {
          case false:
            options.buttons = false;
            break;
          case 'pc-only':
            var bp = 768 - scrollbarWidth - 1;
            options.breakpoints[bp] = options.breakpoints[bp] || {};
            options.breakpoints[bp].buttons = false;
            break;
        }
      }
      $(this).sliderPro(options);
    });
  }

  $('.slide_scroll').click(function(e) {
    e.preventDefault();
    var pos = $(this).closest('section').next().offset().top;
    $('html, body').animate({
      scrollTop: pos
    });
  });

  // Q&A
  // $('.qa:not(.qa-open) .question').click(function() {
  //   $(this).toggleClass('open').next('.answer').slideToggle();
  // });

  // responsive scroll table
  $('table.responsive-scroll').wrap(
    '<div><div class="responsive-scroll-container"><div class="responsive-scroll-inner"></div></div><p class="sp-only text-center text-small">※横スクロールで全体を表示します。</p></div>'
  );

  // responsive list table
  $('table.responsive-list').each(function() {
    var header = [];
    $(this).find('thead th').each(function() {
      header.push($(this).text());
    });
    $(this).find('tbody td').each(function() {
      $(this).attr('data-title', header[$(this).index()]);
    });
  });

  // combine table
  $('table.combine').closest('.col').css('margin-bottom', 0);

  // Fix SP Menu
  function fixSpMenu() {
    var win_h = $(window).height();
    var hdr_h = $('header').height();
    if ($('.menu_icon').is(':visible') && $('header').css('z-index') != 'auto') { // SP && Fixed
      $('header .global_nav>ul').css('max-height', win_h - hdr_h);
    } else {
      $('header .global_nav>ul').css('max-height', 'none');
    }
  }

  function fixPageTop(window) {
    var currentPos = $(window).scrollTop();
    var $pagetop = $('.pagetop');
    if (currentPos > 200) {
      $pagetop.fadeIn(200, function() {
        $(this).removeClass('hidden');
      });
    } else {
      $pagetop.fadeOut(200, function() {
        $(this).addClass('hidden');
      });
    }
  }

  function fixMainSize() {
    if ($('.main_visual').length) {
      var mainPadding = +$('.main_visual').css('padding-top').replace('px', '');
      var mainHeight = $('.main_visual').height();
      return (mainPadding > mainHeight) ? mainPadding : mainHeight;
    } else {
      return false;
    }
  }

  // Load Event
  $(window).load(function() {
    headerOffset = fixMainSize();
    footerOffset = $('footer').offset().top;
    headerHeight = $('header').height();
    $('body').removeClass('down').addClass('up').css('paddingTop', function() {
      return $('header').css('position') == 'fixed' ? $('header').height() : 0;
    });
    if (typeof WOW !== 'undefined') {
      new WOW().init();
    }
    fixSpMenu();
    $('.tile').each(function() {
      $(this).children().tile();
    });
  })

  // Scroll Event
  var scrolltimer = false;
  var prevPos = 0;
  $(window).on('scroll touchmove', function() {
    $('body').addClass('scroll');
    var currentPos = $(this).scrollTop();

    headerOffset = fixMainSize();
    footerOffset = $('footer').offset().top;

    if (currentPos > headerOffset) {
      $('header').removeClass('low').addClass('high');
    } else {
      $('header').removeClass('high').addClass('low');
    }

    if ((currentPos + $(this).height()) > footerOffset) {
      $('footer').removeClass('low').addClass('high');
    } else {
      $('footer').removeClass('high').addClass('low');
    }

    fixPageTop(this);

    if (currentPos > prevPos && currentPos > 0) { // down
      $('body').removeClass('up').addClass('down') //.css('paddingTop', 0);
      if (currentPos > headerHeight) {
        $('header').addClass('hidden');
      }
    } else { // up
      $('body').removeClass('down').addClass('up').css('paddingTop', function() {
        return $('header').css('position') == 'fixed' ? headerHeight : 0;
      });
      $('header').removeClass('hidden');
    }
    if (!currentPos) {
      $('body').addClass('scrollTop');
    } else {
      $('body').removeClass('scrollTop');
    }
    prevPos = currentPos;

    if (scrolltimer !== false) {
      clearTimeout(scrolltimer);
    }
    scrolltimer = setTimeout(function() {
      $('body').removeClass('scroll');
      $('body').removeClass('down').addClass('up').css('paddingTop', function() {
        return $('header').css('position') == 'fixed' ? headerHeight : 0;
      });
      $('header').removeClass('hidden');
    }, 500);
  });

  // Resize Event
  var resizetimer = false;
  $(window).resize(function() {
    if (resizetimer !== false) {
      clearTimeout(resizetimer);
    }
    resizetimer = setTimeout(function() {
      fixSpMenu();
      $('.tile').each(function() {
        $(this).children().tile();
      });
      headerHeight = $('header').height();
      headerOffset = $('header').offset().top;
      footerOffset = $('footer').offset().top;
      $('.tile').each(function() {
        $(this).children().tile();
      });
    }, 200);
  });

  // main_slider
  if ($.isFunction($().slick)) {
    (function($) {
      if ($('.main_visual_slick li').length <= 1) return;
      if ($('.main_visual').css('transform') !== 'none') {
        var html = $('.main_visual_slick').html();
        var $ul = $('<ul class="main_visual_slick_thumb">');
        $('.main_visual').append($ul.html(html));
      }
      var fade = false;
      var arrows = false;
      var dots = false;
      var speed = 500;
      var appendArrows = $('.main_visual_slick');
      if ($('.main_visual').css('table-layout') === 'fixed') {
        fade = true;
        speed = 1000;
      }
      if ($('.main_visual').css('list-style-position') === 'inside') {
        arrows = true;
        $('.main_visual').append('<div class="main_visual_arrow"></div>');
        appendArrows = $('.main_visual_arrow');
      }
      if ($('.main_visual').css('list-style-type') === 'circle') {
        dots = true;
      }
      var slick = $('.main_visual_slick').slick({
        slidesToShow: 1,
        autoplay: true,
        fade: fade,
        arrows: arrows,
        dots: dots,
        appendArrows: appendArrows,
        autoplaySpeed: 5000,
        speed: speed,
      }).on('beforeChange', function(e, slick, currentSlide, nextSlide) {
        if ($('.main_visual_slick_thumb').length) {
          $('.main_visual_slick_thumb_current').removeClass('main_visual_slick_thumb_current');
          $('.main_visual_slick_thumb>li').eq(nextSlide).addClass('main_visual_slick_thumb_current');
        }
        if ($('.main_visual_copy').css('transform') !== 'none') {
          var $copy = $('.main_visual_copy li');
          $copy.eq(currentSlide).removeClass('active');
          $copy.eq(nextSlide).addClass('active');
        }
      });
      if ($('.main_visual_copy').css('transform') !== 'none') {
        $('.main_visual_copy li').eq(0).addClass('active').show();
      }
      $('.main_visual_slick_thumb>li').on('click', function() {
        var index = $(this).index();
        slick.slick('slickGoTo', index);
      });
    })($);
  }

  if (typeof skrollr !== 'undefined' && !$('body').hasClass('tablet') && !$('body').hasClass('mobile')) {
    skrollr.init();
  }

  if (typeof objectFitImages !== 'undefined') {
    objectFitImages('.ofi img');
  }

  // pc-only等のタグ前後に出てくる改行コードを除去
  $('br.pc-only, br.sp-only, br.tablet-only, br.pc-hide, br.sp-hide, br.tablet-hide, sup, sub').each(function(){
    var $parent = $(this).parent();
    if( !$parent.length ) return true;
    var html = $parent.html();
    html = html
      .replace(/\n/g, '')
      .replace(/\s*?(<br class="(sp|pc|tablet)-(only|hide)([^>+?])>)\s*/g, '$1')
      .replace(/(,|\.)(<br class="(sp|pc|tablet)-(only|hide))/g, '$1 $2')
      .replace(/(\d)(<br class="(sp|pc|tablet)-(only|hide))/g, '$1　$2')
      .replace(/\s*?<(sup|sub)/g, '<$1');
    $parent.html( html );
  });
  // FromCake
  $('.sweetswidget').each(function(){
    var self = this;
    var dataset = $(self).data();
    var shopcode = dataset.widgetcode;
    if( shopcode===undefined ) return true;
    var count = (dataset.widgetcount!==undefined)? dataset.widgetcount: 50;
    var class_name = (dataset.widgetcarousel&&dataset.widgetcarousel!==undefined)? 'reservation_widget_carousel_wrap': '';
    var url = 'https://sweetsguide.jp/shop/'+shopcode+'/widget';
    var ajaxOption = {
      method: 'get',
      url: url,
      data: {
        class_name: class_name,
        count: count,
      },
      dataType: 'html',
    };
    $.ajax(ajaxOption).done(function(html){
      getWidget(self, html)
    });
  });

  function getWidget(self, html){
    $(self).after(html);
    var current = $(self).next();
    $(self).remove();
    var $container = $(current);

    customTile('h3', $container);
    // Resize Event
    var resizetimer = false;
    $(window).resize(function() {
      if (resizetimer !== false) {
        clearTimeout(resizetimer);
      }
      resizetimer = setTimeout(function() {
        customTile('h3', $container);
      }, 200);
    });
    function customTile(selector, $container){
      var $selector = $(selector, $container);
      var h, max;
      var last = $selector.length - 1;
      $selector.each(function(i){
        $(this).removeAttr('style');
      }).each(function(i){
        h = $(this).outerHeight();
        if(i===0||h > max) max = h;
        if(i == last) {
          $selector.each(function(i){
            $(this).css('height', max);
          });
        }
      });
    }
    if( !$container
      .hasClass('reservation_widget_carousel_wrap') ) return true;
    var length = $('>li', $container).length;
    if( length <= 4 ) {
      $container.removeClass('reservation_widget_carousel_wrap');
      return;
    };
    $container.removeClass('row_inline');
    $('>li', $container).each(function(){
      $(this).removeClass('span_3 col').addClass('reservation_widget_carousel');
    });
    $container.after('<div class="reservation_widget_arrow"></div>');
    appendArrows = $container.next();
    var slickOption = {
      slidesToShow: 4,
      autoplay: true,
      arrows: true,
      dots: true,
      appendArrows: appendArrows,
      responsive: [{
        breakpoint: 900,
        settings: {
          slidesToShow: 3
        }
      },{
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      }]
    };
    $container.slick(slickOption);
    customTile('h3', $container);
  }

});
