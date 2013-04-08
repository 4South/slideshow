App.SlideController = Em.ObjectController.extend
  
  save: () ->
    @get('store').commit()
