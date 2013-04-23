App.ApplicationController = Ember.Controller.extend({
  needs: ['slide', 'user', 'slides', 'slideshow'],
  goToEditing: function() {
    return this.set('controllers.slideshow.editingMode', true);
  },
  exitEditing: function() {
    return this.set('controllers.slideshow.editingMode', false);
  }
});
