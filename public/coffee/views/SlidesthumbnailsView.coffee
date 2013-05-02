require('controllers/SlidethumbnailsManager.js')

App.SlidethumbnailsView = Em.View.extend

  tagName: 'div'
  templateName: 'slidethumbnails'
  classNames: ['slidethumbnailsviewport']

  thumbnailWrapperWidth: 160

  #thumbnail itself is always a bit smaller than its container
  thumbnailWidth: (->
    @get('thumbnailWrapperWidth') * .9
  ).property('thumbnailWrapperWidth')
  
  #used to calculate size of viewport scrollbar
  portStyle: (->
    thumbnailCount = @get('controller.filteredContent.length')
    "width: #{thumbnailCount * @get('thumbnailWrapperWidth')}px;"
  ).property('controller.filteredContent', 'thumbnailWrapperWidth')

  #dnd "temp" variables
  dragSlide: null
  #offset variable set during mouseDowns
  dragStartOffset: null

  draggingThumbnail: null

  init: () ->
    @_super()

    #initialize the statemanager and inject some objects
    controller = @get('container').lookup('controller:slidethumbnails')
    view = @
    @set "dndManager", App.DnDManager.create(
      controller: controller
      view: view
    )
    #inject some objects onto the eventManager
    @get('eventManager').reopen(
                            parentView: @
                            dndManager: @dndManager)

    


  #all dnd events are captured/handled here
  eventManager: Ember.Object.create
    mouseMove: (event, view) ->
      if view isnt @
        slide = view.get('content')
        @get('dndManager').send "mouseMove", slide, event, view

    mouseLeave: (event, view) ->
      event.preventDefault()
      event.stopPropagation()
      if view is @get('parentView')
        @get('dndManager').send "mouseLeft"

    mouseUp: (event, view) ->
      event.preventDefault()
      event.stopPropagation()
      slide = view.get('content')
      @get('dndManager').send "mouseUp", slide, event.offsetX
    
    mouseDown: (event, view) ->
      event.preventDefault()
      event.stopPropagation()
      if view isnt @get('parentView')
        slide = view.get('content')
        @get('dndManager').send "mouseDown", slide, event.offsetX

  recordStartOffset: (slide, xpos) ->
    @set "dragStartOffset", xpos

  configureCursorImage: (viewEl) ->
    clone = viewEl.clone()
    image = clone.find('.slidethumbnail')
    image.removeClass('btn-warning')
    image.addClass('btn-primary')
    return image

  #dnd-related events
  startDrag: (slide, view) ->
    @set "dragSlide", slide
    slide.set "isDragging", true
    @draggingThumbnail = @configureCursorImage(view.$())
    @draggingThumbnail.appendTo('body')

  endDrag: (dragSlide) ->
    dragSlide.set "isDragging", false
    @setProperties dragSlide: null, dragStartOffset: null
    @draggingThumbnail.remove()
    @get('controller.store').commit()

  updateDraggingThumbnail: (cursorX, cursorY) ->
    @draggingThumbnail.css(
                           position: 'absolute',
                           left: cursorX,
                           top: cursorY)
