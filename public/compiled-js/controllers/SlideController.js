App.SlideController = Em.ObjectController.extend({
  save: function() {
    return this.get('store').commit();
  }
});
