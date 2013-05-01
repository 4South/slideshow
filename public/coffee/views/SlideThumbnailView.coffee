App.SlideThumbnailView = Em.View.extend
  templateName: 'slidethumbnail'
  tagName: 'li'
  classNames: ['slidethumbnail', 'btn', 'btn-warning']
  attributeBindings: ['style']
  # didInsertElement: ->
    # $('#scrollbarWrapper').data('jsp').reinitialise()
    # console.log "wrapper reinit"
  
  style: (->
    "width: #{@get('controller.thumbnailWidth')}px;"
  ).property('controller.thumbnailWidth')

  #target should be gleaned from event details if possible
  mouseUp: (event) ->
    event.preventDefault()
    event.stopPropagation()
    window.ev = event
    @get('controller.manager').send "mouseReleased",
                                    @get('controller'),
                                    @get('content'),
                                    event.target
  
  #defined to prevent default behavior.  Not used!
  drag: (event) ->
    event.preventDefault()
    console.log 'should not be seeing this dragevent!'

  mouseDown: (event) ->
    event.preventDefault()
    event.stopPropagation()
    @get('controller.manager').send "mouseDown", @get('controller')

  #possible way to identify drop target?
  #consider extracting target from this event
  mouseEnter: (event) ->
    return
