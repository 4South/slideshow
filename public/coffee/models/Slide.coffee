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
    Ember.$.getJSON('slides.json', ( (results) ->
      #show the returned json for inspection/debugging
      console.log "json response was #{JSON.stringify(results)}"
      #serialize the returned JSON object and validate it then 
      #create instances of App.Slide and push them onto the 'slides' object
      slides.pushObjects Em.A(results.slides?.map( (item) ->
        App.Slide.create(item)
      ))
      return slides
    ))
    #return slides immediatly so that your caller recieves an object syncronously
    #when the json call completes, the object will be updated as shown above
    return slides
