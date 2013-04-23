window.App = Ember.Application.create()
#require ember data store
require('store/Store.js')
#import the router module
require('router/Router.js')

showdown = new Showdown.converter()
Ember.Handlebars.registerBoundHelper('markdown', (value) ->
  if value?
    return new Ember.Handlebars.SafeString(showdown.makeHtml(value))
)

Em.TextField.reopen
  classNames: ['textfield']
  keyUp: (event)->
    if event.keyCode is 13
      @get('controller').login()
         
Ember.Application.initializer
  name: "Load Data",
  initialize: (container, application) ->
    App.Slideshow.find()
    App.Slide.find()