App.ApplicationView = Em.View.extend({
  classNames: ['appview'],
  attributeBindings: ['tabindex'],
  tabindex: 1,
  keyUp: function(event) {
    switch (event.keyCode) {
      case 40:
      case 32:
      case 39:
        return this.get('controller.controllers.slides').forward();
      case 38:
      case 37:
        return this.get('controller.controllers.slides').back();
    }
  }
});
