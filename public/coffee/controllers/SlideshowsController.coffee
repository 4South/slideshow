App.SlideshowsController = Em.ArrayController.extend
  newName: ''
  needs: ['user']
  slideShows: (-> 
    return App.Slideshow.find()        
    ).property('controllers.user.content.@each').cacheable()
  createSlideshow: ->
    window.user = @get('controllers.user.content')
    newshow = App.Slideshow.createRecord
          title: @get('newName')
          user: user
    @get('store').commit()
    @set('newName', '')

