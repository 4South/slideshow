var showdown;

window.App = Ember.Application.create();

require('store/Store.js');

require('router/Router.js');

showdown = new Showdown.converter();

Ember.Handlebars.registerBoundHelper('markdown', function(value) {
  if (value != null) {
    return new Ember.Handlebars.SafeString(showdown.makeHtml(value));
  }
});

Em.TextField.reopen({
  classNames: ['textfield'],
  keyUp: function(event) {
    if (event.keyCode === 13) {
      return this.get('controller').login();
    }
  }
});

Ember.Application.initializer({
  name: "Load Data",
  initialize: function(container, application) {
    App.Slideshow.find();
    return App.Slide.find();
  }
});
