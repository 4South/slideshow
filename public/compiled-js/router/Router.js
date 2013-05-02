require('models/User.js');

require('models/Slideshow.js');

require('models/Slide.js');

require('models/FontSetting.js');

require('models/Theme.js');

require('controllers/IndexController.js');

require('controllers/HeaderController.js');

require('controllers/ApplicationController.js');

require('controllers/SlideController.js');

require('controllers/SlidesController.js');

require('controllers/SlidethumbnailsController.js');

require('controllers/ThumbnaileditingController.js');

require('controllers/SlideshowsController.js');

require('controllers/SlideshowController.js');

require('controllers/UserController.js');

require('controllers/FontsettingController.js');

require('views/SlideTextField.js');

require('views/ApplicationView.js');

require('views/SlidesView.js');

require('views/SlidedetailView.js');

require('views/SlideThumbnailView.js');

require('views/SlidesthumbnailsView.js');

require('views/SlideshowsView.js');

require('views/SlideshowView.js');

require('views/SlideshowcreateView.js');

require('views/UserView.js');

require('views/UserCreateView.js');

require('views/UserEditView.js');

require('views/UserIndexView.js');

require('views/FontsettingView.js');

require('views/FontsettingContainerView.js');

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
    this.route("slideshowcreate", {
      path: '/create'
    });
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
    transitionToSlideshows: function() {
      return this.transitionToAnimated("slideshows.index", {
        main: 'flip'
      });
    },
    goToSlideshowCreation: function() {
      return this.transitionToAnimated("slideshows.slideshowcreate", {
        main: 'flip'
      });
    },
    createEditUser: function() {
      return this.transitionToAnimated("user", {
        main: 'flip'
      });
    },
    updateActiveSlide: function(slide) {
      return this.transitionToAnimated("slide", {
        main: 'fade'
      }, slide);
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

App.SlideshowsSlideshowcreateRoute = App.SmartRoute.extend({
  setupControllers: function(controller, model) {
    var ssCon;

    ssCon = this.controllerFor('slideshows');
    return ssCon.set("availableThemes", App.Theme.find());
  },
  renderTemplate: function(controller, model) {
    this._super();
    return this.render("slideshowcreate", {
      into: 'application',
      outlet: 'main',
      controller: 'slideshows'
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

App.SlidesRoute = App.SmartRoute.extend({
  model: function(params) {
    return App.Slide.find();
  }
});

App.SlideIndexRoute = App.SmartRoute.extend();

App.SlideRoute = App.SmartRoute.extend({
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
      controller: 'slidethumbnails'
    });
    return this.render("rightbar", {
      into: 'application',
      outlet: 'rightbar',
      controller: "slides"
    });
  }
});

App.UserIndexRoute = App.SmartRoute.extend({
  events: {
    viewEditUser: function() {
      return this.transitionToAnimated('user.edit', {
        main: 'flip'
      });
    },
    createNewUser: function() {
      return this.transitionToAnimated('user.create', {
        main: 'flip'
      });
    }
  },
  renderTemplate: function(controller) {
    return this.render("userIndex", {
      into: 'application',
      outlet: 'main',
      controller: 'user'
    });
  }
});

App.UserRoute = App.SmartRoute.extend();

App.UserCreateRoute = App.SmartRoute.extend({
  renderTemplate: function(controller) {
    return this.render("userCreate", {
      into: 'application',
      outlet: 'main',
      controller: 'user'
    });
  }
});

App.UserEditRoute = App.SmartRoute.extend({
  renderTemplate: function(controller) {
    return this.render("userEdit", {
      into: 'application',
      outlet: 'main',
      controller: 'user'
    });
  }
});
