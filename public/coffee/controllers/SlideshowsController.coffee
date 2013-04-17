App.SlideshowsController = Em.ArrayController.extend
  needs: ['user']
  newName: ''
  
  slideShows: (->
    user = @get('userCon.content')
    return App.Slideshow.find({user:user.get('id')})
    ).property('userCon.content.slideshows.@each').cacheable()
  
  createSlideshow: ->
    window.user = @get('userCon.content')
    newshow = App.Slideshow.createRecord
          title: @get('newName')
          user: user
    @get('store').commit()
    @set('newName', '')

