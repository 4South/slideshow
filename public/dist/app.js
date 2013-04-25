minispade.register('application/Application.js', function() {
var showdown;

window.App = Ember.Application.create();minispade.require('store/Store.js');minispade.require('router/Router.js');

showdown = new Showdown.converter();

Ember.Handlebars.registerBoundHelper('markdown', function(value) {
  if (value != null) {
    return new Ember.Handlebars.SafeString(showdown.makeHtml(value));
  }
  return "";
});

Ember.Application.initializer({
  name: "session login",
  initialize: function(container, application) {
    var userCon;

    userCon = container.lookup('controller:user');
    return userCon.sessionLogin();
  }
});
});

minispade.register('controllers/ApplicationController.js', function() {
App.ApplicationController = Ember.Controller.extend({
  needs: ['slide', 'user', 'slides', 'slideshow']
});
});

minispade.register('controllers/HeaderController.js', function() {
App.HeaderController = Em.ObjectController.extend({
  needs: ['application']
});
});

minispade.register('controllers/IndexController.js', function() {
App.IndexController = Em.Controller.extend({
  needs: ['user']
});
});

minispade.register('controllers/SlideController.js', function() {
App.SlideController = Em.ObjectController.extend({
  save: function() {
    return this.get('store').commit();
  }
});
});

