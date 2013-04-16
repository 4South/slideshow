App.UserController = Ember.ObjectController.extend
  content: ''
  newUser: Em.Object.create({name: '', email: '', password: ''})
  loginUser: Em.Object.create({name: '', password: ''})
  createUser: ->
    newuser = @get('newUser')
    window.newRecord = App.User.createRecord(newuser)
    @get('store').commit()
    @set('newUser', Em.Object.create({name: '', email: '', password: ''}))
    ##If successful
    @set('content', newRecord)
    Ember.set('App.loggedIn', true)
    
    #fix this hack
    Ember.run.later(@, @loadSlideShows, 100)
    
  userLogin: ->
    loginName = @get('loginUser.name')
    loginPw = @get('loginUser.password')
    
    #find record in DB with user / pw, if successful:
    Ember.set('App.loggedIn', true)
    
    @set('content', @get('loginUser'))
    Ember.run.later(@, @loadSlideShows, 100)
    
  loadSlideShows: ()->
    userID = @get('content.id')
    slideshows = App.Slideshow.find({user:userID})
    console.log slideshows
 
    
    #slideshows = App.Slideshow.find({user: user.get('id')})