App.SlideshowController = Em.ObjectController.extend({
  needs: ['slides', 'user'],
  showSlides: function() {
    return this.transitionToRoute("slides");
  }
});
