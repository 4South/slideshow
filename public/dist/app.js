minispade.register('application/Application.js', function() {
var showdown;

window.App = Ember.Application.create();minispade.require('store/Store.js');minispade.require('router/Router.js');

showdown = new Showdown.converter();

Ember.Handlebars.registerBoundHelper('markdown', function(value) {
  if (value != null) {
    return new Ember.Handlebars.SafeString(showdown.makeHtml(value));
  }
  return new Ember.Handlebars.SafeString(showdown.makeHtml(""));
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
App.SortedFilteredSet = Ember.ArrayProxy.extend(Ember.SortableMixin, {
  sortProperties: [],
  sortAscending: true
});

App.SlidesController = Em.ArrayController.extend({
  needs: ['slide', 'slideshow', 'user'],
  newSlideName: "",
  activeSlideBinding: 'controllers.slide.content',
  currentSlideshowBinding: 'controllers.slideshow.content',
  filteredContent: (function() {
    var curSlideShow, filteredArray;

    curSlideShow = this.get('currentSlideshow');
    filteredArray = this.get('content').filterProperty('slideshow', curSlideShow);
    return App.SortedFilteredSet.create({
      content: filteredArray,
      sortProperties: ['position'],
      sortAscending: true
    });
  }).property('content.@each', 'currentSlideshow'),
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
      if (this.get('filteredContent').toArray().length === 0) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }).property('content.@each.id').cacheable(),
  isPositionAnExtreme: function(activeSlide, extremeValue) {
    if (!activeSlide) {
      return false;
    }
    if (activeSlide.get('position') === extremeValue) {
      return true;
    } else {
      return false;
    }
  },
  atStart: (function() {
    var activeSlide;

    activeSlide = this.get('activeSlide');
    return this.isPositionAnExtreme(activeSlide, 0);
  }).property('activeSlide').cacheable(),
  atEnd: (function() {
    var activeSlide, endPosition;

    activeSlide = this.get('activeSlide');
    endPosition = this.get('filteredContent').toArray().length - 1;
    return this.isPositionAnExtreme(activeSlide, endPosition);
  }).property('activeSlide', 'filteredContent.@each').cacheable(),
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
    } else if (this.get('filteredContent').toArray().length !== 0) {
      return this.transitionToRoute('slide', this.get('filteredContent.firstObject'));
    }
  },
  pauseShow: function() {
    return this.transitionToRoute('slides');
  },
  findNewSlide: function(positionDelta) {
    var newPosition;

    newPosition = this.get('activeSlide').get('position') + positionDelta;
    return this.get('content').findProperty('position', newPosition);
  },
  forward: function() {
    if (!this.get('atEnd')) {
      return this.transitionToRoute("slide", this.findNewSlide(1));
    }
  },
  back: function() {
    if (!this.get('atStart')) {
      return this.transitionToRoute("slide", this.findNewSlide(-1));
    }
  },
  createSlide: function() {
    var activeShow;

    activeShow = this.get('currentSlideshow');
    if (!this.get('nameIsValid')) {
      return alert('name must contain at least one character and no spaces');
    } else {
      App.Slide.createRecord({
        name: this.get('newSlideName'),
        position: this.get('filteredContent').toArray().length,
        slideshow: activeShow,
        title: this.get('newSlideName')
      });
      this.get('store').commit();
      return this.set('newSlideName', '');
    }
  }
});
});

minispade.register('controllers/SlideshowController.js', function() {
App.SlideshowController = Em.ObjectController.extend({
  needs: ['slides', 'user'],
  showSlides: function() {
    return this.transitionToRoute("slides");
  },
  deleteSlideshow: function() {
    if (confirm("Really delete this slideshow?")) {
      this.get('model').deleteRecord();
      this.get('store').commit();
      return this.replaceRoute('slideshows');
    }
  },
  saveSlideshowTitle: function() {
    return this.get('store').commit();
  }
});
});

