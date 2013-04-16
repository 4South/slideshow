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
    var newuser;

    newuser = this.get('newUser');
    window.newRecord = App.User.createRecord(newuser);
    this.get('store').commit();
    this.set('newUser', Em.Object.create({
      name: '',
      email: '',
      password: ''
    }));
    this.set('content', newRecord);
    Ember.set('App.loggedIn', true);
    return Ember.run.later(this, this.loadSlideShows, 100);
  },
  userLogin: function() {
    var loginName, loginPw;

    loginName = this.get('loginUser.name');
    loginPw = this.get('loginUser.password');
    Ember.set('App.loggedIn', true);
    this.set('content', this.get('loginUser'));
    return Ember.run.later(this, this.loadSlideShows, 100);
  },
  loadSlideShows: function() {
    var slideshows, userID;

    userID = this.get('content.id');
    slideshows = App.Slideshow.find({
      user: userID
    });
    return console.log(slideshows);
  }
});
