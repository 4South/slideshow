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
require('views/SlideshowsView.js')
require('views/UserView.js')

#main router definition
App.Router.map () ->
  @resource "slideshows"
  @resource "slideshow", {path: 'slideshow/:slideshow_id'}, ->
    @resource "slides", {path: '/slides'}
    @resource "slide", {path: 'slides/:slide_id'}

App.ApplicationRoute = Ember.Route.extend
  events:
    updateActiveSlide: (newSlide) ->
      slidesCon = @controllerFor('slides')
      slidesCon.set('activeSlideIndex', newSlide.get('position'))
      @transitionTo('slide', slidesCon.get('activeSlide'))
    
App.IndexRoute = Ember.Route.extend
  renderTemplate: (controller, model) ->
    @render 'index',
        into: 'application'
        outlet: 'slides'
 
App.SlideshowsRoute = Em.Route.extend
  setupController: (controller, model)->
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
  renderTemplate: (controller, model) ->
    @render "slideshow",
      into: 'application'
      outlet: 'slides'
    
App.SlidesRoute = Em.Route.extend
  events:
    transitionAfterDeletion: () ->
      return

  #set the content using our model's custom 
  #find method (not ember-data)
  setupController: (controller, model) ->
    slideshow = @controllerFor('slideshow').get('content') 
    slides = App.Slide.find({slideshow: slideshow.get('id')})
    controller.set('content', slides)
    
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
    @render "maincontrols",
                    into: 'user'
                    outlet: 'controls'
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
                    into: 'user'
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
