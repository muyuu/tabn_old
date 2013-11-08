(function() {
  (function($) {
    return $.fn.tabn = function(options) {
      var changeClass, content, defaults, ele, hideElement, opts, tab, tabName;
      ele = this;
      tabName = "";
      defaults = {
        tab: ".tab",
        content: ".tabcontent",
        hide: true,
        animation: false,
        hidetime: 200,
        disptime: 400
      };
      opts = $.extend({}, defaults, options);
      tab = $(ele).find(opts.tab);
      content = $(ele).find(opts.content);
      changeClass = function() {
        content.find("li").removeClass("active");
        return content.find("li#" + tabName).addClass("active");
      };
      hideElement = function() {
        content.find("li").hide();
        return content.find("li#" + tabName).show();
      };
      ele.init = function() {
        tabName = tab.find("li:first a").attr("href").replace("#", "");
        return ele.trigger("change.tabs", tabName);
      };
      ele.delegate("li", "click", function(e) {
        e.preventDefault();
        tabName = $(this).find("a").attr('href').replace("#", "");
        return ele.trigger("change.tabs", tabName);
      });
      ele.bind("change.tabs", function(e, tabName) {
        tab.find("li").removeClass("active");
        tab.find("li a[href=#" + tabName + "]").parent().addClass("active");
        if (opts.animation === true) {
          content.find("li").animate({
            "opacity": 0
          }, opts.hidetime, function() {
            return hideElement();
          });
          return content.find("li#" + tabName).animate({
            "opacity": 1
          }, opts.disptime);
        } else {
          if (opts.hide === true) {
            hideElement();
          }
          return changeClass();
        }
      });
      ele.init();
      return ele;
    };
  })(jQuery);

}).call(this);
