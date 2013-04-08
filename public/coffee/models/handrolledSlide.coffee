App.Record = Ember.ObjectProxy.extend Ember.Evented, Ember.DeferredMixin,
  content: null
  tester: ""

#very simple recordArray object for this simple example
App.RecordArray = Ember.ArrayProxy.extend Ember.Evented, Ember.DeferredMixin,
  content: Em.A()

  notAlreadyLoaded: (record) ->
    if not @mapProperty('id').contains(record.id) then true else false
      
  load: (hash) ->
    _this = hash._this
    results = hash.results
    

  loadAll: (hash) ->
    _this = hash._this
    results = hash.results
    Ember.run(_this, () -> (
      for result in results
        #if this id already exists, don't duplicate
        if @notAlreadyLoaded(result)
          _this.pushObject App.Slide.create(result)
    ))

App.Slide = Em.Object.extend Ember.DeferredMixin,
  #model stores templateName to be used by view
  templateName: "baseslide"
  #each slide has a name
  name: "default slide"
  #each slide has a number (for progressing through slides)
  slideNumber: null
  active: false

#open the class definition to add a findAll class method
App.Slide.reopenClass

  find: (id) ->
    if id
      rec = App.Record.create()
      rec.then(rec.load)
      return rec
    return @findAll()
  
  #create a RecordArray object that inherits from Ember.Deffered (for promises)
  findAll: () ->
    #create new Record Array
    window.slides = App.RecordArray.create()
    slides.then(slides.loadAll)
    #send request to server for 'slides.json' and define a callback
    Ember.$.ajax(
      contentType: "application/json",
      url: "slides",
      method: 'GET',
      context: slides,
      success: (results) -> (
        @loadAll(_this: @, results: results)
      )
    )
    return slides
