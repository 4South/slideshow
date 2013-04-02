#explicitly require our needed modules
require('controllers/ApplicationController.js')
require('controllers/SlidesController.js')
require('controllers/SlideController.js')

require('models/Slide.js')

require('views/SlidesView.js')
require('views/SlideView.js')
require('views/SlideThumbnailView.js')

#main router definition
App.Router.map () ->
  @resource "slides", ->
    @resource "slide", {path: "slides/:slide_id"}

#default route when application loads. redirects to 'slides' route
App.IndexRoute = Ember.Route.extend
  redirect: () ->
    #same as "transitionTo" except does not log w/ history tracker
    @replaceWith "slides"

#route for this viewing slides as thumbnails
App.SlidesRoute = Ember.Route.extend
  #set the content using our model's custom find method (not ember-data)
  setupController: (controller) ->
    controller.set "content", App.Slide.find()
  
  #render slides template into appplication templates 'slidelist' outlet
  renderTemplate: () ->
    @render "slides", {into: 'application', outlet: 'slidelist'}

#route for detail views of each slide
App.SlideRoute = Ember.Route.extend
  #render slide template into application templates 'slide' outlet
  renderTemplate: (model) ->
    @render model.get('templateName'), {into: 'application', outlet: 'slide'}
