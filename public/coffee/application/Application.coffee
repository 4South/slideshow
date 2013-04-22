#change App.editingMode to a route of slideview
#move handlebars helpers to separate file
#remove hasMany experiments from Store


window.App = Ember.Application.create
  editingMode: false

require('store/Store.js')
require('router/Router.js')

showdown = new Showdown.converter()
Ember.Handlebars.registerBoundHelper('markdown', (value) ->
  if value?
    return new Ember.Handlebars.SafeString(showdown.makeHtml(value))
)

Em.TextField.reopenClass
  classNames: ['textfield']
  keyUp: (event)->
    if event.keyCode is 13
      @get('controller').login()

Ember.Application.initializer
  name: "Load Data",
  initialize: (container, application) ->
    App.Slideshow.find()
    App.Slide.find()
