App.ApplicationView = Em.View.extend({
  classNames: ['appview'],
  attributeBindings: ['tabindex'],
  tabindex: 1,
  keyUp: function(event) {
    switch (event.keyCode) {
      case 32:
      case 39:
      case 40:
        return this.get('controller.controllers.slides').forward();
      case 37:
      case 38:
        return this.get('controller.controllers.slides').back();
      case 13:
        return this.get('controller.controllers.user').login();
    }
  }
});
