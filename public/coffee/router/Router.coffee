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
  renderTemplate: (controller, model) ->
    @resetOutlets()

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
    #MAY WANT TO ALSO WIPE THE CENTER 

App.ApplicationRoute = Ember.Route.extend
  events:
    transitionToSlideshows: () ->
      @transitionTo("slideshows.index")

    updateActiveSlide: (slide) ->
      @transitionTo("slide", slide)

    #currently not using, may delete
    transitionWithRender: (name, parameters) ->
      if (parameters) then @transitionTo(name, parameters)
      else @transitionTo(name)
      targetRoute = @container.lookup('route:'+name)
      targetRoute.renderFloating.call(targetRoute)

App.IndexRoute = App.SmartRoute.extend
  redirect: () ->
    @replaceWith "slideshows"

App.SlideshowsIndexRoute = App.SmartRoute.extend
  renderTemplate: (controller, model) ->
    @_super()
    @render "slideshows",
                        outlet: 'main'
                        into: 'application'
                        controller: 'slideshows'

App.SlideshowsRoute = App.SmartRoute.extend
  model: (params) ->
    return App.Slideshow.find()

App.SlideshowIndexRoute = App.SmartRoute.extend
  renderTemplate: (controller, model) ->
    @_super()
    @render "slideshow",
                    into: 'application'
                    outlet: 'main'
                    controller: 'slideshow'

App.SlideshowRoute = App.SmartRoute.extend()

App.SlidesIndexRoute = App.SmartRoute.extend

  renderTemplate: (controller) ->
    @_super()
    @render "slides",
                    into: 'application'
                    outlet: 'main'
                    controller: 'slides'

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

App.SlidesRoute = App.SmartRoute.extend
  model: (params) ->
    return App.Slide.find()

App.SlideIndexRoute = App.SmartRoute.extend()

App.SlideRoute = App.SmartRoute.extend
  renderTemplate: (controller) ->
    @render "showcontrols",
                    into: 'application'
                    outlet: 'controls'
                    controller: 'slides'

    @render "slidedetail",
                    into: 'application'
                    outlet: 'main'
                    controller: 'slide'
    
    @render "slidethumbnails",
              into: 'application'
              outlet: 'slidethumbnails'
              controller: 'slidethumbnails'

    @render "rightbar",
                    into: 'application'
                    outlet: 'rightbar'
                    controller: "slides"

App.UserIndexRoute = App.SmartRoute.extend
  events:
    viewEditUser: ->
      @transitionTo 'user.edit'
    createNewUser: ->
      @transitionTo 'user.create'
  renderTemplate: (controller)->
    @render "usermanagement",
                    into: 'application'
                    outlet: 'main'
                    controller: 'user'

App.UserRoute = App.SmartRoute.extend()                    
                    
App.UserCreateRoute = App.SmartRoute.extend
  renderTemplate: (controller)->
    @render "usercreate",
      into: 'application'
      outlet: 'main'
      controller: 'user'
      
App.UserEditRoute = App.SmartRoute.extend
  renderTemplate: (controller)->
    @render "useredit",
      into: 'application'
      outlet: 'main'
      controller: 'user'
