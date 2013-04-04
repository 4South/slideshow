App.SlidesController = Em.ArrayController.extend
  
  newSlideName: ""
  
  #determines if current "new slide" name is valid for creation
  nameIsValid: (->
    name = @get('newSlideName')
    if (name.indexOf(" ") is -1) and name isnt ""
      return true
    else return false
  ).property('newSlideName')


  #list of slides whose active attribute is true
  activeSlides: (->
    return @get('content').filterProperty('active')
  ).property('content.@each.active')
  
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
