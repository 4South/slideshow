App.UserController = Ember.ObjectController.extend
  needs: ['slideshow']
  content: ''
  formUsername: ''
  formPassword: ''
  formEmail: ''
  errorMessage: ''
  loginUser: ''
  loginPassword: ''
  
  loggedInUser:(->
    return @get('content.username')
  ).property('content.username').cacheable()
  
  createData: (->
    username: @get('formUsername')
    password: @get('formPassword')
    email: @get('formEmail')
  ).property('formUsername', 'formPassword', 'formEmail')

  loginData: (->
    username: @get('loginUser')
    password: @get('loginPassword')
  ).property('loginUser', 'loginPassword')
  

  loggedIn: (->
    if @get('content') then return true else return false
  ).property('content')

  resetForm: () ->
    @set('formUsername', '')
    @set('formPassword', '')
    @set('formEmail', '')
  

  userAjax: (url, type, hash) ->
    #reset user errorMessage
    @set('errorMessage', '')

    hash.url = url
    hash.type = type
    hash.dataType = 'json'
    hash.contentType = 'application/json; charset=utf-8'
    hash.context = @
    
    if (hash.data and type isnt "GET")
      hash.data = JSON.stringify(hash.data)
    
    Ember.$.ajax(hash)

  create: () ->
    if @validNewUser() is true
      @userAjax('/user/create', 'POST',
        data: @get('createData')
        success: (data) ->
          Ember.run(@, () ->
            @set('content', Ember.Object.create(data))
            @transitionToRoute('slideshows')
          )
        error: (xhr) ->
          Ember.run(@, () ->
            @set('errorMessage', 'account creation failed, try again')
          )
        complete: () ->
          Ember.run(@, () ->
            @resetForm()

          )
      )
    else
      alert 'Please fill out each field for User Creation'
      @resetForm()
            
  validNewUser: ->
    if @get('formUsername') != '' and
    @get('formPassword') != '' and
    @get('formPassword') != ''
      return true
    else return false

  sessionLogin: () ->
    @userAjax('/user/sessionlogin', 'GET',
      success: (data) ->
        Ember.run(@, () ->
          @set('content', Ember.Object.create(data))
          @transitionToRoute 'slideshows'
        )
      error: (xhr) ->
        return
      complete: () ->
        Ember.run(@, () ->
          @resetForm()
        )
     )

  login: () ->
    @userAjax('/user/login', 'POST',
      data: @get('loginData')
      success: (data) ->
        Ember.run(@, () ->
          @set('content', Ember.Object.create(data))
          @transitionToRoute 'slideshows'
        )
      error: (xhr) ->
        Ember.run(@, () ->
          @set('errorMessage', 'login failed please try again')
        )
      complete: () ->
        Ember.run(@, () ->
          @resetForm()
        )
     )

  logout: () ->
    @userAjax('/user/logout', 'GET',
      success: (data) ->
        Ember.run(@, ()->
          @set('content', null)
          @get('controllers.slideshow').exitEditing()
          @replaceRoute 'index'
        )
      error: (xhr) ->
        Ember.run(@, ()->
          @set('errorMessage', 'logout failed')
        )
     )
     
  home: ->
    @replaceRoute 'index'
