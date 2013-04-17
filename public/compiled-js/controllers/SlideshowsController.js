App.SlideshowsController = Em.ArrayController.extend({
  needs: ['user'],
  newName: '',
  slideShows: (function() {
    var user;

    user = this.get('userCon.content');
    return App.Slideshow.find({
      user: user.get('id')
    });
  }).property('userCon.content.slideshows.@each').cacheable(),
  createSlideshow: function() {
    var newshow;

    window.user = this.get('userCon.content');
    newshow = App.Slideshow.createRecord({
      title: this.get('newName'),
      user: user
    });
    this.get('store').commit();
    return this.set('newName', '');
  }
});
