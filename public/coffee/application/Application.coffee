window.App = Ember.Application.create
  godMode: false
  LOG_TRANSITIONS: true

#require ember data store
require('store/Store.js')
#import the router module
require('router/Router.js')

showdown = new Showdown.converter()
Ember.Handlebars.registerBoundHelper('markdown', (value) ->
  if value?
    return new Ember.Handlebars.SafeString(showdown.makeHtml(value))
)

