App.ApplicationController = Ember.Controller.extend({
  needs: ['slide', 'user', 'slides'],
  goToEditing: function() {
    return Ember.set('App.editingMode', true);
  },
  exitEditing: function() {
    return Ember.set('App.editingMode', false);
  }
});
