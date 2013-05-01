App.SlideshowController = Em.ObjectController.extend
  needs: ['slides', 'user']
  
  savedStatus: (->
    if @get('content.isDirty')
      return "Unsaved Changes"
    else return "All Changes Saved"
  ).property('content.isDirty').cacheable()
  
  
  showSlides: ->
    @transitionToRouteAnimated "slides", {main:"flip"}

  deleteSlideshow: ->
    if confirm "Really delete this slideshow?"
      @get('model').deleteRecord()
      @get('store').commit()
      @replaceRouteAnimated('slideshows', {main:'flip'})
    
  saveSlideshowTitle: ->
    @get('store').commit()