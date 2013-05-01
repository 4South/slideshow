require('controllers/SlidethumbnailsManager.js')

App.SlidethumbnailsView = Em.View.extend
  tagName: 'div'
  classNames: ['slidethumbnailsviewport']

  init: () ->
    @_super()

    #initialize the statemanager and inject some objects
    controller = @get('controller')
    view = @
    
    @set "dndManager", App.DnDManager.create(
      controller: controller
      view: view
    )

    @get('eventManager').reopen(
                            parentView: @
                            dndManager: @dndManager)


  eventManager: Ember.Object.create
    mouseMove: (event, view) ->
      if view isnt @
        slide = view.get('content')
        @get('dndManager').send "mouseMove", slide, event.offsetX

    mouseLeave: (event, view) ->
      event.preventDefault()
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

  #in px, used to calculate size of viewport scrollbar
  viewportWidth: (->
    thumbnailCount = @get('controller.filteredContent.length')
    "width: #{thumbnailCount * @get('controller.thumbnailWrapperWidth')}px;"
  ).property('controller.filteredContent', 'controller.thumbnailWrapperWidth')
