(function() {
  (function($) {
    return $.fn.tabn = function(options) {
      var changeClass, contents, defaults, hideElement, opts, plugin, tabName, tabs;
      plugin = this;
      tabName = "";
      defaults = {
        tabs: ".tabs",
        tab: ".tab",
        contents: ".tabcontents",
        content: ".tabcontent",
        hide: true,
        animation: false,
        hidetime: 200,
        disptime: 400
      };
      opts = $.extend({}, defaults, options);
      tabs = $(plugin).find(opts.tabs);
      contents = $(plugin).find(opts.contents);
      changeClass = function() {
        contents.find(opts.content).removeClass("active");
        return contents.find(opts.content + "#" + tabName).addClass("active");
      };
      hideElement = function() {
        contents.find(opts.content).hide();
        return contents.find(opts.content + "#" + tabName).show();
      };
      plugin.init = function() {
        tabName = tabs.find(opts.tab + ":first a").attr("href").replace("#", "");
        return plugin.trigger("change.tabs", tabName);
      };
      plugin.delegate(opts.tab, "click", function(e) {
        e.preventDefault();
        tabName = $(this).find("a").attr('href').replace("#", "");
        return plugin.trigger("change.tabs", tabName);
      });
      plugin.bind("change.tabs", function(e, tabName) {
        tabs.find(opts.tab).removeClass("active");
        tabs.find(opts.tab + " a[href=#" + tabName + "]").parent().addClass("active");
        if (opts.animation === true) {
          contents.find(opts.content).animate({
            "opacity": 0
          }, opts.hidetime, function() {
            return hideElement();
          });
          return contents.find(opts.content + "#" + tabName).animate({
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
