var showdown;

window.App = Ember.Application.create();

require('store/Store.js');

require('router/Router.js');

showdown = new Showdown.converter();

Ember.Handlebars.registerBoundHelper('markdown', function(value) {
  if (value != null) {
    return new Ember.Handlebars.SafeString(showdown.makeHtml(value));
  }
  return new Ember.Handlebars.SafeString(showdown.makeHtml(""));
});

Ember.Application.initializer({
  name: "session login",
  initialize: function(container, application) {
    var userCon;

    userCon = container.lookup('controller:user');
    return userCon.sessionLogin();
  }
});

App.register('controller:fontsetting', App.FontsettingController, {
  singleton: false
});
