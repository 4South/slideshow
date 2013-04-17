require('models/User.js');

require('models/Slideshow.js');

require('models/Slide.js');

require('controllers/IndexController.js');

require('controllers/HeaderController.js');

require('controllers/ApplicationController.js');

require('controllers/SlidesController.js');

require('controllers/SlideController.js');

require('controllers/SlidethumbnailsController.js');

require('controllers/SlideshowsController.js');

require('controllers/SlideshowController.js');

require('controllers/UserController.js');

require('views/SlideTextField.js');

require('views/ApplicationView.js');

require('views/SlidesView.js');

require('views/SlidedetailView.js');

require('views/SlideThumbnailView.js');

require('views/SlidesthumbnailsView.js');

require('views/UserView.js');

App.Router.map(function() {
  this.resource("slideshows");
  this.resource("slideshow", {
    path: 'slideshow/:slideshow_id'
  });
  this.resource("slides");
  return this.resource("slide", {
    path: 'slides/:slide_id'
  });
});

App.ApplicationRoute = Ember.Route.extend({
  setupController: function() {
    return this.controllerFor('slides').set('content', App.Slide.find());
  },
  events: {
    updateActiveSlide: function(newSlide) {
      var slidesCon;

      slidesCon = this.controllerFor('slides');
      slidesCon.set('activeSlideIndex', newSlide.get('position'));
      return this.transitionTo('slide', slidesCon.get('activeSlide'));
    }
  }
});

App.IndexRoute = Ember.Route.extend({
  renderTemplate: function(controller, model) {
    return this.render('index', {
      into: 'application',
      outlet: 'slides'
    });
  }
});

App.SlideshowsRoute = Em.Route.extend({
  setupController: function(controller, model) {
    window.usercon = controller.get('userCon');
    return controller.set('content', App.Slideshow.find());
  },
  renderTemplate: function(controller, model) {
    return this.render("slideshows", {
      into: 'application',
      outlet: 'slides'
    });
  }
});

App.SlideshowRoute = Em.Route.extend({
  enter: function() {
    return console.log('showroute');
  },
  renderTemplate: function(controller, model) {
    return this.render('slideshow', {
      into: 'application',
      outlet: 'slides'
    });
  }
});

App.SlidesRoute = Ember.Route.extend({
  events: {
    transitionAfterDeletion: function() {}
  },
  setupController: function(controller) {
    return controller.set('content', App.Slide.find());
  },
  renderTemplate: function(controller) {
    this.render("slides", {
      into: 'application',
      outlet: 'slides',
      controller: controller
    });
    this.render("rightbar", {
      into: 'application',
      outlet: 'rightbar',
      controller: "slides"
    });
    return this.render("maincontrols", {
      into: 'application',
      outlet: 'controls',
      controller: controller
    });
  }
});

App.SlideRoute = Ember.Route.extend({
  events: {
    transitionAfterDeletion: function(pos) {
      var slideAtPos;

      slideAtPos = this.controllerFor('slides').get('arrangedContent').objectAt(pos);
      if (slideAtPos != null) {
        return this.replaceWith("slide", slideAtPos);
      } else {
        return this.replaceWith("slides");
      }
    }
  },
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
    return this.render("rightbar", {
      into: 'application',
      outlet: 'rightbar',
      controller: "slides"
    });
  }
});
