App.SlidesController = Em.ArrayController.extend

  needs: ['slide', 'slideshow', 'user', 'slidethumbnails']
    
  newSlideName: ""
  sortProperties: ['position']
  sortAscending: true
  activeSlideBinding: 'controllers.slide.content'

  #index of currently active slide
  activeSlideIndex: 0
  
  #determines if current "new slide" name is valid for creation
  nameIsValid: (->
    name = @get('newSlideName')
    if (name.indexOf(" ") is -1) and name isnt ""
      return true
    else return false
  ).property('newSlideName').cacheable()

  atleastOneSlide: (->
    #check to see if content is null to prevent error
    if @get('content')
      if @get('content').toArray().length is 0 then return false
      return true
    else
      return false
  ).property('content.@each.id').cacheable()

  #boolean helpers
  atStart: (->
    activeSlide = @get('activeSlide')
    if not activeSlide then return false
    if activeSlide.get('position') is 0 then return true
    else return false
  ).property('activeSlide').cacheable()

  atEnd: (->
    activeSlide = @get('activeSlide')
    endPosition = @get('arrangedContent').toArray().length-1
    if not activeSlide then return false
    if (activeSlide.get('position') is endPosition)
      return true
    else return false
  ).property('activeSlide', 'arrangedContent.@each').cacheable()


  #text used to notify user of unsaved changes
  savedStatus: (->
    if @get('content').someProperty('isDirty')
      return "Unsaved Changes"
    else return "All Changes Saved"
  ).property('content.@each.isDirty').cacheable()

  #start the slideshow
  startShow: () ->
    if @get('activeSlide')?
      @transitionToRoute('slide', @get('activeSlide'))
  
  #pause show
  pauseShow: () ->
    @transitionToRoute('slides')

  #SLIDE NAVIGATION UTILS
  findNewSlide: (shouldExit, positionDelta) ->
    if shouldExit then return
    else
      newPosition = @get('activeSlide').get('position')+positionDelta
      newSlide = @get('content').findProperty('position', newPosition)
      @send "updateActiveSlide", newSlide

  forward: () ->
    @findNewSlide(@get('atEnd'), 1)

  back: () ->
    @findNewSlide(@get('atStart'), -1)


  #CREATE CRUD
  create: () ->
    activeShow = @get('controllers.slideshow.content')
    if @get('nameIsValid')
      App.Slide.createRecord
                name: @get('newSlideName')
                position: @get('content').toArray().length
                slideshow: activeShow
                title: @get('newSlideName')
      @get('store').commit()
      @set('newSlideName', '')
      slides = App.Slide.find(slideshow: activeShow.get('id'))
      @set('content', slides)
    else
      alert ('name must contain at least one character and no spaces')
