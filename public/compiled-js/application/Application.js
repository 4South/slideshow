var showdown;

window.App = Ember.Application.create({
  godMode: false,
  LOG_TRANSITIONS: true
});

require('store/Store.js');

require('router/Router.js');

showdown = new Showdown.converter();

Ember.Handlebars.registerBoundHelper('markdown', function(value) {
  if (value != null) {
    return new Ember.Handlebars.SafeString(showdown.makeHtml(value));
  }
});

Em.TextField.reopen({
  keyUp: function(event) {
    if (event.keyCode === 13) {
      return this.get('controller').enterCheat();
    }
  }
});
