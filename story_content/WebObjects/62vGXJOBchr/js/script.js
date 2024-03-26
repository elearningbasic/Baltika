// Скроллбар
if (window.jQuery) {
  (function ($) {
    $(window).on('load', function () {
      $('.scroll-container').mCustomScrollbar({
        theme: 'my-theme',
        axis: 'y',
        setWidth: 654,
        setHeight: 458,
        alwaysShowScrollbar: 0,
        scrollButtons: {
          enable: false,
        },
        autoDraggerLength: false,
        mouseWheel: {
          scrollAmount: 100,
        },
        callbacks: {
          alwaysTriggerOffsets: false,
        },
      });
    });
  })(jQuery);
}