#explicitly require our needed modules
require('controllers/HeaderController.js')
require('controllers/ApplicationController.js')
require('controllers/SlidesController.js')
require('controllers/SlideController.js')
require('controllers/SlidethumbnailsController.js')

require('models/Slide.js')

require('views/ApplicationView.js')
require('views/SlidesView.js')
require('views/SlidedetailView.js')
require('views/SlideThumbnailView.js')

#main router definition
App.Router.map () ->

  @resource "slides"
  @resource "slide", {path: 'slides/:slide_id'}

App.ApplicationRoute = Ember.Route.extend  
  setupController: () ->
    @controllerFor('slides').set('content', App.Slide.find())
    


App.IndexRoute = Ember.Route.extend
  redirect: ->
    @replaceWith('slides')



#route for this viewing slides as thumbnails
App.SlidesRoute = Ember.Route.extend

  events:
    transitionAfterDeletion: () ->
      return
  #set the content using our model's custom 
  #find method (not ember-data)
  setupController: (controller) ->
    controller.set 'content', App.Slide.find()

  renderTemplate: (controller) ->
    @render "slides",
                    into: 'application'
                    outlet: 'slides'
                    controller: controller

    @render "rightbar",
                    into: 'application'
                    outlet: 'rightbar'
                    controller: "slides"
                    
    @render "maincontrols",
                into: 'application'
                outlet: 'controls'
                controller: controller

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
