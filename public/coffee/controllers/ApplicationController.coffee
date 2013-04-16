App.ApplicationController = Ember.Controller.extend

  needs: ['slides', 'slide', 'user']

  userName: ''
  userPassword: ''
  
  loggedInUser: ''
  
  login: () ->
    if @get('userName') is 'pete' and @get('userPassword') is 'iddqd'
      Ember.set('App.loggedIn', true)
      @set('loggedInUser', @get('userName'))
      
    @set('userName', '')
    @set('userPassword', '')

    
  logout: () ->
    Ember.set('App.editingMode', false)
    Ember.set('App.loggedIn', false)
    @set('loggedInUser', '')
    
  goToEditing: () ->
    Ember.set('App.editingMode', true)
    
  exitEditing: () ->
    Ember.set('App.editingMode', false)