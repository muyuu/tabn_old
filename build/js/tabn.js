(function() {
  (function($) {
    return $.fn.tabn = function(options) {
      var changeClass, content, defaults, hideElement, opts, plugin, tabName, tabs;
      plugin = this;
      tabName = "";
      defaults = {
        tabs: ".tabs",
        content: ".tabcontents",
        hide: true,
        animation: false,
        hidetime: 200,
        disptime: 400
      };
      opts = $.extend({}, defaults, options);
      tabs = $(plugin).find(opts.tabs);
      content = $(plugin).find(opts.content);
      changeClass = function() {
        content.find(".tabcontent").removeClass("active");
        return content.find(".tabcontent#" + tabName).addClass("active");
      };
      hideElement = function() {
        content.find(".tabcontent").hide();
        return content.find(".tabcontent#" + tabName).show();
      };
      plugin.init = function() {
        tabName = tabs.find(".tab:first a").attr("href").replace("#", "");
        return plugin.trigger("change.tabs", tabName);
      };
      plugin.delegate(".tab", "click", function(e) {
        e.preventDefault();
        tabName = $(this).find("a").attr('href').replace("#", "");
        return plugin.trigger("change.tabs", tabName);
      });
      plugin.bind("change.tabs", function(e, tabName) {
        tabs.find(".tab").removeClass("active");
        tabs.find(".tab a[href=#" + tabName + "]").parent().addClass("active");
        if (opts.animation === true) {
          content.find(".tabcontent").animate({
            "opacity": 0
          }, opts.hidetime, function() {
            return hideElement();
          });
          return content.find(".tabcontent#" + tabName).animate({
            "opacity": 1
          }, opts.disptime);
        } else {
          if (opts.hide === true) {
            hideElement();
          }
          return changeClass();
        }
      });
      plugin.init();
      return plugin;
    };
  })(jQuery);

}).call(this);
