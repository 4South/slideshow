App.SlideshowsController = Em.ArrayController.extend

  newName: ''
  needs: ['user']

  slideShows: (->
    return App.Slideshow.find()
  ).property('content.@each').cacheable()

  createSlideshow: ->
    user = @get('controllers.user.content')
    newshow = App.Slideshow.createRecord
              title: @get('newName')
              user: user
    @get('store').commit()
    @set('newName', '')
