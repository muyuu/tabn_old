!function(){!function(t){return t.fn.tabn=function(n){var e,i,a,r,c,f,d,o;return f=this,d="",a={tabs:".tabs",content:".tabcontents",hide:!0,animation:!1,hidetime:200,disptime:400},c=t.extend({},a,n),o=t(f).find(c.tabs),i=t(f).find(c.content),e=function(){return i.find(".tabcontent").removeClass("active"),i.find(".tabcontent#"+d).addClass("active")},r=function(){return i.find(".tabcontent").hide(),i.find(".tabcontent#"+d).show()},f.init=function(){return d=o.find(".tab:first a").attr("href").replace("#",""),f.trigger("change.tabs",d)},f.delegate(".tab","click",function(n){return n.preventDefault(),d=t(this).find("a").attr("href").replace("#",""),f.trigger("change.tabs",d)}),f.bind("change.tabs",function(t,n){return o.find(".tab").removeClass("active"),o.find(".tab a[href=#"+n+"]").parent().addClass("active"),c.animation===!0?(i.find(".tabcontent").animate({opacity:0},c.hidetime,function(){return r()}),i.find(".tabcontent#"+n).animate({opacity:1},c.disptime)):(c.hide===!0&&r(),e())}),f.init(),f}}(jQuery)}.call(this);