minispade.register('controllers/SlidesController.js', function() {
App.SlidesController = Em.ArrayController.extend({
  needs: ['slide', 'slideshow', 'user', 'slidethumbnails'],
  newSlideName: "",
  sortProperties: ['position'],
  sortAscending: true,
  activeSlideBinding: 'controllers.slide.content',
  activeSlideIndex: 0,
  nameIsValid: (function() {
    var name;

    name = this.get('newSlideName');
    if ((name.indexOf(" ") === -1) && name !== "") {
      return true;
    } else {
      return false;
    }
  }).property('newSlideName').cacheable(),
  atleastOneSlide: (function() {
    if (this.get('content')) {
      if (this.get('content').toArray().length === 0) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }).property('content.@each.id').cacheable(),
  atStart: (function() {
    var activeSlide;

    activeSlide = this.get('activeSlide');
    if (!activeSlide) {
      return false;
    }
    if (activeSlide.get('position') === 0) {
      return true;
    } else {
      return false;
    }
  }).property('activeSlide').cacheable(),
  atEnd: (function() {
    var activeSlide, endPosition;

    activeSlide = this.get('activeSlide');
    endPosition = this.get('arrangedContent').toArray().length - 1;
    if (!activeSlide) {
      return false;
    }
    if (activeSlide.get('position') === endPosition) {
      return true;
    } else {
      return false;
    }
  }).property('activeSlide', 'arrangedContent.@each').cacheable(),
  savedStatus: (function() {
    if (this.get('content').someProperty('isDirty')) {
      return "Unsaved Changes";
    } else {
      return "All Changes Saved";
    }
  }).property('content.@each.isDirty').cacheable(),
  startShow: function() {
    if (this.get('activeSlide') != null) {
      return this.transitionToRoute('slide', this.get('activeSlide'));
    }
  },
  pauseShow: function() {
    return this.transitionToRoute('slides');
  },
  findNewSlide: function(shouldExit, positionDelta) {
    var newPosition, newSlide;

    if (shouldExit) {

    } else {
      newPosition = this.get('activeSlide').get('position') + positionDelta;
      newSlide = this.get('content').findProperty('position', newPosition);
      return this.send("updateActiveSlide", newSlide);
    }
  },
  forward: function() {
    return this.findNewSlide(this.get('atEnd'), 1);
  },
  back: function() {
    return this.findNewSlide(this.get('atStart'), -1);
  },
  create: function() {
    var activeShow, slides;

    activeShow = this.get('controllers.slideshow.content');
    if (this.get('nameIsValid')) {
      App.Slide.createRecord({
        name: this.get('newSlideName'),
        position: this.get('content').toArray().length,
        slideshow: activeShow,
        title: this.get('newSlideName')
      });
      this.get('store').commit();
      this.set('newSlideName', '');
      slides = App.Slide.find({
        slideshow: activeShow.get('id')
      });
      return this.set('content', slides);
    } else {
      return alert('name must contain at least one character and no spaces');
    }
  }
});
});

minispade.register('controllers/SlideshowController.js', function() {
App.SlideshowController = Em.ObjectController.extend({
  needs: ['slides', 'user'],
  showSlides: function() {
    return this.transitionToRoute("slides");
  }
});
});

minispade.register('controllers/SlideshowsController.js', function() {
App.SlideshowsController = Em.ArrayController.extend({
  newName: '',
  needs: ['user', 'slideshow'],
  slideShows: (function() {
    return App.Slideshow.find();
  }).property('content.@each').cacheable(),
  createSlideshow: function() {
    var newshow, user;

    user = this.get('controllers.user.content');
    newshow = App.Slideshow.createRecord({
      title: this.get('newName'),
      user: user,
      author: user.get('username')
    });
    this.get('store').commit();
    return this.set('newName', '');
  }
});
});

minispade.register('controllers/SlidethumbnailsController.js', function() {
App.SlidethumbnailsController = Em.ArrayController.extend({
  needs: ['slideshow', 'slide', 'user', 'slides'],
  activeSlideBinding: "controllers.slides.activeSlide",
  contentBinding: 'controllers.slides.content',
  arrangedContentBinding: 'controllers.slides.arrangedContent',
  sortProperties: ['position'],
  sortAscending: true,
  atleastOneSlide: (function() {
    if (this.get('content')) {
      if (this.get('content').toArray().length === 0) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }).property('content.@each.id').cacheable(),
  "delete": function(slide) {
    var arrCon, currentPos;

    arrCon = this.get('arrangedContent');
    currentPos = slide.get('position');
    slide.deleteRecord();
    console.log(arrCon.toString());
    return this.get('store').commit();
  },
  moveDown: function(slide) {
    if (this.findTarget(slide, this.get('arrangedContent'), +1, 'position') != null) {
      return this.swap(target, slide, 'position');
    }
  },
  moveUp: function(slide) {
    if (this.findTarget(slide, this.get('arrangedContent'), -1, 'position') != null) {
      return this.swap(slide, target, 'position');
    }
  },
  findTarget: function(slide, array, relativesearch, property) {
    return array.objectAt(slide.get(property) + relativesearch);
  },
  swap: function(dectarget, inctarget, property) {
    dectarget.decrementProperty(property);
    inctarget.incrementProperty(property);
    return this.get('store').commit();
  },
  clickThumbnail: function(targetslide) {
    console.log('clickthumbnail fired');
    return this.send("updateActiveSlide", targetslide);
  }
});
});

minispade.register('controllers/UserController.js', function() {
App.UserController = Ember.ObjectController.extend({
  needs: ['slideshow'],
  content: '',
  formUsername: '',
  formPassword: '',
  formEmail: '',
  errorMessage: '',
  loginUser: '',
  loginPassword: '',
  editingMode: false,
  editingButtonText: (function() {
    if (this.get('editingMode')) {
      return "viewing mode";
    } else {
      return "editing mode";
    }
  }).property('editingMode'),
  loggedInUser: (function() {
    return this.get('content.username');
  }).property('content.username').cacheable(),
  permissionToEdit: (function() {
    var author, user;

    author = this.get('controllers.slideshow.content.author');
    user = this.get('username');
    if (author === user) {
      return true;
    } else {
      return false;
    }
  }).property('controllers.slideshow.content.author', 'username'),
  permittedAndEditing: (function() {
    if (this.get('permissionToEdit') && this.get('editingMode')) {
      return true;
    } else {
      return false;
    }
  }).property('permissionToEdit', 'editingMode'),
  toggleEditing: function() {
    return this.toggleProperty('editingMode');
  },
  exitEditing: function() {
    return this.set('editingMode', false);
  },
  createData: (function() {
    return {
      username: this.get('formUsername'),
      password: this.get('formPassword'),
      email: this.get('formEmail')
    };
  }).property('formUsername', 'formPassword', 'formEmail'),
  loginData: (function() {
    return {
      username: this.get('loginUser'),
      password: this.get('loginPassword')
    };
  }).property('loginUser', 'loginPassword'),
  loggedIn: (function() {
    if (this.get('content')) {
      return true;
    } else {
      return false;
    }
  }).property('content'),
  resetForm: function() {
    this.set('formUsername', '');
    this.set('formPassword', '');
    return this.set('formEmail', '');
  },
  userAjax: function(url, type, hash) {
    this.set('errorMessage', '');
    hash.url = url;
    hash.type = type;
    hash.dataType = 'json';
    hash.contentType = 'application/json; charset=utf-8';
    hash.context = this;
    if (hash.data && type !== "GET") {
      hash.data = JSON.stringify(hash.data);
    }
    return Ember.$.ajax(hash);
  },
  create: function() {
    if (this.validNewUser() === true) {
      return this.userAjax('/user/create', 'POST', {
        data: this.get('createData'),
        success: function(data) {
          return Ember.run(this, function() {
            this.set('content', Ember.Object.create(data));
            return this.transitionToRoute('slideshows');
          });
        },
        error: function(xhr) {
          return Ember.run(this, function() {
            return this.set('errorMessage', 'account creation failed, try again');
          });
        },
        complete: function() {
          return Ember.run(this, function() {
            return this.resetForm();
          });
        }
      });
    } else {
      alert('Please fill out each field for User Creation');
      return this.resetForm();
    }
  },
  validNewUser: function() {
    if (this.get('formUsername') !== '' && this.get('formPassword') !== '' && this.get('formPassword') !== '') {
      return true;
    } else {
      return false;
    }
  },
  sessionLogin: function() {
    return this.userAjax('/user/sessionlogin', 'GET', {
      success: function(data) {
        return Ember.run(this, function() {
          return this.set('content', Ember.Object.create(data));
        });
      },
      error: function(xhr) {},
      complete: function() {
        return Ember.run(this, function() {
          return this.resetForm();
        });
      }
    });
  },
  login: function() {
    return this.userAjax('/user/login', 'POST', {
      data: this.get('loginData'),
      success: function(data) {
        return Ember.run(this, function() {
          return this.set('content', Ember.Object.create(data));
        });
      },
      error: function(xhr) {
        return Ember.run(this, function() {
          return this.set('errorMessage', 'login failed please try again');
        });
      },
      complete: function() {
        return Ember.run(this, function() {
          return this.resetForm();
        });
      }
    });
  },
  logout: function() {
    return this.userAjax('/user/logout', 'GET', {
      success: function(data) {
        return Ember.run(this, function() {
          this.set('content', null);
          return this.get('controllers.slideshow').exitEditing();
        });
      },
      error: function(xhr) {
        return Ember.run(this, function() {
          return this.set('errorMessage', 'logout failed');
        });
      }
    });
  },
  home: function() {
    return this.replaceRoute('index');
  }
});
});

minispade.register('controllers/legacySlidesController.js', function() {
App.SlidesController = Em.ArrayController.extend({
  newSlideName: "",
  nameIsValid: (function() {
    var name;

    name = this.get('newSlideName');
    if ((name.indexOf(" ") === -1) && name !== "") {
      return true;
    } else {
      return false;
    }
  }).property('newSlideName').cacheable(),
  activeSlideIndex: 0,
  activeSlide: (function() {
    if (this.get('atleastOneSlide')) {
      return this.get('content').objectAt(this.get('activeSlideIndex'));
    } else {
      return null;
    }
  }).property('activeSlideIndex', 'content.@each').cacheable(),
  atleastOneSlide: (function() {
    if (this.get('content').toArray().length === 0) {
      return false;
    }
    return true;
  }).property('content.@each').cacheable(),
  startShow: function() {
    if (this.get('activeSlide') != null) {
      return this.transitionToRoute('slide', this.get('activeSlide'));
    }
  },
  pauseShow: function() {
    return this.transitionToRoute('slides');
  },
  createNewSlide: function(slide) {
    return Ember.run(this, function() {
      return this.pushObject(App.Slide.create({
        name: slide.name
      }, {
        templateName: slide.name,
        id: slide.id
      }));
    });
  },
  deleteSlide: function(deletedSlide) {
    return Ember.run(this, function() {
      var delSlide;

      delSlide = this.filterProperty('id', deletedSlide.id)[0];
      return this.removeObject(delSlide);
    });
  },
  create: function() {
    var data, name;

    name = this.get('newSlideName');
    if (!this.get('nameIsValid')) {
      return alert('name may not contain spaces and must be defined');
    } else {
      data = JSON.stringify({
        name: name,
        templateName: name
      });
      Ember.$.ajax({
        contentType: "application/json",
        url: "create",
        method: 'POST',
        data: data,
        context: this,
        success: this.createNewSlide
      });
      return this.set("newSlideName", "");
    }
  },
  "delete": function(slide) {
    if (!confirm('Delete this slide/handlebars template?')) {
      return;
    }
    return Ember.$.ajax({
      contentType: "application/json",
      url: "delete",
      method: 'DELETE',
      data: JSON.stringify(slide),
      context: this,
      success: this.deleteSlide
    });
  }
});
});

minispade.register('models/Slide.js', function() {
App.Slide = DS.Model.extend({
  name: DS.attr('string'),
  position: DS.attr('number'),
  title: DS.attr('string'),
  content: DS.attr('string'),
  active: DS.attr('boolean', {
    defaultValue: false
  }),
  slideshow: DS.belongsTo('App.Slideshow')
});
});

minispade.register('models/Slideshow.js', function() {
App.Slideshow = DS.Model.extend({
  title: DS.attr('string'),
  user: DS.belongsTo('App.User'),
  slides: DS.hasMany('App.Slide'),
  author: DS.attr('string')
});
});

minispade.register('models/User.js', function() {
App.User = DS.Model.extend({
  username: DS.attr('string'),
  email: DS.attr('string'),
  password: DS.attr('string'),
  slideshows: DS.hasMany('App.Slideshow')
});
});

minispade.register('models/handrolledSlide.js', function() {
App.Record = Ember.ObjectProxy.extend(Ember.Evented, Ember.DeferredMixin, {
  content: null,
  tester: ""
});

App.RecordArray = Ember.ArrayProxy.extend(Ember.Evented, Ember.DeferredMixin, {
  content: Em.A(),
  notAlreadyLoaded: function(record) {
    if (!this.mapProperty('id').contains(record.id)) {
      return true;
    } else {
      return false;
    }
  },
  load: function(hash) {
    var results, _this;

    _this = hash._this;
    return results = hash.results;
  },
  loadAll: function(hash) {
    var results, _this;

    _this = hash._this;
    results = hash.results;
    return Ember.run(_this, function() {
      var result, _i, _len, _results;

      _results = [];
      for (_i = 0, _len = results.length; _i < _len; _i++) {
        result = results[_i];
        if (this.notAlreadyLoaded(result)) {
          _results.push(_this.pushObject(App.Slide.create(result)));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    });
  }
});

App.Slide = Em.Object.extend(Ember.DeferredMixin, {
  templateName: "baseslide",
  name: "default slide",
  slideNumber: null,
  active: false
});

App.Slide.reopenClass({
  find: function(id) {
    var rec;

    if (id) {
      rec = App.Record.create();
      rec.then(rec.load);
      return rec;
    }
    return this.findAll();
  },
  findAll: function() {
    window.slides = App.RecordArray.create();
    slides.then(slides.loadAll);
    Ember.$.ajax({
      contentType: "application/json",
      url: "slides",
      method: 'GET',
      context: slides,
      success: function(results) {
        return this.loadAll({
          _this: this,
          results: results
        });
      }
    });
    return slides;
  }
});
});

minispade.register('router/DeserializeRouter.js', function() {
minispade.require('models/User.js');minispade.require('models/Slideshow.js');minispade.require('models/Slide.js');minispade.require('controllers/IndexController.js');minispade.require('controllers/HeaderController.js');minispade.require('controllers/ApplicationController.js');minispade.require('controllers/SlideController.js');minispade.require('controllers/SlidesController.js');minispade.require('controllers/SlidethumbnailsController.js');minispade.require('controllers/SlideshowsController.js');minispade.require('controllers/SlideshowController.js');minispade.require('controllers/UserController.js');minispade.require('views/SlideTextField.js');minispade.require('views/ApplicationView.js');minispade.require('views/SlidesView.js');minispade.require('views/SlidedetailView.js');minispade.require('views/SlideThumbnailView.js');minispade.require('views/SlidesthumbnailsView.js');minispade.require('views/SlideshowsView.js');minispade.require('views/UserView.js');

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
});

minispade.register('router/OldRouter.js', function() {
minispade.require('models/User.js');minispade.require('models/Slideshow.js');minispade.require('models/Slide.js');minispade.require('controllers/IndexController.js');minispade.require('controllers/HeaderController.js');minispade.require('controllers/ApplicationController.js');minispade.require('controllers/SlideController.js');minispade.require('controllers/SlidesController.js');minispade.require('controllers/SlidethumbnailsController.js');minispade.require('controllers/SlideshowsController.js');minispade.require('controllers/SlideshowController.js');minispade.require('controllers/UserController.js');minispade.require('views/SlideTextField.js');minispade.require('views/ApplicationView.js');minispade.require('views/SlidesView.js');minispade.require('views/SlidedetailView.js');minispade.require('views/SlideThumbnailView.js');minispade.require('views/SlidesthumbnailsView.js');minispade.require('views/SlideshowsView.js');minispade.require('views/UserView.js');

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
});

minispade.register('router/Router.js', function() {
minispade.require('models/User.js');minispade.require('models/Slideshow.js');minispade.require('models/Slide.js');minispade.require('controllers/IndexController.js');minispade.require('controllers/HeaderController.js');minispade.require('controllers/ApplicationController.js');minispade.require('controllers/SlideController.js');minispade.require('controllers/SlidesController.js');minispade.require('controllers/SlidethumbnailsController.js');minispade.require('controllers/SlideshowsController.js');minispade.require('controllers/SlideshowController.js');minispade.require('controllers/UserController.js');minispade.require('views/SlideTextField.js');minispade.require('views/ApplicationView.js');minispade.require('views/SlidesView.js');minispade.require('views/SlidedetailView.js');minispade.require('views/SlideThumbnailView.js');minispade.require('views/SlidesthumbnailsView.js');minispade.require('views/SlideshowsView.js');minispade.require('views/UserView.js');

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
      controller: 'slidethumbnails'
    });
    return this.render("rightbar", {
      into: 'application',
      outlet: 'rightbar',
      controller: "slides"
    });
  }
});
});

