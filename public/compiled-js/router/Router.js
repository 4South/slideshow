require('models/User.js');

require('models/Slideshow.js');

require('models/Slide.js');

require('controllers/IndexController.js');

require('controllers/HeaderController.js');

require('controllers/ApplicationController.js');

require('controllers/SlideController.js');

require('controllers/SlidesController.js');

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
  return this.resource("slideshow", {
    path: 'slideshow/:slideshow_id'
  }, function() {
    return this.resource("slide", {
      path: 'slides/:slide_id'
    });
  });
});

App.ApplicationRoute = Ember.Route.extend({
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
  redirect: function() {
    return this.replaceWith('slideshows');
  }
});

App.SlideshowsRoute = Em.Route.extend({
  setupController: function(controller, model) {
    window.usercon = controller.get('userCon');
    window.cont = controller;
    return controller.set('content', App.Slideshow.find());
  },
  renderTemplate: function(controller, model) {
    this.render("slideshows", {
      into: 'application',
      outlet: 'slides'
    });
    return this.render("blank", {
      into: 'application',
      outlet: 'slidethumbnails'
    });
  }
});

App.SlideshowRoute = Em.Route.extend({
  events: {
    transitionAfterDeletion: function() {}
  },
  setupController: function(controller, model) {
    var slidesCon;

    controller.set('content', model);
    slidesCon = this.controllerFor('slides');
    window.slides = App.Slide.find({
      slideshow: model.get('id')
    });
    return slidesCon.set('content', slides);
  },
  renderTemplate: function(controller) {
    this.render("slides", {
      into: 'application',
      outlet: 'slides',
      controller: controller
    });
    this.render("slidethumbnails", {
      into: 'application',
      outlet: 'slidethumbnails',
      controller: 'slides'
    });
    return this.render("rightbar", {
      into: 'application',
      outlet: 'rightbar',
      controller: "slides"
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
