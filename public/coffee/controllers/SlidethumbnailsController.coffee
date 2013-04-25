App.SlidethumbnailsController = Em.ArrayController.extend

  needs: ['slideshow', 'slide', 'user', 'slides']
  activeSlideBinding: "controllers.slides.activeSlide"
  contentBinding: 'controllers.slides.content'
  arrangedContentBinding: 'controllers.slides.arrangedContent'
  sortProperties: ['position']
  sortAscending: true

  atleastOneSlide: (->
    #check to see if content is null to prevent error
    if @get('content')
      if @get('content').toArray().length is 0 then return false
      return true
    else
      return false
  ).property('content.@each.id').cacheable()

  delete: (slide) ->
    
    arrCon = @get('arrangedContent')
    currentPos = slide.get('position')
    slide.deleteRecord()
    console.log arrCon.toString()
    
    #if @get('atleastOneSlide') 
    #  i = 0
    #  for eachslide in arrCon
    #    if slide isnt eachslide
    #      eachslide.set('position', i)
    #      i=i+1
    #      
    #  target = @get('content').filterProperty('position', currentPos)
    #  if not target
    #    target = @get('arrangedContent').get('lastObject')

    @get('store').commit()
    
  moveDown: (slide) ->
    if @findTarget(slide, @get('arrangedContent'), +1, 'position')?
      @swap(target, slide, 'position')

  moveUp: (slide) ->
    if @findTarget(slide, @get('arrangedContent'), -1, 'position')?
      @swap(slide, target, 'position')

  findTarget: (slide, array, relativesearch, property) ->
    return array.objectAt(slide.get(property) + relativesearch)

  swap: (dectarget, inctarget, property) ->
    dectarget.decrementProperty(property)
    inctarget.incrementProperty(property)
    @get('store').commit()

  clickThumbnail: (targetslide) ->
    console.log('clickthumbnail fired')
    @send "updateActiveSlide", targetslide
