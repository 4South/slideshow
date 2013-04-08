App.SlidesController = Em.ArrayController.extend
  
  newSlideName: ""

  #determines if current "new slide" name is valid for creation
  nameIsValid: (->
    name = @get('newSlideName')
    if (name.indexOf(" ") is -1) and name isnt ""
      return true
    else return false
  ).property('newSlideName').cacheable()

  #list of slides whose active attribute is true
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

  
  #start the slideshow
  startShow: () ->
    if @get('activeSlide')?
      @transitionToRoute('slide', @get('activeSlide'))

  pauseShow: () ->
    @transitionToRoute('slides')
  
  
  #callback method for create CRUD success
  createNewSlide: (slide) ->
    Ember.run(@, -> (
      @pushObject App.Slide.create( name: slide.name,
                                    templateName: slide.name,
                                    id: slide.id )))

  #callback method for delete CRUD success
  deleteSlide: (deletedSlide) ->
    Ember.run(@, -> (
      delSlide = @filterProperty('id', deletedSlide.id)[0]
      @removeObject delSlide))
    
  #create CRUD operation
  create: () ->
    name = @get('newSlideName')
    if not @get('nameIsValid')
      alert('name may not contain spaces and must be defined')
    else
      data = JSON.stringify(name: name, templateName: name)
      Ember.$.ajax(
        contentType: "application/json",
        url: "create",
        method: 'POST',
        data: data,
        context: @,
        success: @createNewSlide
      )
      @set "newSlideName", ""

  #delete CRUD operation
  delete: (slide) ->
    if not confirm('Delete this slide/handlebars template?')
      return
    Ember.$.ajax(
      contentType: "application/json",
      url: "delete",
      method: 'DELETE',
      data: JSON.stringify(slide),
      context: @,
      success: @deleteSlide
    )