minispade.register('store/Store.js', function() {
App.Adapter = DS.RESTAdapter.extend({
  bulkCommit: false
});

App.Store = DS.Store.extend({
  revision: 12,
  adapter: App.Adapter
});
});

minispade.register('views/ApplicationView.js', function() {
App.ApplicationView = Em.View.extend({
  classNames: ['appview'],
  attributeBindings: ['tabindex'],
  tabindex: 1,
  keyUp: function(event) {
    switch (event.keyCode) {
      case 32:
      case 39:
      case 40:
        return this.get('controller.controllers.slides').forward();
      case 37:
      case 38:
        return this.get('controller.controllers.slides').back();
      case 13:
        return this.get('controller.controllers.user').login();
    }
  }
});
});

minispade.register('views/SlideTextField.js', function() {
App.SlideTextField = Em.TextField.extend({
  keyUp: function(e) {
    return e.stopPropagation();
  },
  keyDown: function(e) {
    return e.stopPropagation();
  },
  keyPress: function(e) {
    return e.stopPropagation();
  }
});

App.SlideTextArea = Em.TextArea.extend({
  keyUp: function(e) {
    return e.stopPropagation();
  },
  keyDown: function(e) {
    return e.stopPropagation();
  },
  keyPress: function(e) {
    return e.stopPropagation();
  }
});
});

