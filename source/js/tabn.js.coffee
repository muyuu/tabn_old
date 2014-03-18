( ($)->
  $.fn.tabn = ( options ) ->

    # "this" is wrapped tag
    plugin = @
    tabName = ""

    # option
    defaults =
      tabs: ".tabs"
      tab: ".tab"
      contents: ".tabcontents"
      content: ".tabcontent"
      hide: true
      animation: false
      hidetime: 200
      disptime: 400

    opts = $.extend({}, defaults, options)

    tabs = $(plugin).find(opts.tabs)
    contents = $(plugin).find(opts.contents)

    #content
    changeClass = () ->
      contents.find(opts.content).removeClass "active"
      contents.find(opts.content + "#" + tabName).addClass "active"

    # not controll for css display
    hideElement = () ->
      contents.find(opts.content).hide()
      contents.find(opts.content + "#" + tabName).show()

    plugin.init = () ->
      # add active first cotent
      tabName = tabs.find(opts.tab + ":first a").attr("href").replace("#", "")
      plugin.trigger "change.tabs", tabName

    # add custom event when tab click
    plugin.delegate opts.tab, "click", (e)->
      e.preventDefault()
      tabName = $(@).find("a").attr('href').replace("#", "")

      # set trigger custom event
      plugin.trigger "change.tabs", tabName

    # bind costom torigger
    plugin.bind "change.tabs", ( e, tabName )->
      # console.log "trigger"

      # tab
      tabs.find(opts.tab).removeClass "active"
      tabs.find(opts.tab + " a[href=#" + tabName + "]").parent().addClass "active"

      # animation
      if opts.animation is true
        contents.find(opts.content).animate
          "opacity":0,
          opts.hidetime,
          ()->
            hideElement()
        contents.find(opts.content + "#" + tabName).animate "opacity":1,
          opts.disptime
      else
        if opts.hide is true
          hideElement()
        changeClass()

    plugin.init()

    return plugin
) jQuery
