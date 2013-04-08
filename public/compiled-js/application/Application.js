window.App = Ember.Application.create({
  godMode: false,
  LOG_TRANSITIONS: true
});

require('store/Store.js');

require('router/Router.js');

/*
showdown = new Showdown.converter()
Ember.Handlebars.registerBoundHelper('mdcontent', (value) ->
  return new Ember.Handlebars.SafeString(showdown.makeHtml(value))
)
*/

