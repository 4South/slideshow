App.SlideThumbnailView = Em.View.extend

  templateName: 'slidethumbnail'
  tagName: 'li'
  classNames: ['slidethumbnailwrapper']
  classNameBindings: ['dragging']
  attributeBindings: ['style']
  # didInsertElement: ->
    # $('#scrollbarWrapper').data('jsp').reinitialise()
    # console.log "wrapper reinit"
  
  style: (->
    "width: #{@get('controller.thumbnailWrapperWidth')}px;"
  ).property('controller.thumbnailWrapperWidth')

  innerStyle: (->
    tnWidth = @get('controller.thumbnailWidth')
    wrapperWidth = @get('controller.thumbnailWrapperWidth')
    marginLeft = (wrapperWidth - tnWidth) / 2
    """width: #{tnWidth}px;
       margin-left: #{marginLeft}px;"""
  ).property('controller.thumbnailWidth', 'controller.thumbnailWrapperWidth')

  dragging: (->
    if @get('content') is @get('controller.dragSlide')
      return true
    return false
  ).property('controller.dragSlide', 'content')

  #target should be gleaned from event details if possible
  mouseUp: (event) ->
    event.preventDefault()
    event.stopPropagation()
    @get('controller.manager').send "mouseUp",
                                    @get('controller'),
                                    @get('content'),
                                    event.offsetX
  
  mouseDown: (event) ->
    event.preventDefault()
    event.stopPropagation()
    @get('controller.manager').send "mouseDown",
                                    @get('controller'),
                                    @get('content'),
                                    event.offsetX

  #possible way to identify drop target?
  #consider extracting target from this event
  mouseEnter: (event) ->
    return

  mouseMove: (event) ->
    @get('controller.manager').send "mouseMove",
                                    @get('controller'),
                                    @get('content'),
                                    event.offsetX
  
  #defined to prevent default behavior.  Not used!
  drag: (event) ->
    event.preventDefault()
    console.log 'should not be seeing this dragevent!'

