App.SlideshowsController = Em.ArrayController.extend
  newName: ''
  needs: ['user', 'slideshow']
  slideShows: (-> 
    return App.Slideshow.find()        
    ).property('content.@each').cacheable()
  #create a new slideshow and commit it
  createSlideshow: ->
    user = @get('controllers.user.content')
    newshow = App.Slideshow.createRecord
          title: @get('newName')
          user: user
          author: user.get('username')
    @get('store').commit()
    @set('newName', '')

