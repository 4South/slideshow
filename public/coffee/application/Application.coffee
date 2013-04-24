#change App.editingMode to a route of slideview
#move handlebars helpers to separate file
#remove hasMany experiments from Store

window.App = Ember.Application.create()
#require ember data store
require('store/Store.js')
require('router/Router.js')

showdown = new Showdown.converter()
Ember.Handlebars.registerBoundHelper('markdown', (value) ->
  if value?
    return new Ember.Handlebars.SafeString(showdown.makeHtml(value))
  return ""
)

Ember.Application.initializer
  name: "load data",
  initialize: (container, application) ->
    App.Slideshow.find()
    App.Slide.find()

Ember.Application.initializer
  name: "session login",
  initialize: (container, application) ->
    userCon = container.lookup('controller:user')
    userCon.sessionLogin()
