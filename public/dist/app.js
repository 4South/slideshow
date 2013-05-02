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
      return this.transitionToRouteAnimated("slide", {
        main: 'slideLeft'
      }, this.findNewSlide(1));
    }
  },
  back: function() {
    if (!this.get('atStart')) {
      return this.transitionToRouteAnimated("slide", {
        main: 'slideRight'
      }, this.findNewSlide(-1));
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
  savedStatus: (function() {
    if (this.get('content.isDirty')) {
      return "Unsaved Changes";
    } else {
      return "All Changes Saved";
    }
  }).property('content.isDirty').cacheable(),
  showSlides: function() {
    return this.transitionToRouteAnimated("slides", {
      main: "flip"
    });
  },
  deleteSlideshow: function() {
    if (confirm("Really delete this slideshow?")) {
      this.get('model').deleteRecord();
      this.get('store').commit();
      return this.replaceRouteAnimated('slideshows', {
        main: 'flip'
      });
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
var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

App.SlidethumbnailsController = Ember.ArrayController.extend({
  needs: ['slides'],
  contentBinding: 'controllers.slides.content',
  filteredContentBinding: 'controllers.slides.filteredContent',
  reorderThumbnails: function(newPos, targetSlide, dragSlide) {
    var inRange, incrementPos, origPos, range, setPosByIndex, slides, _i, _j, _ref, _results, _results1;

    slides = this.get('filteredContent');
    origPos = dragSlide.get('position');
    inRange = function(slide, index, slides) {
      var _ref;

      return _ref = slide.get('position'), __indexOf.call(this, _ref) >= 0;
    };
    incrementPos = function(slide, index, slides) {
      return slide.incrementProperty('position');
    };
    setPosByIndex = function(slide, index, slides) {
      return slide.set('position', index);
    };
    dragSlide.set('position', newPos);
    if (newPos < origPos) {
      range = (function() {
        _results = [];
        for (var _i = newPos; newPos <= origPos ? _i <= origPos : _i >= origPos; newPos <= origPos ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this);
    } else {
      range = (function() {
        _results1 = [];
        for (var _j = newPos, _ref = slides.get('lastObject.position'); newPos <= _ref ? _j <= _ref : _j >= _ref; newPos <= _ref ? _j++ : _j--){ _results1.push(_j); }
        return _results1;
      }).apply(this);
    }
    slides.without(dragSlide).filter(inRange, range).forEach(incrementPos);
    return slides.forEach(setPosByIndex);
  },
  transitionToSlide: function(target) {
    return this.send("updateActiveSlide", target);
  }
});
});

minispade.register('controllers/SlidethumbnailsManager.js', function() {
App.DnDTargetSelf = Ember.State.extend({
  hoverLeft: function(manager) {},
  hoverRight: function(manager) {}
});

App.DnDTargetNeighborLeft = Ember.State.extend({
  hoverRight: function(manager) {}
});

App.DnDTargetNeighborRight = Ember.State.extend({
  hoverLeft: function(manager) {}
});

App.DnDTargetOther = Ember.State.extend();

App.DnDDragging = Ember.State.extend({
  determineDragTransition: function(manager, slide, offsetX) {
    var action, dragActions, dragSlidePos, slidePos, _i, _len;

    slidePos = slide.get('position');
    dragSlidePos = manager.controller.get('dragSlide.position');
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
      if (action.fun(slidePos, dragSlidePos) === true) {
        manager.transitionTo('dragging.' + action.targ);
        return;
      }
    }
  },
  determineHoverEvent: function(manager, slide, offsetX) {
    var halfLine, message;

    halfLine = manager.view.get('thumbnailWidth') / 2;
    message = offsetX > halfLine ? 'hoverRight' : 'hoverLeft';
    return manager.send(message, slide);
  },
  mouseMove: function(manager, slide, event, view) {
    manager.view.updateDraggingThumbnail(event.pageX, event.pageY);
    if (slide) {
      manager.send("determineDragTransition", slide, event.offsetX);
      return manager.send("determineHoverEvent", slide, event.offsetX);
    }
  },
  mouseDown: function(manager) {
    return console.log("mousedown triggerd in dragging!");
  },
  mouseUp: function(manager, slide, offsetX) {
    return manager.send("stopDragging");
  },
  mouseLeft: function(manager) {
    return manager.send("stopDragging");
  },
  hoverRight: function(manager, target) {
    return manager.controller.send("reorderThumbnails", target.get('position') + 1, target, manager.view.get('dragSlide'));
  },
  hoverLeft: function(manager, target) {
    return manager.controller.send("reorderThumbnails", target.get('position'), target, manager.view.get('dragSlide'));
  },
  targetSelf: App.DnDTargetSelf,
  targetNeighborLeft: App.DnDTargetNeighborLeft,
  targetNeighborRight: App.DnDTargetNeighborRight,
  targetOther: App.DnDTargetOther
});

App.DnDSelecting = Ember.State.extend({
  mouseDown: function(manager) {
    return console.log("mouseDown fired in selecting");
  },
  mouseMove: function(manager, slide, event, view) {
    var dragStartOffset;

    dragStartOffset = manager.view.get('dragStartOffset');
    if (Math.abs(dragStartOffset - event.offsetX) > 20) {
      manager.view.startDrag(slide, view);
      return manager.transitionTo("dragging.targetSelf");
    }
  },
  mouseUp: function(manager, slide, xpos) {
    return manager.controller.transitionToSlide(slide);
  },
  mouseLeft: function(manager) {
    return manager.transitionTo("inactive");
  }
});

App.DnDInactive = Ember.State.extend({
  mouseDown: function(manager, slide, xpos) {
    manager.view.recordStartOffset(slide, xpos);
    return manager.transitionTo("selecting");
  }
});

App.DnDManager = Ember.StateManager.extend({
  initialState: 'inactive',
  inactive: App.DnDInactive,
  selecting: App.DnDSelecting,
  dragging: App.DnDDragging,
  stopDragging: function(manager) {
    manager.view.endDrag(manager.view.get('dragSlide'));
    return manager.transitionTo("inactive");
  },
  mouseDown: function(manager) {
    throw new Ember.Error("mouseDown not handled");
  },
  mouseUp: function(manager) {},
  mouseLeft: function(manager) {},
  mouseMove: function(manager) {},
  hoverRight: function(manager) {
    return console.log("hoverRight handled incorrectly");
  },
  hoverLeft: function(manager) {
    return console.log("hoverLeft handled incorrectly");
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
  needs: ['slideshow', 'slide'],
  content: '',
  formUsername: '',
  formPassword: '',
  formEmail: '',
  errorMessage: '',
  loginUser: '',
  loginPassword: '',
  userEditingMode: false,
  editingMode: false,
  editingButtonText: (function() {
    if (this.get('editingMode')) {
      return "goto viewing mode";
    } else {
      return "goto editing mode";
    }
  }).property('editingMode'),
  savedStatus: (function() {
    if (this.get('content.isDirty')) {
      return "Unsaved Changes";
    } else {
      return "All Changes Saved";
    }
  }).property('content.isDirty').cacheable(),
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
  editUserInfo: function() {
    return this.set('userEditingMode', true);
  },
  saveUserInfo: function() {
    this.get('store').commit();
    this.resetForm();
    return this.set('userEditingMode', false);
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
            return this.transitionToRoute('user');
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

minispade.register('models/FontSetting.js', function() {
App.FontSetting = DS.Model.extend({
  size: DS.attr('number'),
  font: DS.attr('string'),
  color: DS.attr('string'),
  alignment: DS.attr('string')
});
});

minispade.register('models/FontSettings.js', function() {
App.FontSettings = DS.Model.extend({
  alignment: DS.attr('string'),
  fontStyle: DS.attr('string'),
  size: DS.attr('number'),
  color: DS.attr('string')
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
  slideshow: DS.belongsTo('App.Slideshow'),
  theme: DS.belongsTo('App.Theme')
});
});

minispade.register('models/SlideSettings.js', function() {
App.SlideSettings = DS.Model.extend({
  header: DS.belongsTo('App.FontSettings'),
  content: DS.belongsTo('App.FontSettings'),
  background: DS.attr('string'),
  logoIsVisible: DS.attr('boolean')
});
});

minispade.register('models/Slideshow.js', function() {
App.Slideshow = DS.Model.extend({
  title: DS.attr('string'),
  author: DS.attr('string'),
  description: DS.attr('string'),
  user: DS.belongsTo('App.User')
});
});

minispade.register('models/Theme.js', function() {
App.Theme = DS.Model.extend({
  h1: DS.belongsTo('App.FontSetting'),
  h2: DS.belongsTo('App.FontSetting'),
  h3: DS.belongsTo('App.FontSetting'),
  h4: DS.belongsTo('App.FontSetting'),
  h5: DS.belongsTo('App.FontSetting'),
  h6: DS.belongsTo('App.FontSetting'),
  p: DS.belongsTo('App.FontSetting'),
  li: DS.belongsTo('App.FontSetting'),
  div: DS.belongsTo('App.FontSetting'),
  section: DS.belongsTo('App.FontSetting'),
  pre: DS.belongsTo('App.FontSetting'),
  span: DS.belongsTo('App.FontSetting')
});
});

minispade.register('models/User.js', function() {
App.User = DS.Model.extend({
  username: DS.attr('string'),
  email: DS.attr('string')
});
});

minispade.register('router/Router.js', function() {
minispade.require('models/User.js');minispade.require('models/Slideshow.js');minispade.require('models/Slide.js');minispade.require('models/FontSetting.js');minispade.require('models/Theme.js');minispade.require('controllers/IndexController.js');minispade.require('controllers/HeaderController.js');minispade.require('controllers/ApplicationController.js');minispade.require('controllers/SlideController.js');minispade.require('controllers/SlidesController.js');minispade.require('controllers/SlidethumbnailsController.js');minispade.require('controllers/ThumbnaileditingController.js');minispade.require('controllers/SlideshowsController.js');minispade.require('controllers/SlideshowController.js');minispade.require('controllers/UserController.js');minispade.require('views/SlideTextField.js');minispade.require('views/ApplicationView.js');minispade.require('views/SlidesView.js');minispade.require('views/SlidedetailView.js');minispade.require('views/SlideThumbnailView.js');minispade.require('views/SlidesthumbnailsView.js');minispade.require('views/SlideshowsView.js');minispade.require('views/SlideshowView.js');minispade.require('views/UserView.js');minispade.require('views/UserCreateView.js');minispade.require('views/UserEditView.js');minispade.require('views/UserIndexView.js');

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
      return this.transitionToAnimated("slideshows.index", {
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
    return "width: " + (this.get('parentView.thumbnailWrapperWidth')) + "px;";
  }).property('parentView.thumbnailWrapperWidth'),
  innerStyle: (function() {
    return "width: " + (this.get('parentView.thumbnailWidth')) + "px;";
  }).property('parentView.thumbnailWidth'),
  dragging: (function() {
    return this.get('content.isDragging');
  }).property('content.isDragging')
});
});

minispade.register('views/SlidedetailView.js', function() {
App.SlidedetailView = Em.View.extend({
  classNames: ['slide'],
  templateName: 'slidedetail',
  tagName: 'section',
  contentBinding: 'controller.content'
});
});

minispade.register('views/SlidesView.js', function() {
App.SlidesView = Em.View.extend({
  classNames: ['slideslist'],
  tagName: 'section',
  didInsertElement: function() {
    return $('.slideslist').jScrollPane({
      autoReinitialise: true
    });
  }
});
});

minispade.register('views/SlideshowView.js', function() {
App.SlideshowView = Em.View.extend({
  classNames: ['slideshowSplashpage'],
  tagName: 'section'
});
});

minispade.register('views/SlideshowsView.js', function() {
App.SlideshowsView = Em.View.extend({
  tagName: 'section',
  classNames: ['slideshowSplashpage'],
  didInsertElement: function() {
    return $('#slideshowlist').jScrollPane({
      autoReinitialise: true
    });
  }
});
});

minispade.register('views/SlidesthumbnailsView.js', function() {
minispade.require('controllers/SlidethumbnailsManager.js');

App.SlidethumbnailsView = Em.View.extend({
  tagName: 'div',
  templateName: 'slidethumbnails',
  classNames: ['slidethumbnailsviewport'],
  thumbnailWrapperWidth: 160,
  thumbnailWidth: (function() {
    return this.get('thumbnailWrapperWidth') * .9;
  }).property('thumbnailWrapperWidth'),
  portStyle: (function() {
    var thumbnailCount;

    thumbnailCount = this.get('controller.filteredContent.length');
    return "width: " + (thumbnailCount * this.get('thumbnailWrapperWidth')) + "px;";
  }).property('controller.filteredContent', 'thumbnailWrapperWidth'),
  dragSlide: null,
  dragStartOffset: null,
  draggingThumbnail: null,
  init: function() {
    var controller, view;

    this._super();
    controller = this.get('container').lookup('controller:slidethumbnails');
    view = this;
    this.set("dndManager", App.DnDManager.create({
      controller: controller,
      view: view
    }));
    return this.get('eventManager').reopen({
      parentView: this,
      dndManager: this.dndManager
    });
  },
  eventManager: Ember.Object.create({
    mouseMove: function(event, view) {
      var slide;

      if (view !== this) {
        slide = view.get('content');
        return this.get('dndManager').send("mouseMove", slide, event, view);
      }
    },
    mouseLeave: function(event, view) {
      event.preventDefault();
      event.stopPropagation();
      if (view === this.get('parentView')) {
        return this.get('dndManager').send("mouseLeft");
      }
    },
    mouseUp: function(event, view) {
      var slide;

      event.preventDefault();
      event.stopPropagation();
      slide = view.get('content');
      return this.get('dndManager').send("mouseUp", slide, event.offsetX);
    },
    mouseDown: function(event, view) {
      var slide;

      event.preventDefault();
      event.stopPropagation();
      if (view !== this.get('parentView')) {
        slide = view.get('content');
        return this.get('dndManager').send("mouseDown", slide, event.offsetX);
      }
    }
  }),
  recordStartOffset: function(slide, xpos) {
    return this.set("dragStartOffset", xpos);
  },
  configureCursorImage: function(viewEl) {
    var clone, image;

    clone = viewEl.clone();
    image = clone.find('.slidethumbnail');
    image.removeClass('btn-warning');
    image.addClass('btn-primary');
    return image;
  },
  startDrag: function(slide, view) {
    this.set("dragSlide", slide);
    slide.set("isDragging", true);
    this.draggingThumbnail = this.configureCursorImage(view.$());
    return this.draggingThumbnail.appendTo('body');
  },
  endDrag: function(dragSlide) {
    dragSlide.set("isDragging", false);
    this.setProperties({
      dragSlide: null,
      dragStartOffset: null
    });
    this.draggingThumbnail.remove();
    return this.get('controller.store').commit();
  },
  updateDraggingThumbnail: function(cursorX, cursorY) {
    return this.draggingThumbnail.css({
      position: 'absolute',
      left: cursorX,
      top: cursorY
    });
  }
});
});

minispade.register('views/UserCreateView.js', function() {
App.UserCreateView = Em.View.extend();
});

minispade.register('views/UserEditView.js', function() {
App.UserEditView = Em.View.extend({
  templateName: 'userEdit',
  tagName: 'section',
  classNames: 'userinfo'
});
});

minispade.register('views/UserIndexView.js', function() {
App.UserIndexView = Em.View.extend({
  templateName: "userIndex",
  classNames: 'usermanagement',
  tagName: 'section'
});
});

minispade.register('views/UserView.js', function() {
App.UserView = Ember.View.extend({
  tagName: "ul",
  classNames: ['nav', 'pull-right'],
  templateName: "user"
});
});
