App.SlidesController = Em.ArrayController.extend

  needs: ['application', 'slide']

  newSlideName: ""

  sortProperties: ['position']
  sortAscending: true

  #determines if current "new slide" name is valid for creation
  nameIsValid: (->
    name = @get('newSlideName')
    if (name.indexOf(" ") is -1) and name isnt ""
      return true
    else return false
  ).property('newSlideName').cacheable()

  #index of currently active slide
  activeSlideIndex: 0
  
  activeSlide: (->
    if @get('atleastOneSlide')
      return @get('content').objectAt(@get('activeSlideIndex'))
    else
      return null
  ).property('activeSlideIndex', 'content.@each').cacheable()
 
  atleastOneSlide: (->
    if @get('content').toArray().length is 0 then return false
    return true
  ).property('content.@each').cacheable()

  #boolean helpers
  atEnd: (->
    index = @get('activeSlideIndex')
    contentLength = @get('content').toArray().length
    return if (index == contentLength-1) then true else false
  ).property('activeSlideIndex', 'content.@each').cacheable()

  atStart: (->
    index = @get('activeSlideIndex')
    return if (index == 0) then true else false
  ).property('activeSlideIndex', 'content.@each').cacheable()
  
  #start the slideshow
  startShow: () ->
    if @get('activeSlide')?
      @transitionToRoute('slide', @get('activeSlide'))

  pauseShow: () ->
    @transitionToRoute('slides')

  forward: () ->
    if @get('atEnd') then return
    else
      @incrementProperty('activeSlideIndex')
      @transitionToRoute('slide', @get('activeSlide'))

  back: () ->
    if @get('atStart') then return
    else
      @decrementProperty('activeSlideIndex')
      @transitionToRoute('slide', @get('activeSlide'))

  
  #create CRUD operation
  create: () ->
    if @get('nameIsValid')
      App.Slide.createRecord
                name: @get('newSlideName')
                position: @get('content').toArray().length
      @get('store').commit()
      @set('newSlideName', '')
    else
      alert ('name must contain at least one character and no spaces')
