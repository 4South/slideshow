App.SlidethumbnailsController = Em.ArrayController.extend

  needs: ['slideshow', 'slide', 'user', 'slides']
  contentBinding: "controllers.slides.content"
  activeSlideBinding: "controllers.slides.activeSlide"
  sortProperties: ['position']
  sortAscending: true

  resort: (slide, index, enumerable) ->
    slide.set('position', index)

  delete: (slide) ->
    pos = slide.get('position')-1
    #optional transition if deleted slide is the current route's slide
    @send 'transitionAfterDeletion', pos
    slide.deleteRecord()
    #todo fix timing hax with proper callback
    @get('store').commit()
    Ember.run.later(@, @updatePos, 250)
    
  updatePos: ->
    @get('arrangedContent').forEach(@resort, @get('arrangedContent')) 
    @set('content', App.Slide.find(slideshow: @get('controllers.slideshow.content.id')))      
    
      
  moveDown: (slide) ->
    if @findTarget(slide, @get('arrangedContent'), +1, 'position')?
      @swap(target, slide, 'position')

  moveUp: (slide) ->
    if @findTarget(slide, @get('arrangedContent'), -1, 'position')?
      @swap(slide, target, 'position')

  findTarget: (slide, array, relativeSearch, property) ->
    return array.objectAt(slide.get(property) + relativeSearch)

  swap: (decTarget, incTarget, property) ->
    decTarget.decrementProperty(property)
    incTarget.incrementProperty(property)
    @get('store').commit()
