App.SlidesController = Em.ArrayController.extend

  needs: ['slide', 'slideshow', 'user']
    
  newSlideName: ""
  sortProperties: ['position']
  sortAscending: true
  activeSlideBinding: 'controllers.slide.content'
  currentSlideShowBinding: 'controllers.slideshow.content'

  filteredContent: (->
    curSlideShow = @get('currentSlideShow')
    window.fuckit = @get('contet')
    console.log(@get('content'))
    return @get('content').filterProperty('slideshow', curSlideShow)
  ).property('content.@each', 'currentSlideShow')

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
      if @get('content').toArray().length is 0 then return false
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

  #SHOW CONTROLS

  clickThumbnail: (targetSlide)->
    @transitionToRoute "slide", targetSlide

  startShow: () ->
    if @get('activeSlide')?
      @transitionToRoute('slide', @get('activeSlide'))
  
  pauseShow: () ->
    @transitionToRoute('slides')

  #helper method for forward/back 
  findNewSlide: (shouldExit, positionDelta) ->
    if not shouldExit
      newPosition = @get('activeSlide').get('position')+positionDelta
      newSlide = @get('content').findProperty('position', newPosition)
      @send "updateActiveSlide", newSlide

  forward: () ->
    @findNewSlide(@get('atEnd'), 1)

  back: () ->
    @findNewSlide(@get('atStart'), -1)

  #CHANGE SLIDE ORDER FUNCTIONS
  #helper method for moveDown/moveUp
  findTarget: (slide, array, relativesearch, property) ->
    return array.objectAt(slide.get(property) + relativesearch)

  #helper method for moveDown/moveUp
  swap: (dectarget, inctarget, property) ->
    dectarget.decrementProperty(property)
    inctarget.incrementProperty(property)
    @get('store').commit()

  moveDown: (slide) ->
    if @findTarget(slide, @get('filteredContent'), +1, 'position')?
      @swap(target, slide, 'position')

  moveUp: (slide) ->
    if @findTarget(slide, @get('filteredContent'), -1, 'position')?
      @swap(slide, target, 'position')


  #ADD/REMOVE SLIDES
  createSlide: () ->
    activeShow = @get('controllers.slideshow.content')
    if not @get('nameIsValid')
      alert 'name must contain at least one character and no spaces'
    else
      App.Slide.createRecord
                name: @get('newSlideName')
                position: @get('content').toArray().length
                slideshow: activeShow
                title: @get('newSlideName')

      @get('store').commit()
      @set('newSlideName', '')
      window.bucket = DS.defaultStore.get('defaultTransaction.buckets')

  deleteSlide: (slide) ->
    arrCon = @get('filteredContent')
    currentPos = slide.get('position')
    slide.deleteRecord()
    console.log slide.get('stateManager.currentState.name')
    console.log arrCon.toArray()
    console.log @get('content').toArray()
    window.bucket = DS.defaultStore.get('defaultTransaction.buckets')
    
    if @get('atleastOneSlide')
      i = 0
      for eachslide in arrCon
        if slide isnt eachslide
          eachslide.set('position', i)
          i=i+1
          
    @get('store').commit()
