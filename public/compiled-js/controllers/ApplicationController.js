App.ApplicationController = Ember.Controller.extend({
  needs: ['slides', 'slide'],
  cheatcode: '',
  enterCheat: function() {
    if (this.get('cheatcode') === 'iddqd') {
      Ember.set('App.godMode', true);
    }
    return this.set('cheatcode', '');
  },
  abdicate: function() {
    return Ember.set('App.godMode', false);
  }
});
