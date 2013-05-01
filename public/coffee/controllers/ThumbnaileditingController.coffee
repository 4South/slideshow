App.ThumbnaileditingController = Ember.ObjectController.extend

  needs: ['slides', 'slide', 'slidethumbnails']
  contentBinding: 'controllers.slide.content'
 
  #helper method for moveDown/moveUp
  findTarget: (slide, array, deltaPos) ->
    return array.findProperty('position', slide.get('position')+deltaPos)

  #helper method for moveDown/moveUp
  swap: (dectarget, inctarget, property) ->
    dectarget.decrementProperty(property)
    inctarget.incrementProperty(property)
    @get('store').commit()

  moveDown: (slide) ->
    target = @findTarget(slide, @get('filteredContent'), 1, 'position')
    if target?
      @swap(target, slide, 'position')

  moveUp: (slide) ->
    target = @findTarget(slide, @get('filteredContent'), -1, 'position')
    if target?
      @swap(slide, target, 'position')

  #TODO: REFACTOR
  deleteSlide: (slide) ->
    arrCon = @get('filteredContent')
    withoutDeleted = arrCon.without(slide)
    currentPos = slide.get('position')
    slide.deleteRecord()
    withoutDeleted.forEach( (eachslide, index) ->
      eachslide.set('position', index)
    )
    @get('store').commit()
    if @get('atleastOneSlide')
      target = withoutDeleted.findProperty('position', currentPos)
      if target then @replaceRoute 'slide', target
      else @replaceRoute('slide', withoutDeleted.get('lastObject'))
    else @replaceRoute 'slides'
