require('models/User.js');

require('models/Slideshow.js');

require('models/Slide.js');

require('controllers/IndexController.js');

require('controllers/HeaderController.js');

require('controllers/ApplicationController.js');

require('controllers/SlideController.js');

require('controllers/SlidesController.js');

require('controllers/SlideshowsController.js');

require('controllers/SlideshowController.js');

require('controllers/UserController.js');

require('views/SlideTextField.js');

require('views/ApplicationView.js');

require('views/SlidesView.js');

require('views/SlidedetailView.js');

require('views/SlideThumbnailView.js');

require('views/SlidesthumbnailsView.js');

require('views/SlideshowsView.js');

require('views/UserView.js');

App.Router.map(function() {
  this.resource("user", {
    path: '/user'
  }, function() {
    this.route("create", {
      path: '/create'
    });
    return this.route("edit", {
      path: '/edit'
    });
  });
  return this.resource("slideshows", {
    path: '/slideshows'
  }, function() {
    return this.resource("slideshow", {
      path: '/:slideshow_id'
    }, function() {
      return this.resource("slides", {
        path: '/slides'
      }, function() {
        return this.resource("slide", {
          path: '/:slide_id'
        });
      });
    });
  });
});

App.SmartRoute = Ember.Route.extend({
  renderTemplate: function(controller, model) {
    return this.resetOutlets();
  },
  resetOutlets: function() {
    this.render('blankthumbnails', {
      outlet: 'slidethumbnails',
      into: 'application'
    });
    this.render('blankcontrols', {
      outlet: 'controls',
      into: 'application'
    });
    return this.render('blankrightbar', {
      outlet: 'rightbar',
      into: 'application'
    });
  }
});

App.ApplicationRoute = Ember.Route.extend({
  events: {
    updateActiveSlide: function(newSlide) {
      return this.transitionTo('slide', newSlide);
    },
    transitionAfterDeletion: function() {},
    transitionToSlideshows: function() {
      return this.transitionTo("slideshows");
    },
    transitionWithRender: function(name, parameters) {
      var targetRoute;

      if (parameters) {
        this.transitionTo(name, parameters);
      } else {
        this.transitionTo(name);
      }
      targetRoute = this.container.lookup('route:' + name);
      return targetRoute.renderFloating.call(targetRoute);
    }
  }
});

App.IndexRoute = App.SmartRoute.extend({
  redirect: function() {
    return this.replaceWith("slideshows");
  }
});

App.SlideshowsIndexRoute = App.SmartRoute.extend({
  renderTemplate: function(controller, model) {
    this._super();
    return this.render("slideshows", {
      outlet: 'main',
      into: 'application',
      controller: 'slideshows'
    });
  }
});

App.SlideshowsRoute = App.SmartRoute.extend({
  model: function(params) {
    return App.Slideshow.find();
  }
});

App.SlideshowIndexRoute = App.SmartRoute.extend({
  renderTemplate: function(controller, model) {
    this._super();
    return this.render("slideshow", {
      into: 'application',
      outlet: 'main',
      controller: 'slideshow'
    });
  }
});

App.SlideshowRoute = App.SmartRoute.extend();

App.SlidesIndexRoute = App.SmartRoute.extend({
  renderTemplate: function(controller) {
    this._super();
    this.render("slides", {
      into: 'application',
      outlet: 'main',
      controller: 'slides'
    });
    this.render("slidethumbnails", {
      into: 'application',
      outlet: 'slidethumbnails',
      controller: 'slides'
    });
    this.render("maincontrols", {
      into: 'application',
      outlet: 'controls',
      controller: "slides"
    });
    return this.render("rightbar", {
      into: 'application',
      outlet: 'rightbar',
      controller: "slides"
    });
  }
});

App.SlidesRoute = App.SmartRoute.extend({
  model: function(params) {
    var ssId;

    ssId = this.modelFor('slideshow').get('id');
    return App.Slide.find({
      slideshow: ssId
    });
  }
});

App.SlideIndexRoute = App.SmartRoute.extend();

App.SlideRoute = App.SmartRoute.extend({
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
      outlet: 'main',
      controller: 'slide'
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
