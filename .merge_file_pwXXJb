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

Em.TextField.reopen({
  classNames: ['textfield'],
  keyUp: function(event) {
    if (event.keyCode === 13) {
      return this.get('controller').login();
    }
  }
});

Ember.Application.initializer({
  name: "user",
  initialize: function(container, application) {
    container.optionsForType('user', {
      singleton: true
    });
    container.register('user:main', App.UserController);
    return container.typeInjection('controller', 'userCon', 'user:main');
  }
});
