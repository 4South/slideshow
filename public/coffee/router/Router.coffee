#explicitly require our needed modules

require('models/User.js')
require('models/Slideshow.js')
require('models/Slide.js')

require('controllers/IndexController.js')
require('controllers/HeaderController.js')
require('controllers/ApplicationController.js')
require('controllers/SlideController.js')
require('controllers/SlidesController.js')
require('controllers/SlidethumbnailsController.js')
require('controllers/SlideshowsController.js')
require('controllers/SlideshowController.js')
require('controllers/UserController.js')



require('views/SlideTextField.js')
require('views/ApplicationView.js')
require('views/SlidesView.js')
require('views/SlidedetailView.js')
require('views/SlideThumbnailView.js')
require('views/SlidesthumbnailsView.js')
require('views/UserView.js')

#main router definition
App.Router.map () ->
  @resource "slideshows"
  @resource "slideshow", {path: 'slideshow/:slideshow_id'}, ->
    @resource "slide", {path: 'slides/:slide_id'}

App.ApplicationRoute = Ember.Route.extend
  events:
    updateActiveSlide: (newSlide) ->
      slidesCon = @controllerFor('slides')
      slidesCon.set('activeSlideIndex', newSlide.get('position'))
      @transitionTo('slide', slidesCon.get('activeSlide'))
    


App.IndexRoute = Ember.Route.extend
  redirect: ->
    @replaceWith 'slideshows'
  # renderTemplate: (controller, model) ->
    # @render 'index',
              # into: 'application'
              # outlet: 'slides'
              


App.SlideshowsRoute = Em.Route.extend
  setupController: (controller, model)->
    window.usercon = controller.get('userCon')
    window.cont = controller
    controller.set('content', App.Slideshow.find())
  renderTemplate: (controller, model) ->
    @render "slideshows",
                    into: 'application'
                    outlet: 'slides'
    #added this blank template to override thumbnails 
    #when coming back to this route from slideshow
    @render "blank",
                  into: 'application'
                  outlet: 'slidethumbnails'
    
    
App.SlideshowRoute = Em.Route.extend
  events:
    transitionAfterDeletion: () ->
      return

  #set the content using our model's custom 
  #find method (not ember-data)
  setupController: (controller, model) ->
    controller.set 'content', model
    slidesCon = @controllerFor('slides')
    window.slides = App.Slide.find({slideshow: model.get('id')})
    slidesCon.set('content', slides)
    
  renderTemplate: (controller) ->
    @render "slides",
                    into: 'application'
                    outlet: 'slides'
                    controller: controller
    @render "slidethumbnails",
              into: 'application'
              outlet: 'slidethumbnails'
              controller: 'slides'
                    
    @render "rightbar",
                    into: 'application'
                    outlet: 'rightbar'
                    controller: "slides"
                 

App.SlideRoute = Ember.Route.extend
  
  events:
    transitionAfterDeletion: (pos) ->
      slideAtPos = @controllerFor('slides').get('arrangedContent').objectAt(pos)
      if slideAtPos?
        @replaceWith "slide", slideAtPos
      else
        @replaceWith "slides"

  renderTemplate: (controller) ->
    @render "showcontrols",
                    into: 'application'
                    outlet: 'controls'
                    controller: 'slides'

    @render "slidedetail",
                    into: 'application'
                    outlet: 'slides'
                    controller: controller
    
    @render "rightbar",
                    into: 'application'
                    outlet: 'rightbar'
                    controller: "slides"
