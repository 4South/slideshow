require('controllers/ApplicationController.js');

require('controllers/SlidesController.js');

require('controllers/SlideController.js');

require('models/Slide.js');

require('views/SlidesView.js');

require('views/SlideView.js');

require('views/SlidedetailView.js');

require('views/SlideThumbnailsView.js');

require('views/SlideThumbnailView.js');

App.Router.map(function() {
  this.resource("slides");
  return this.resource("slide", {
    path: 'slides/:slide_id'
  });
});

App.ApplicationRoute = Ember.Route.extend({
  setupController: function() {
    return this.controllerFor('slides').set('content', App.Slide.find());
  }
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    return this.replaceWith("slides");
  }
});

App.SlidesRoute = Ember.Route.extend({
  setupController: function(controller) {
    return controller.set('content', App.Slide.find());
  },
  renderTemplate: function(controller) {
    this.render("slides", {
      into: 'application',
      outlet: 'slides',
      controller: controller
    });
    this.render("maincontrols", {
      into: 'application',
      outlet: 'controls',
      controller: controller
    });
    return this.render("sidebar", {
      into: 'application',
      outlet: 'sidebar',
      controller: controller
    });
  }
});

App.SlideRoute = Ember.Route.extend({
  renderTemplate: function(controller) {
    this.render("showcontrols", {
      into: 'application',
      outlet: 'controls',
      controller: 'slides'
    });
    this.render("slidedetail", {
      into: 'application',
      outlet: 'slides',
      controller: controller
    });
    return this.render("thumbnailheader", {
      into: 'application',
      outlet: 'sidebar',
      controller: 'slides'
    });
  }
});
