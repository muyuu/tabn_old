( ($)->
  $.fn.tabn = ( options ) ->

    # "this" is wrapped tag
    plugin = @
    tabName = ""

    # option
    defaults =
      tabs: ".tabs"
      content: ".tabcontents"
      hide: true
      animation: false
      hidetime: 200
      disptime: 400

    opts = $.extend({}, defaults, options)

    tabs = $(plugin).find(opts.tabs)
    content = $(plugin).find(opts.content)

    #content
    changeClass = () ->
      content.find(".tabcontent").removeClass "active"
      content.find(".tabcontent##{tabName}").addClass "active"

    # not controll for css display
    hideElement = () ->
      content.find(".tabcontent").hide()
      content.find(".tabcontent##{tabName}").show()

    plugin.init = () ->
      # add active first cotent
      tabName = tabs.find(".tab:first a").attr("href").replace("#", "")
      plugin.trigger "change.tabs", tabName

    # add custom event when tab click
    plugin.delegate ".tab", "click", (e)->
      e.preventDefault()
      tabName = $(@).find("a").attr('href').replace("#", "")

      # set trigger custom event
      plugin.trigger "change.tabs", tabName

    # bind costom torigger
    plugin.bind "change.tabs", ( e, tabName )->
      # console.log "trigger"

      # tab
      tabs.find(".tab").removeClass "active"
      tabs.find(".tab a[href=##{tabName}]").parent().addClass "active"

      # animation
      if opts.animation is true
        content.find(".tabcontent").animate
          "opacity":0,
          opts.hidetime,
          ()->
            hideElement()
        content.find(".tabcontent##{tabName}").animate "opacity":1,
          opts.disptime
      else
        if opts.hide is true
          hideElement()
        changeClass()

    plugin.init()

    return plugin
) jQuery
