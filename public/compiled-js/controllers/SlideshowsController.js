App.SlideshowsController = Em.ArrayController.extend({
  newName: '',
  needs: ['user'],
  slideShows: (function() {
    return App.Slideshow.find();
  }).property('controllers.user.content.@each').cacheable(),
  createSlideshow: function() {
    var newshow;

    window.user = this.get('controllers.user.content');
    newshow = App.Slideshow.createRecord({
      title: this.get('newName'),
      user: user
    });
    this.get('store').commit();
    return this.set('newName', '');
  }
});