minispade.register('views/SlideThumbnailView.js', function() {
App.SlideThumbnailView = Em.View.extend({
  templateName: 'slidethumbnail',
  tagName: 'li',
  attributeBindings: ['style'],
  classNameBindings: ['highlighted'],
  classNames: ['slides-thumbnail'],
  highlighted: (function() {
    if (this.get('content.id') === this.get('controller.activeSlide.id')) {
      return true;
    } else {
      return false;
    }
  }).property('controller.activeSlide').cacheable()
});
});

minispade.register('views/SlidedetailView.js', function() {
App.SlidedetailView = Em.View.extend({
  classNames: ['slide'],
  templateName: 'slidedetail'
});
});

minispade.register('views/SlidesView.js', function() {
App.SlidesView = Em.View.extend({
  classNames: ['slideslist'],
  tagName: 'section',
  didInsertElement: function() {
    return Ember.run.later((function() {
      return $('.slideslist').jScrollPane({
        autoReinitialise: true
      });
    }), 200);
  }
});
});

minispade.register('views/SlideshowsView.js', function() {
App.SlideshowsView = Em.View.extend({
  didInsertElement: function() {
    return Ember.run.later((function() {
      return $('#slideshowlist').jScrollPane({
        autoReinitialise: true
      });
    }), 200);
  }
});
});

minispade.register('views/SlidesthumbnailsView.js', function() {
App.SlidethumbnailsView = Em.View.extend({
  didInsertElement: function() {
    return Ember.run.later((function() {
      return $('.leftbar').jScrollPane({
        autoReinitialise: true
      });
    }), 200);
  }
});
});

minispade.register('views/UserView.js', function() {
App.UserView = Ember.View.extend({
  tagName: "ul",
  classNames: ['nav', 'pull-right'],
  templateName: "user"
});
});
