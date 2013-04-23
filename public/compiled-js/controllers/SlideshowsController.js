App.SlideshowsController = Em.ArrayController.extend({
  newName: '',
  needs: ['user', 'slideshow'],
  slideShows: (function() {
    return App.Slideshow.find();
  }).property('content.@each').cacheable(),
  createSlideshow: function() {
    var newshow, user;

    user = this.get('controllers.user.content');
    newshow = App.Slideshow.createRecord({
      title: this.get('newName'),
      user: user,
      author: user.get('username')
    });
    this.get('store').commit();
    return this.set('newName', '');
  }
});
