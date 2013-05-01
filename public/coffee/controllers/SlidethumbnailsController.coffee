require('controllers/SlidethumbnailsManager.js')

App.SlidethumbnailsController = Ember.ArrayController.extend
  
  needs: ['slides']
  contentBinding: 'controllers.slides.content'
  filteredContentBinding: 'controllers.slides.filteredContent'

  manager: App.SlidethumbnailsManager.create()

  thumbnailWrapperWidth: 160
  
  #thumbnail itself is always a bit smaller than its container
  thumbnailWidth: (->
    @get('thumbnailWrapperWidth') * .9
  ).property('thumbnailWrapperWidth')
  
  #position of current droptarget 
  targetPos: null
  
  #stores currently dragging slide
  dragSlide: null
  #stores starting drag position
  dragStartPos: null

  #MODEL FLAG TO INDICATE THE SLIDE BEING DRAGGED
  startDrag: (slide, xpos) ->
    @setProperties dragSlide: slide, dragStartPos: xpos

  endDrag: () ->
    @setProperties dragSlide: null, dragStartPos: null
    @get('store').commit()

  reorderThumbnails: (newPos) ->
    dragSlide = @get('dragSlide')
    #store dragSlide.pos in origPos
    origPos = dragSlide.get('position')
    slides = @get('filteredContent')
    filteredSlides = []

    dragSlide.set "position", newPos

    #set range of slides to increment
    if newPos < origPos
      range = [newPos..origPos]
    else
      lastObjPos = slides.get('lastObject.position')
      range = [newPos..lastObjPos]

    #get list of slides in range w/o dragSlide
    for slide in slides.without(dragSlide)
      isTrue = range.some((item) -> item is slide.get('position'))
      if isTrue then filteredSlides.pushObject slide
    
    #helper function for incrementing
    incrementPosition = (slide) ->
      return slide.incrementProperty('position')

    #increment slides in range
    filteredSlides.forEach(incrementPosition)

    #forEach slide, remap 'position' attribute by array index
    slides.forEach( (slide, index) -> slide.set('position', index))

  transitionToSlide: (target) ->
    @send "updateActiveSlide", target
