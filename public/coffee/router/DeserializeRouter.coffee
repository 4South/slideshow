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
  @resource "user", {path: '/user'}, ->
    @route "create", {path: '/create'}
    @route "edit", {path: '/edit'}
  @resource "slideshows", {path: '/slideshows'}, ->
    @resource "slideshow", {path: '/:slideshow_id'}, ->
      @resource "slides", {path: '/slides'}, ->
        @resource "slide", {path: '/:slide_id'}

App.SmartRoute = Ember.Route.extend
  resetOutlets: () ->
    @render 'blankthumbnails',
                    outlet: 'slidethumbnails'
                    into: 'application'
    @render 'blankcontrols',
                    outlet: 'controls'
                    into: 'application'
    @render 'blankrightbar',
                    outlet: 'rightbar'
                    into: 'application'

  deserialize: (params) ->
    model = @model(params)
    console.log(@get('routeName'), "'s deserialize fired with ", params, model)
    #this forceably calls renderTemplate on every route change
    #Ember.run.next(@, @renderTemplate, @controllerFor(@get('routeName')), model)
    return @currentModel = model


App.ApplicationRoute = Ember.Route.extend
  events:
    updateActiveSlide: (newSlide) ->
      slidesCon = @controllerFor('slides')
      slidesCon.set('activeSlideIndex', newSlide.get('position'))
      @transitionTo('slide', slidesCon.get('activeSlide'))

    transitionAfterDeletion: () ->
      return

App.IndexRoute = Ember.Route.extend
  redirect: () ->
    @replaceWith "slideshows"


App.SlideshowsRoute = App.SmartRoute.extend
  model: (params) ->
    return App.Slideshow.find()

  renderTemplate: (controller, model) ->
    @render "slideshows",
                    outlet: 'main'

App.SlideshowRoute = App.SmartRoute.extend
  renderTemplate: (controller, model) ->
    @render "slideshow",
                    into: 'application'
                    outlet: 'main'

  serialize: (model, params) ->
    console.log(@get('routeName'), ' fired')
    object = {}
    object[params[0]] = model.get('id')
    return object

App.SlidesRoute = App.SmartRoute.extend
  model: (params) ->
    ssId = @modelFor('slideshow').get('id')
    return App.Slide.find({slideshow: ssId})

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
    console.log(model, @modelFor('slideshow'))
    object = {}
    object[params[0]] = model.get('id')
    return object

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
