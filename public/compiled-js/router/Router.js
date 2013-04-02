require('controllers/ApplicationController.js');

require('controllers/SlidesController.js');

require('controllers/SlideController.js');

require('models/Slide.js');

require('views/SlidesView.js');

require('views/SlideView.js');

require('views/SlideThumbnailView.js');

App.Router.map(function() {
  return this.resource("slides", function() {
    return this.resource("slide", {
      path: "slides/:slide_id"
    });
  });
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    return this.replaceWith("slides");
  }
});

App.SlidesRoute = Ember.Route.extend({
  setupController: function(controller) {
    return controller.set("content", App.Slide.find());
  },
  renderTemplate: function() {
    return this.render("slides", {
      into: 'application',
      outlet: 'slidelist'
    });
  }
});

App.SlideRoute = Ember.Route.extend({
  renderTemplate: function(model) {
    return this.render(model.get('templateName'), {
      into: 'application',
      outlet: 'slide'
    });
  }
});
