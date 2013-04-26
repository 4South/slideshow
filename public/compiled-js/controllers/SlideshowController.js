App.SlideshowController = Em.ObjectController.extend({
  needs: ['slides', 'user'],
  showSlides: function() {
    return this.transitionToRoute("slides");
  },
  deleteSlideshow: function() {
    if (confirm("Really delete this slideshow?")) {
      this.get('model').deleteRecord();
      this.get('store').commit();
      return this.replaceRoute('slideshows');
    }
  },
  saveSlideshowTitle: function() {
    return this.get('store').commit();
  }
});
