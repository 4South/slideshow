App.SlidethumbnailsController = Em.ArrayController.extend

  needs: ['slides']
  contentBinding: "controllers.slides.content"
  sortProperties: ['position']
  sortAscending: true

  delete: (slide) ->
    slide.deleteRecord()
    @get('store').commit()

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
