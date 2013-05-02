App.SlidethumbnailsController = Ember.ArrayController.extend
  
  needs: ['slides']
  contentBinding: 'controllers.slides.content'
  filteredContentBinding: 'controllers.slides.filteredContent'

  reorderThumbnails: (newPos, targetSlide, dragSlide) ->
    slides = @get('filteredContent')
    origPos = dragSlide.get('position')
    
    #filter function
    inRange = (slide, index, slides) ->
      return slide.get('position') in @

    #map function
    incrementPos = (slide, index, slides) ->
      slide.incrementProperty('position')

    #map function to set position by array index
    setPosByIndex = (slide, index, slides) ->
      slide.set('position', index)

    #set new dragSlide position
    dragSlide.set('position', newPos)

    if newPos < origPos
      range = [newPos..origPos]
    else
      range = [newPos..slides.get('lastObject.position')]

    #increment position value of all slides in the range
    slides.without(dragSlide).filter(inRange, range).forEach(incrementPos)
    #remap position by array index
    slides.forEach(setPosByIndex)
     
  transitionToSlide: (target) ->
    @send "updateActiveSlide", target
