#very simple recordArray object for this simple example
Ember.RecordArray = Ember.ArrayProxy.extend Ember.Evented, Ember.DeferredMixin,
  content: Em.A()

App.Slide = Em.Object.extend Ember.DeferredMixin,
  #model stores templateName to be used by view
  templateName: "baseslide"
  #each slide has a name
  name: "default slide"
  #each slide has a number (for progressing through slides)
  slideNumber: null
  active: true

#open the class definition to add a findAll class method
App.Slide.reopenClass
  #find method will always return all records in this naive implementation
  find: () ->
    @findAll()
  
  #create a RecordArray object that inherits from Ember.Deffered (for promises)
  findAll: () ->
    #create new Record Array
    slides = Ember.RecordArray.create()
    #send request to server for 'slides.json' and define a callback
    Ember.$.ajax(
      contentType: "application/json",
      url: "slides",
      method: 'GET',
      context: slides,
      success: (results) -> (
        Ember.run(@, () -> (
          for result in results
            @pushObject App.Slide.create(result)
          )
        )
      )
    )
    return slides
