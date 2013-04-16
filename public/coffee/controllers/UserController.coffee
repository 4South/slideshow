App.UserController = Ember.ObjectController.extend
  content: ''
  newUser: Em.Object.create({name: '', email: '', password: ''})
  loginUser: Em.Object.create({name: '', password: ''})
  createUser: ->
    newuser = @get('newUser')
    newRecord = App.User.createRecord(newuser)
    @get('store').commit()
    @set('newUser', Em.Object.create({name: '', email: '', password: ''}))
    ##If successful
    @set('content', newRecord)
    Ember.set('App.loggedIn', true)
    
  userLogin: ->
    loginName = @get('loginUser.name')
    loginPw = @get('loginUser.password')
    
    #find record in DB with user / pw, if successful:
    Ember.set('App.loggedIn', true)
    @set('content', @get('loginUser'))