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
    @get('arrangedContent').forEach(@resort, @get('arrangedContent'))
    @get('store').commit()
    @set('content', App.Slide.find(slideshow: @get('controllers.slideshow.content.id')))
    
  moveDown: (slide) ->
    target = @findTarget(slide, @get('arrangedContent'),
                        +1, 'position')
    if target?
      @swap(target, slide, 'position')

  moveUp: (slide) ->
    target = @findTarget(slide, @get('arrangedContent'),
                        -1, 'position')
    if target?
      @swap(slide, target, 'position')

  findTarget: (slide, array, relativeSearch, property) ->
    return array.objectAt(slide.get(property) + relativeSearch)

  swap: (decTarget, incTarget, property) ->
    decTarget.decrementProperty(property)
    incTarget.incrementProperty(property)
    @get('store').commit()
