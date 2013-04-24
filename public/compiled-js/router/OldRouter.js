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
    path: 'user/'
  }, function() {
    this.route("create", {
      path: 'create/'
    });
    return this.route("edit", {
      path: 'edit/'
    });
  });
  this.resource("slideshows", {
    path: 'slideshows/'
  });
  this.resource("slideshow", {
    path: 'slideshows/:slideshow_id/'
  });
  this.resource("slides", {
    path: 'slideshows/:slideshow_id/slides'
  });
  return this.resource("slide", {
    path: 'slideshows/:slideshow_id/slides/:slide_id'
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
  configureControllers: function() {
    var slides, thumbnailCon;

    this.controllerFor('slideshow').set('content', this.modelFor('slideshow'));
    slides = App.Slide.find();
    this.controllerFor('slides').set('content', slides);
    thumbnailCon = this.container.lookup('controller:slidethumbnails');
    return thumbnailCon.set('content', slides);
  },
  renderTemplate: function(controller, model) {
    this._super();
    return this.resetOutlets();
  },
  deactivate: function() {
    return this.resetOutlets();
  }
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

App.IndexRoute = App.SmartRoute.extend({
  redirect: function() {
    return this.replaceWith("slideshows");
  }
});

App.SlideshowsRoute = App.SmartRoute.extend({
  setupController: function(controller, model) {
    return controller.set('content', App.Slideshow.find());
  },
  renderTemplate: function(controller, model) {
    return this.render("slideshows", {
      outlet: 'main'
    });
  }
});

App.SlideshowRoute = App.SmartRoute.extend({
  renderTemplate: function(controller, model) {
    this._super();
    return this.render("slideshow", {
      into: 'application',
      outlet: 'main'
    });
  },
  setupController: function(controller, model) {
    return this.configureControllers();
  }
});

App.SlidesRoute = App.SmartRoute.extend({
  events: {
    transitionAfterDeletion: function() {}
  },
  serialize: function(model, params) {
    var object;

    object = {};
    object[params[0]] = this.modelFor('slideshow').get('id');
    return object;
  },
  deserialize: function(params) {
    var slideshowId;

    console.log('deserializing', params['slideshow_id']);
    slideshowId = params['slideshow_id'];
    return this.currentModel = App.Slide.find({
      slideshow: slideshowId
    });
  },
  setupController: function(controller, model) {
    return this.configureControllers();
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

    object = {};
    object[params[0]] = this.modelFor('slideshow').get('id');
    object[params[1]] = model.get('id');
    return object;
  },
  setupController: function(controller, model) {
    return this.configureControllers();
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
