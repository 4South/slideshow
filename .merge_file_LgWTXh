var showdown;

window.App = Ember.Application.create({
  editingMode: false
});

require('store/Store.js');

require('router/Router.js');

showdown = new Showdown.converter();

Ember.Handlebars.registerBoundHelper('markdown', function(value) {
  if (value != null) {
    return new Ember.Handlebars.SafeString(showdown.makeHtml(value));
  }
});

Em.TextField.reopenClass({
  classNames: ['textfield'],
  keyUp: function(event) {
    if (event.keyCode === 13) {
      return this.get('controller').login();
    }
  }
});
