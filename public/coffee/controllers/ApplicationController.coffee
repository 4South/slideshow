App.ApplicationController = Ember.Controller.extend

  needs: ['slide', 'user', 'slides', 'slideshow']

  goToEditing: () ->
   @set('controllers.slideshow.editingMode', true)
    
  exitEditing: () ->
   @set('controllers.slideshow.editingMode', false)