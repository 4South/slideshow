App.SlidesController = Em.ArrayController.extend

  needs: ['slide', 'slideshow', 'user', 'slidethumbnails']
    
  newSlideName: ""
  sortProperties: ['position']
  sortAscending: true

  #index of currently active slide
  activeSlideIndex: 0
  
  #determines if current "new slide" name is valid for creation
  nameIsValid: (->
    name = @get('newSlideName')
    if (name.indexOf(" ") is -1) and name isnt ""
      return true
    else return false
  ).property('newSlideName').cacheable()

  activeSlide: (->
    if @get('atleastOneSlide')
      return @get('arrangedContent').objectAt(@get('activeSlideIndex'))
    else
      return null
  ).property('activeSlideIndex', 'arrangedContent.@each').cacheable()
 
  atleastOneSlide: (->
    #check to see if content is null to prevent error
    if @get('content')
      if @get('content').toArray().length is 0 then return false
      return true
    else
      return false
  ).property('content.@each').cacheable()

  #boolean helpers
  atStart: (->
    index = @get('activeSlideIndex')
    return if (index == 0) then true else false
  ).property('activeSlideIndex', 'arrangedContent.@each').cacheable()

  atEnd: (->
    index = @get('activeSlideIndex')
    contentLength = @get('arrangedContent').toArray().length
    return if (index is contentLength-1) then true else false
  ).property('activeSlideIndex', 'arrangedContent.@each').cacheable()


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
  forward: () ->
    if @get('atEnd') then return
    else
      curIndex = @get('activeSlide').get('position')
      newSlide = @get('arrangedContent').objectAt(curIndex+1)
      @send "updateActiveSlide", newSlide

  back: () ->
    if @get('atStart') then return
    else
      curIndex = @get('activeSlide').get('position')
      newSlide = @get('arrangedContent').objectAt(curIndex-1)
      @send "updateActiveSlide", newSlide


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
      
  goToSlideShows: ->
    @get('controllers.slideshow').exitEditing()
    @replaceRoute 'slideshows'