minispade.register('controllers/SlideshowsController.js', function() {
App.SlideshowsController = Em.ArrayController.extend({
  newName: '',
  needs: ['user', 'slideshow'],
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
minispade.require('controllers/SlidethumbnailsManager.js');

App.SlidethumbnailsController = Ember.ArrayController.extend({
  needs: ['slides'],
  contentBinding: 'controllers.slides.content',
  filteredContentBinding: 'controllers.slides.filteredContent',
  manager: App.SlidethumbnailsManager.create(),
  thumbnailWrapperWidth: 160,
  thumbnailWidth: (function() {
    return this.get('thumbnailWrapperWidth') * .9;
  }).property('thumbnailWrapperWidth'),
  targetPos: null,
  dragSlide: null,
  dragStartPos: null,
  startDrag: function(slide, xpos) {
    return this.setProperties({
      dragSlide: slide,
      dragStartPos: xpos
    });
  },
  endDrag: function() {
    this.setProperties({
      dragSlide: null,
      dragStartPos: null
    });
    return this.get('store').commit();
  },
  reorderThumbnails: function(newPos) {
    var dragSlide, filteredSlides, incrementPosition, isTrue, lastObjPos, origPos, range, slide, slides, _i, _j, _k, _len, _ref, _results, _results1;

    dragSlide = this.get('dragSlide');
    origPos = dragSlide.get('position');
    slides = this.get('filteredContent');
    filteredSlides = [];
    dragSlide.set("position", newPos);
    if (newPos < origPos) {
      range = (function() {
        _results = [];
        for (var _i = newPos; newPos <= origPos ? _i <= origPos : _i >= origPos; newPos <= origPos ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this);
    } else {
      lastObjPos = slides.get('lastObject.position');
      range = (function() {
        _results1 = [];
        for (var _j = newPos; newPos <= lastObjPos ? _j <= lastObjPos : _j >= lastObjPos; newPos <= lastObjPos ? _j++ : _j--){ _results1.push(_j); }
        return _results1;
      }).apply(this);
    }
    _ref = slides.without(dragSlide);
    for (_k = 0, _len = _ref.length; _k < _len; _k++) {
      slide = _ref[_k];
      isTrue = range.some(function(item) {
        return item === slide.get('position');
      });
      if (isTrue) {
        filteredSlides.pushObject(slide);
      }
    }
    incrementPosition = function(slide) {
      return slide.incrementProperty('position');
    };
    filteredSlides.forEach(incrementPosition);
    return slides.forEach(function(slide, index) {
      return slide.set('position', index);
    });
  },
  transitionToSlide: function(target) {
    return this.send("updateActiveSlide", target);
  }
});
});

minispade.register('controllers/SlidethumbnailsManager.js', function() {
App.TNTargetSelf = Ember.State.extend({
  hoverLeft: function(manager, controller) {},
  hoverRight: function(manager, controller) {}
});

App.TNTargetNeighborLeft = Ember.State.extend({
  hoverRight: function(manager, controller) {}
});

App.TNTargetNeighborRight = Ember.State.extend({
  hoverLeft: function(manager, controller) {}
});

App.TNTargetOther = Ember.State.extend();

App.TNDragging = Ember.State.extend({
  determineDragTransition: function(manager, controller, slide, offsetX) {
    var action, dragActions, dragSlidePos, slidePos, _i, _len;

    slidePos = slide.get('position');
    dragSlidePos = controller.get('dragSlide.position');
    dragActions = [
      {
        fun: (function(sPos, dsPos) {
          return sPos === dsPos;
        }),
        targ: 'targetSelf'
      }, {
        fun: (function(sPos, dsPos) {
          return sPos === dsPos - 1;
        }),
        targ: 'targetNeighborLeft'
      }, {
        fun: (function(sPos, dsPos) {
          return sPos === dsPos + 1;
        }),
        targ: 'targetNeighborRight'
      }, {
        fun: (function(sPos, dsPos) {
          return true;
        }),
        targ: 'targetOther'
      }
    ];
    for (_i = 0, _len = dragActions.length; _i < _len; _i++) {
      action = dragActions[_i];
      if (action.fun(slidePos, dragSlidePos)) {
        manager.transitionTo('dragging.' + action.targ);
        return;
      }
    }
  },
  determineHoverEvent: function(manager, controller, slide, offsetX) {
    var halfLine;

    halfLine = controller.get('thumbnailWidth') / 2;
    if (offsetX > halfLine) {
      return manager.send("hoverRight", controller, slide);
    } else {
      return manager.send("hoverLeft", controller, slide);
    }
  },
  mouseMove: function(manager, controller, slide, offsetX) {
    manager.send("determineDragTransition", controller, slide, offsetX);
    return manager.send("determineHoverEvent", controller, slide, offsetX);
  },
  mouseDown: function(manager) {
    return console.log("you should not be able to trigger MouseDown in Dragging Mode!");
  },
  hoverRight: function(manager, controller, target) {
    return controller.send("reorderThumbnails", target.get('position') + 1);
  },
  hoverLeft: function(manager, controller, target) {
    return controller.send("reorderThumbnails", target.get('position'));
  },
  targetSelf: App.TNTargetSelf,
  targetNeighborLeft: App.TNTargetNeighborLeft,
  targetNeighborRight: App.TNTargetNeighborRight,
  targetOther: App.TNTargetOther
});

App.TNInactive = Ember.State.extend({
  mouseDown: function(manager, controller, slide, xpos) {
    manager.transitionTo("dragging.targetSelf");
    return controller.send("startDrag", slide, xpos);
  }
});

App.SlidethumbnailsManager = Ember.StateManager.extend({
  initialState: 'inactive',
  inactive: App.TNInactive,
  dragging: App.TNDragging,
  stopDragging: function(manager, controller) {
    controller.send("endDrag");
    return manager.transitionTo("inactive");
  },
  shouldSelect: function(manager, controller, slide, xpos) {
    var dragStartPos;

    dragStartPos = controller.get('dragStartPos');
    if (Math.abs(dragStartPos - xpos) < 20) {
      return true;
    } else {
      return false;
    }
  },
  mouseUp: function(manager, controller, slide, xpos) {
    if (manager.send("shouldSelect", controller, slide, xpos)) {
      controller.transitionToSlide(slide);
    }
    return manager.send("stopDragging", controller);
  },
  mouseLeft: function(manager, controller) {
    return manager.send("stopDragging", controller);
  },
  mouseMove: function(manager, controller, slide, xpos) {},
  hoverRight: function(manager, controller) {
    return console.log("hoverRight not caught correctly!");
  },
  hoverLeft: function(manager, controller) {
    return console.log("hoverLeft not caught correctly!");
  }
});
});

minispade.register('controllers/ThumbnaileditingController.js', function() {
App.ThumbnaileditingController = Ember.ObjectController.extend({
  needs: ['slides', 'slide', 'slidethumbnails'],
  contentBinding: 'controllers.slide.content',
  findTarget: function(slide, array, deltaPos) {
    return array.findProperty('position', slide.get('position') + deltaPos);
  },
  swap: function(dectarget, inctarget, property) {
    dectarget.decrementProperty(property);
    inctarget.incrementProperty(property);
    return this.get('store').commit();
  },
  moveDown: function(slide) {
    var target;

    target = this.findTarget(slide, this.get('filteredContent'), 1, 'position');
    if (target != null) {
      return this.swap(target, slide, 'position');
    }
  },
  moveUp: function(slide) {
    var target;

    target = this.findTarget(slide, this.get('filteredContent'), -1, 'position');
    if (target != null) {
      return this.swap(slide, target, 'position');
    }
  },
  deleteSlide: function(slide) {
    var arrCon, currentPos, target, withoutDeleted;

    arrCon = this.get('filteredContent');
    withoutDeleted = arrCon.without(slide);
    currentPos = slide.get('position');
    slide.deleteRecord();
    withoutDeleted.forEach(function(eachslide, index) {
      return eachslide.set('position', index);
    });
    this.get('store').commit();
    if (this.get('atleastOneSlide')) {
      target = withoutDeleted.findProperty('position', currentPos);
      if (target) {
        return this.replaceRoute('slide', target);
      } else {
        return this.replaceRoute('slide', withoutDeleted.get('lastObject'));
      }
    } else {
      return this.replaceRoute('slides');
    }
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
      return "goto viewing mode";
    } else {
      return "goto editing mode";
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
  enterEditingMode: function() {
    return this.set('editingMode', true);
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
  validNewUser: function() {
    if (this.get('formUsername') !== '' && this.get('formPassword') !== '' && this.get('formPassword') !== '') {
      return true;
    } else {
      return false;
    }
  },
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
            this.get('store').load(App.User, data);
            this.set('content', App.User.find(data.id));
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
  sessionLogin: function() {
    return this.userAjax('/user/sessionlogin', 'GET', {
      success: function(data) {
        return Ember.run(this, function() {
          this.get('store').load(App.User, data);
          return this.set('content', App.User.find(data.id));
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
          this.get('store').load(App.User, data);
          return this.set('content', App.User.find(data.id));
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
          this.get('store').unloadRecord(this.get('content'));
          this.set('content', null);
          return this.exitEditing();
        });
      },
      error: function(xhr) {
        return Ember.run(this, function() {
          return this.set('errorMessage', 'logout failed');
        });
      }
    });
  }
});
});

minispade.register('models/Slide.js', function() {
App.Slide = DS.Model.extend({
  name: DS.attr('string'),
  position: DS.attr('number'),
  title: DS.attr('string'),
  content: DS.attr('string', {
    defaultValue: ""
  }),
  active: DS.attr('boolean', {
    defaultValue: false
  }),
  slideshow: DS.belongsTo('App.Slideshow')
});
});

minispade.register('models/Slideshow.js', function() {
App.Slideshow = DS.Model.extend({
  title: DS.attr('string'),
  author: DS.attr('string'),
  user: DS.belongsTo('App.User')
});
});

minispade.register('models/User.js', function() {
App.User = DS.Model.extend({
  username: DS.attr('string')
});
});

minispade.register('router/Router.js', function() {
minispade.require('models/User.js');minispade.require('models/Slideshow.js');minispade.require('models/Slide.js');minispade.require('controllers/IndexController.js');minispade.require('controllers/HeaderController.js');minispade.require('controllers/ApplicationController.js');minispade.require('controllers/SlideController.js');minispade.require('controllers/SlidesController.js');minispade.require('controllers/SlidethumbnailsController.js');minispade.require('controllers/ThumbnaileditingController.js');minispade.require('controllers/SlideshowsController.js');minispade.require('controllers/SlideshowController.js');minispade.require('controllers/UserController.js');minispade.require('views/SlideTextField.js');minispade.require('views/ApplicationView.js');minispade.require('views/SlidesView.js');minispade.require('views/SlidedetailView.js');minispade.require('views/SlideThumbnailView.js');minispade.require('views/SlidesthumbnailsView.js');minispade.require('views/SlideshowsView.js');minispade.require('views/UserView.js');

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
    transitionToSlideshows: function() {
      return this.transitionTo("slideshows");
    },
    updateActiveSlide: function(slide) {
      return this.transitionTo("slide", slide);
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
  classNames: ['slidethumbnailwrapper'],
  classNameBindings: ['dragging'],
  attributeBindings: ['style'],
  style: (function() {
    return "width: " + (this.get('controller.thumbnailWrapperWidth')) + "px;";
  }).property('controller.thumbnailWrapperWidth'),
  innerStyle: (function() {
    var marginLeft, tnWidth, wrapperWidth;

    tnWidth = this.get('controller.thumbnailWidth');
    wrapperWidth = this.get('controller.thumbnailWrapperWidth');
    marginLeft = (wrapperWidth - tnWidth) / 2;
    return "width: " + tnWidth + "px;\nmargin-left: " + marginLeft + "px;";
  }).property('controller.thumbnailWidth', 'controller.thumbnailWrapperWidth'),
  dragging: (function() {
    if (this.get('content') === this.get('controller.dragSlide')) {
      return true;
    }
    return false;
  }).property('controller.dragSlide', 'content'),
  mouseUp: function(event) {
    event.preventDefault();
    event.stopPropagation();
    return this.get('controller.manager').send("mouseUp", this.get('controller'), this.get('content'), event.offsetX);
  },
  mouseDown: function(event) {
    event.preventDefault();
    event.stopPropagation();
    return this.get('controller.manager').send("mouseDown", this.get('controller'), this.get('content'), event.offsetX);
  },
  mouseEnter: function(event) {},
  mouseMove: function(event) {
    return this.get('controller.manager').send("mouseMove", this.get('controller'), this.get('content'), event.offsetX);
  },
  drag: function(event) {
    event.preventDefault();
    return console.log('should not be seeing this dragevent!');
  }
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
  tagName: 'section'
});
});

minispade.register('views/SlideshowsView.js', function() {
App.SlideshowsView = Em.View.extend();
});

minispade.register('views/SlidesthumbnailsView.js', function() {
App.SlidethumbnailsView = Em.View.extend({
  tagName: 'div',
  classNames: ['slidethumbnailsviewport'],
  viewportWidth: (function() {
    var thumbnailCount;

    thumbnailCount = this.get('controller.filteredContent.length');
    return "width: " + (thumbnailCount * this.get('controller.thumbnailWrapperWidth')) + "px;";
  }).property('controller.filteredContent', 'controller.thumbnailWrapperWidth'),
  mouseLeave: function(event) {
    event.preventDefault();
    return this.get('controller.manager').send("mouseLeft", this.get('controller'));
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
