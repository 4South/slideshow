App.ApplicationController = Ember.Controller.extend({
  needs: ['slides', 'slide'],
  userName: '',
  userPassword: '',
  loggedInUser: '',
  login: function() {
    if (this.get('userName') === 'pete' && this.get('userPassword') === 'iddqd') {
      Ember.set('App.loggedIn', true);
      this.set('loggedInUser', this.get('userName'));
    }
    this.set('userName', '');
    return this.set('userPassword', '');
  },
  logout: function() {
    Ember.set('App.editingMode', false);
    Ember.set('App.loggedIn', false);
    return this.set('loggedInUser', '');
  },
  goToEditing: function() {
    return Ember.set('App.editingMode', true);
  },
  exitEditing: function() {
    return Ember.set('App.editingMode', false);
  }
});
