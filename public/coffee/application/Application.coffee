window.App = Ember.Application.create()

require('store/Store.js')
require('router/Router.js')

showdown = new Showdown.converter()
Ember.Handlebars.registerBoundHelper('markdown', (value) ->
  if value?
    return new Ember.Handlebars.SafeString(showdown.makeHtml(value))
  return new Ember.Handlebars.SafeString(showdown.makeHtml(""))
)

Ember.Application.initializer
  name: "session login",
  initialize: (container, application) ->
    userCon = container.lookup('controller:user')
    userCon.sessionLogin()

#quick hack to inspect ember data objects
Ember.run.later(@, (() ->
  window.bucket = DS.defaultStore.get('defaultTransaction.buckets')), 3000
)
