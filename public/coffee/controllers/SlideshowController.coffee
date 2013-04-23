App.SlideshowController = Em.ObjectController.extend
  needs: ['slides', 'user']
  editingMode: false
  
  userIsAuthor: (->
    author = @get('content.author')
    user = @get('controllers.user.content.username')
    if author == user
      return true
    else return false
    
    ).property('content.author', 'controllers.user.content.@each')

  
  goToEditing: () ->
    if @get('userIsAuthor')
      @set('editingMode', true)
    else
      author = @get('content.author')
      alert('This slideshow may only be edited by: ' + author)
    
  exitEditing: () ->
   @set('editingMode', false)
  