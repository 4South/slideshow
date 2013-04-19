App.ApplicationController = Ember.Controller.extend

  needs: ['slide', 'user', 'slides']

  goToEditing: () ->
    Ember.set('App.editingMode', true)
    
  exitEditing: () ->
    Ember.set('App.editingMode', false)