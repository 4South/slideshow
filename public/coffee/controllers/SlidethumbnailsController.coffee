App.SlidethumbnailsController = Em.ArrayController.extend

  needs: ['slideshow', 'slide', 'user', 'slides']
  activeSlideBinding: "controllers.slides.activeSlide"
  sortProperties: ['position']
  sortAscending: true

  resort: (slide, index, enumerable) ->
    slide.set('position', index)

  delete: (slide) ->
    pos = slide.get('position')-1
    #optional transition if deleted slide is the current route's slide
    @send 'transitionAfterDeletion', pos
    console.log(@get('controllers.slides.content').toArray().length)
    slide.deleteRecord()
    console.log(@get('controllers.slides.content').toArray().length)
    #todo fix timing hax with proper callback
    @get('arrangedContent').forEach(@resort, @get('arrangedContent'))
    @get('store').commit()
    
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

  clickThumbnail: (targetSlide) ->
    console.log('clickthumbnail fired')
    @send "updateActiveSlide", targetSlide
