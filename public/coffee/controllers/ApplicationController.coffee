App.ApplicationController = Ember.Controller.extend

  needs: ['slides', 'slide']

  cheatcode: ''

  enterCheat: () ->
    if @get('cheatcode') is 'iddqd'
      Ember.set('App.godMode', true)
    @set('cheatcode', '')

  abdicate: () ->
    Ember.set('App.godMode', false)
