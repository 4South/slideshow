App.SortedFilteredSet = Ember.ArrayProxy.extend Ember.SortableMixin,
  sortProperties: []
  sortAscending: true

App.SlidesController = Em.ArrayController.extend

  needs: ['slide', 'slideshow', 'user']
    
  newSlideName: ""
  activeSlideBinding: 'controllers.slide.content'
  currentSlideshowBinding: 'controllers.slideshow.content'

  filteredContent: (->
    curSlideShow = @get('currentSlideshow')
    filteredArray = @get('content').filterProperty('slideshow', curSlideShow)
    return App.SortedFilteredSet.create
      content: filteredArray
      sortProperties: ['position']
      sortAscending: true
  ).property('content.@each', 'currentSlideshow')

  #BOOLEAN HELPER COMPUTED PROPS
  #names cannot have spaces or be blank
  nameIsValid: (->
    name = @get('newSlideName')
    if (name.indexOf(" ") is -1) and name isnt ""
      return true
    else return false
  ).property('newSlideName').cacheable()

  #is there at least one slide in content?
  atleastOneSlide: (->
    #check to see if content is null to prevent error
    if @get('content')
      if @get('filteredContent').toArray().length is 0 then return false
      else return true
    else return false
  ).property('content.@each.id').cacheable()

  #helper method for atStart/atEnd
  isPositionAnExtreme: (activeSlide, extremeValue) ->
    if not activeSlide then return false
    if activeSlide.get('position') is extremeValue then return true
    else return false

  #is activeslide the first slide?
  atStart: (->
    activeSlide = @get('activeSlide')
    return @isPositionAnExtreme(activeSlide, 0)
  ).property('activeSlide').cacheable()

  #is activeslide the last slide?
  atEnd: (->
    activeSlide = @get('activeSlide')
    endPosition = @get('filteredContent').toArray().length-1
    return @isPositionAnExtreme(activeSlide, endPosition)
  ).property('activeSlide', 'filteredContent.@each').cacheable()

  #text used to notify user of unsaved changes
  savedStatus: (->
    if @get('content').someProperty('isDirty')
      return "Unsaved Changes"
    else return "All Changes Saved"
  ).property('content.@each.isDirty').cacheable()

  startShow: () ->
    if @get('activeSlide')?
      @transitionToRoute('slide', @get('activeSlide'))
    else if @get('filteredContent').toArray().length isnt 0
      @transitionToRoute('slide', @get('filteredContent.firstObject'))
     
  
  pauseShow: () ->
    @transitionToRoute('slides')

  #helper method for forward/back 
  findNewSlide: (positionDelta) ->
    newPosition = @get('activeSlide').get('position')+positionDelta
    return @get('content').findProperty('position', newPosition)

  forward: () ->
    if not @get('atEnd') then @transitionToRoute "slide", @findNewSlide(1)

  back: () ->
    if not @get('atStart') then @transitionToRoute "slide", @findNewSlide(-1)

  #CHANGE SLIDE ORDER FUNCTIONS
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


  #ADD/REMOVE SLIDES
  createSlide: () ->
    activeShow = @get('currentSlideshow')
    if not @get('nameIsValid')
      alert 'name must contain at least one character and no spaces'
    else
      App.Slide.createRecord
                name: @get('newSlideName')
                position: @get('filteredContent').toArray().length
                slideshow: activeShow
                title: @get('newSlideName')

      @get('store').commit()
      @set('newSlideName', '')

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
