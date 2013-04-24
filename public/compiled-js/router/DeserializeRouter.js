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
  },
  deserialize: function(params) {
    var model;

    model = this.model(params);
    console.log(this.get('routeName'), "'s deserialize fired with ", params, model);
    return this.currentModel = model;
  }
});

App.ApplicationRoute = Ember.Route.extend({
  events: {
    updateActiveSlide: function(newSlide) {
      var slidesCon;

      slidesCon = this.controllerFor('slides');
      slidesCon.set('activeSlideIndex', newSlide.get('position'));
      return this.transitionTo('slide', slidesCon.get('activeSlide'));
    },
    transitionAfterDeletion: function() {}
  }
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    return this.replaceWith("slideshows");
  }
});

App.SlideshowsRoute = App.SmartRoute.extend({
  model: function(params) {
    return App.Slideshow.find();
  },
  renderTemplate: function(controller, model) {
    return this.render("slideshows", {
      outlet: 'main'
    });
  }
});

App.SlideshowRoute = App.SmartRoute.extend({
  renderTemplate: function(controller, model) {
    return this.render("slideshow", {
      into: 'application',
      outlet: 'main'
    });
  },
  serialize: function(model, params) {
    var object;

    console.log(this.get('routeName'), ' fired');
    object = {};
    object[params[0]] = model.get('id');
    return object;
  }
});

App.SlidesRoute = App.SmartRoute.extend({
  model: function(params) {
    var ssId;

    ssId = this.modelFor('slideshow').get('id');
    return App.Slide.find({
      slideshow: ssId
    });
  },
  renderTemplate: function(controller) {
    this.render("slides", {
      into: 'application',
      outlet: 'main',
      controller: controller
    });
    this.render("slidethumbnails", {
      into: 'application',
      outlet: 'slidethumbnails',
      controller: 'slidethumbnails'
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
  serialize: function(model, params) {
    var object;

    console.log(model, this.modelFor('slideshow'));
    object = {};
    object[params[0]] = model.get('id');
    return object;
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
      controller: controller
    });
    this.render("slidethumbnails", {
      into: 'application',
      outlet: 'slidethumbnails',
      controller: 'slidethumbnails'
    });
    return this.render("rightbar", {
      into: 'application',
      outlet: 'rightbar',
      controller: "slides"
    });
  }
});
