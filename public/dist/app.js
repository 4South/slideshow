minispade.register('application/Application.js', function() {
window.App = Ember.Application.create();minispade.require('router/Router.js');
});

minispade.register('controllers/ApplicationController.js', function() {
App.ApplicationController = Ember.Controller.extend({
  sampleText: "hey this application controller is sure neat"
});
});

minispade.register('controllers/SlideController.js', function() {
App.SlideController = Em.ObjectController.extend();
});

minispade.register('controllers/SlidesController.js', function() {
App.SlidesController = Em.ArrayController.extend();
});

minispade.register('models/Slide.js', function() {
App.Slide = Em.Object.extend({
  templateName: "baseslide",
  name: "default slide",
  slideNumber: null
});

App.Slide.reopenClass({
  findAll: function() {
    return $.getJSON('slides.json');
  }
});
});

minispade.register('router/Router.js', function() {
minispade.require('controllers/ApplicationController.js');minispade.require('controllers/SlidesController.js');minispade.require('controllers/SlideController.js');minispade.require('models/Slide.js');minispade.require('views/SlidesView.js');minispade.require('views/SlideView.js');minispade.require('views/SlideThumbnailView.js');

App.Router.map(function() {
  this.resource("slides");
  return this.resource("slide");
});

App.IndexRoute = Ember.Route.extend();

App.SlidesRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    var promise;

    promise = App.Slide.findAll();
    controller.set("content", []);
    return promise.then(function(results) {
      var _ref;

      return (_ref = results.slides) != null ? _ref.map(function(item) {
        return controller.pushObject(App.Slide.create(item));
      }) : void 0;
    });
  },
  renderTemplate: function() {
    return this.render("slides", {
      into: 'application',
      outlet: 'slidelist'
    });
  }
});

App.SlideRoute = Ember.Route.extend({
  renderTemplate: function() {
    return this.render("slide", {
      into: 'application',
      outlet: 'slide'
    });
  }
});
});

minispade.register('views/SlideThumbnailView.js', function() {
App.SlideThumbnailView = Em.View.extend({
  attributeBindings: ['style'],
  classNameBindings: ['highlighted'],
  classNames: ['slides-thumbnail'],
  highlighted: false,
  height: 40,
  mouseEnter: function(event) {
    return this.set("highlighted", true);
  },
  mouseLeave: function(event) {
    return this.set("highlighted", false);
  },
  click: function(event) {
    return this.get('controller').transitionToRoute("slide");
  },
  style: (function() {
    return "height:" + (this.get('height')) + "px; width: inherit;";
  }).property('height', 'width')
});
});

minispade.register('views/SlideView.js', function() {
App.SlideView = Em.View.extend({
  templateName: "baseslide"
});
});

minispade.register('views/SlidesView.js', function() {
App.SlidesView = Em.View.extend({
  templateName: 'slides'
});
});
