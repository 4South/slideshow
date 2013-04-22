App.SlideshowsController = Em.ArrayController.extend
  newName: ''
  needs: ['user']
  slideShows: (-> 
    return App.Slideshow.find()        
    ).property('content.@each').cacheable()
  #create a new slideshow and commit it
  createSlideshow: ->
    user = @get('controllers.user.content')
    newshow = App.Slideshow.createRecord
          title: @get('newName')
          user: user
    @get('store').commit()
    @set('newName', '')

