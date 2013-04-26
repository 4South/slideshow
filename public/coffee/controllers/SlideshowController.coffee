App.SlideshowController = Em.ObjectController.extend
  needs: ['slides', 'user']

  showSlides: ->
    @transitionToRoute "slides"

  deleteSlideshow: ->
    if confirm "Really delete this slideshow?"
      @get('model').deleteRecord()
      @get('store').commit()
      @replaceRoute 'slideshows'
    
  saveSlideshowTitle: ->
    @get('store').commit()