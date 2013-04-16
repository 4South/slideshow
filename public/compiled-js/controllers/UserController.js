App.UserController = Ember.ObjectController.extend({
  content: '',
  newUser: Em.Object.create({
    name: '',
    email: '',
    password: ''
  }),
  loginUser: Em.Object.create({
    name: '',
    password: ''
  }),
  createUser: function() {
    var newRecord, newuser;

    newuser = this.get('newUser');
    newRecord = App.User.createRecord(newuser);
    this.get('store').commit();
    this.set('newUser', Em.Object.create({
      name: '',
      email: '',
      password: ''
    }));
    this.set('content', newRecord);
    return Ember.set('App.loggedIn', true);
  },
  userLogin: function() {
    var loginName, loginPw;

    loginName = this.get('loginUser.name');
    loginPw = this.get('loginUser.password');
    Ember.set('App.loggedIn', true);
    return this.set('content', this.get('loginUser'));
  }
});
