App.UserController = Ember.ObjectController.extend
  needs: ['slideshow']
  content: ''
  formUsername: ''
  formPassword: ''
  formEmail: ''
  errorMessage: ''
  loginUser: ''
  loginPassword: ''
  editingMode: false
  
  editingButtonText: (->
    return if @get('editingMode') then "goto viewing mode" else "goto editing mode"
  ).property('editingMode')

  loggedInUser:(->
    return @get('content.username')
  ).property('content.username').cacheable()
  
  permissionToEdit: (->
    author = @get('controllers.slideshow.content.author')
    user = @get('username')
    if author is user then return true
    else return false
  ).property('controllers.slideshow.content.author', 'username')

  permittedAndEditing: (->
    if (@get('permissionToEdit') and @get('editingMode')) then true
    else false
  ).property('permissionToEdit', 'editingMode')

  enterEditingMode: () ->
    @set('editingMode', true)
    
  exitEditing: () ->
    @set('editingMode', false)
  
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

  validNewUser: ->
    if @get('formUsername') != '' and
    @get('formPassword') != '' and
    @get('formPassword') != ''
      return true
    else return false

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
            @get('store').load(App.User, data)
            @set('content', App.User.find(data.id))
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
            
  sessionLogin: () ->
    @userAjax('/user/sessionlogin', 'GET',
      success: (data) ->
        Ember.run(@, () ->
          @get('store').load(App.User, data)
          @set('content', App.User.find(data.id))
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
          @get('store').load(App.User, data)
          @set('content', App.User.find(data.id))
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
          @get('store').unloadRecord(@get('content'))
          @set('content', null)
          @exitEditing()
        )
      error: (xhr) ->
        Ember.run(@, ()->
          @set('errorMessage', 'logout failed')
        )
     )
