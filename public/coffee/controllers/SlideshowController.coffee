App.SlideshowController = Em.ObjectController.extend
  needs: ['slides', 'user']
  showSlides: () ->
    @transitionToRoute "slides"
