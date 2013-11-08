( ($)->
  $.fn.tabn = ( options ) ->

    ele = @
    tabName = ""

    # option
    defaults =
      tab: ".tab"
      content: ".tabcontent"
      hide: true
      animation: false
      hidetime: 200
      disptime: 400

    opts = $.extend({}, defaults, options)

    tab = $(ele).find(opts.tab)
    content = $(ele).find(opts.content)

    #content
    changeClass = () ->
      content.find("li").removeClass "active"
      content.find("li##{tabName}").addClass "active"

    # not controll for css display
    hideElement = () ->
      content.find("li").hide()
      content.find("li##{tabName}").show()

    ele.init = () ->
      # add active first cotent
      tabName = tab.find("li:first a").attr("href").replace("#", "")
      ele.trigger "change.tabs", tabName

    # add custom event when tab click
    ele.delegate "li", "click", (e)->
      e.preventDefault()
      tabName = $(@).find("a").attr('href').replace("#", "")

      # set trigger custom event
      ele.trigger "change.tabs", tabName

    # bind costom torigger
    ele.bind "change.tabs", ( e, tabName )->
      # console.log "trigger"

      # tab
      tab.find("li").removeClass "active"
      tab.find("li a[href=##{tabName}]").parent().addClass "active"

      # animation
      if opts.animation is true
        content.find("li").animate "opacity":0, opts.hidetime, ()->
          hideElement()
        content.find("li##{tabName}").animate "opacity":1, opts.disptime
      else
        if opts.hide is true
          hideElement()
        changeClass()

    ele.init()

    return ele
) jQuery
