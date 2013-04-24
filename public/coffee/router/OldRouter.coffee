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
  @resource "user", {path: 'user/'}, ->
    @route "create", {path: 'create/'}
    @route "edit", {path: 'edit/'}
  @resource "slideshows", {path: 'slideshows/'}
  @resource "slideshow", {path: 'slideshows/:slideshow_id/'}
  @resource "slides", {path: 'slideshows/:slideshow_id/slides'}
  @resource "slide", {path: 'slideshows/:slideshow_id/slides/:slide_id'}

App.SmartRoute = Ember.Route.extend
  resetOutlets : () ->
    @render 'blankthumbnails',
                    outlet: 'slidethumbnails'
                    into: 'application'
    @render 'blankcontrols',
                    outlet: 'controls'
                    into: 'application'
    @render 'blankrightbar',
                    outlet: 'rightbar'
                    into: 'application'

  configureControllers: () ->
    @controllerFor('slideshow').set('content', @modelFor('slideshow'))
    slides = App.Slide.find()
    @controllerFor('slides').set('content', slides)
    thumbnailCon = @container.lookup('controller:slidethumbnails')
    thumbnailCon.set('content', slides)
    

  renderTemplate: (controller, model) ->
    @_super()
    @resetOutlets()

  deactivate: () ->
    @resetOutlets()

App.ApplicationRoute = Ember.Route.extend
  events:
    updateActiveSlide: (newSlide) ->
      slidesCon = @controllerFor('slides')
      slidesCon.set('activeSlideIndex', newSlide.get('position'))
      @transitionTo('slide', slidesCon.get('activeSlide'))
    
App.IndexRoute = App.SmartRoute.extend
  redirect: () ->
    @replaceWith "slideshows"

App.SlideshowsRoute = App.SmartRoute.extend
  setupController: (controller, model)->
    controller.set('content', App.Slideshow.find())
  renderTemplate: (controller, model) ->
    @render "slideshows",
                    outlet: 'main'
    
App.SlideshowRoute = App.SmartRoute.extend
  renderTemplate: (controller, model) ->
    @_super()
    @render "slideshow",
                    into: 'application'
                    outlet: 'main'
  
  setupController: (controller, model) ->
    @configureControllers()

 
App.SlidesRoute = App.SmartRoute.extend
  events:
    transitionAfterDeletion: () ->
      return

  serialize: (model, params) ->
    object = {}
    object[params[0]] = @modelFor('slideshow').get('id')
    return object

  deserialize: (params)->
    #console.log "MODEL:", @model
    console.log 'deserializing', params['slideshow_id']
    
    slideshowId = params['slideshow_id']
    #console.log slideshowId, 'id'
    return @currentModel = App.Slide.find({slideshow:slideshowId})

  setupController: (controller, model) ->
    @configureControllers()
    
  renderTemplate: (controller) ->
    
    @render "slides",
                    into: 'application'
                    outlet: 'main'
                    controller: controller

    @render "slidethumbnails",
              into: 'application'
              outlet: 'slidethumbnails'
              controller: 'slidethumbnails'

    @render "maincontrols",
                    into: 'application'
                    outlet: 'controls'
                    controller: "slides"
                            
    @render "rightbar",
                    into: 'application'
                    outlet: 'rightbar'
                    controller: "slides"
                 
App.SlideRoute = App.SmartRoute.extend
  events:
    transitionAfterDeletion: (pos) ->
      slideAtPos = @controllerFor('slides').get('arrangedContent').objectAt(pos)
      if slideAtPos?
        @replaceWith "slide", slideAtPos
      else
        @replaceWith "slides"

  serialize: (model, params) ->
    object = {}
    object[params[0]] = @modelFor('slideshow').get('id')
    object[params[1]] = model.get('id')
    return object
     
  setupController: (controller, model) ->
    @configureControllers()

  renderTemplate: (controller) ->
    @render "showcontrols",
                    into: 'application'
                    outlet: 'controls'
                    controller: 'slides'

    @render "slidedetail",
                    into: 'application'
                    outlet: 'main'
                    controller: controller
    
    @render "slidethumbnails",
              into: 'application'
              outlet: 'slidethumbnails'
              controller: 'slidethumbnails'

    @render "rightbar",
                    into: 'application'
                    outlet: 'rightbar'
                    controller: "slides"

