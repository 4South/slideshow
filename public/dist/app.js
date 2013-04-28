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
  clickThumbnail: function(targetSlide) {
    return this.transitionToRoute("slide", targetSlide);
  },
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
      return this.send("updateActiveSlide", this.findNewSlide(1));
    }
  },
  back: function() {
    if (!this.get('atStart')) {
      return this.send("updateActiveSlide", this.findNewSlide(-1));
    }
  },
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
  },
  deleteSlide: function(slide) {
    var arrCon, currentPos, eachslide, i, _i, _len, _ref;

    arrCon = this.get('filteredContent');
    currentPos = slide.get('position');
    slide.deleteRecord();
    console.log(this.get('atleastOneSlide'));
    if (this.get('atleastOneSlide')) {
      i = 0;
      _ref = arrCon.toArray();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        eachslide = _ref[_i];
        console.log(i, eachslide.get('name'));
        if (slide !== eachslide) {
          eachslide.set('position', i);
          i = i + 1;
        }
      }
    }
    return this.get('store').commit();
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
  description: DS.attr('string'),
  user: DS.belongsTo('App.User')
});
});

minispade.register('models/User.js', function() {
App.User = DS.Model.extend({
  username: DS.attr('string'),
  email: DS.attr('string')
});
});

minispade.register('router/Router.js', function() {
minispade.require('models/User.js');minispade.require('models/Slideshow.js');minispade.require('models/Slide.js');minispade.require('controllers/IndexController.js');minispade.require('controllers/HeaderController.js');minispade.require('controllers/ApplicationController.js');minispade.require('controllers/SlideController.js');minispade.require('controllers/SlidesController.js');minispade.require('controllers/SlideshowsController.js');minispade.require('controllers/SlideshowController.js');minispade.require('controllers/UserController.js');minispade.require('views/SlideTextField.js');minispade.require('views/ApplicationView.js');minispade.require('views/SlidesView.js');minispade.require('views/SlidedetailView.js');minispade.require('views/SlideThumbnailView.js');minispade.require('views/SlidesthumbnailsView.js');minispade.require('views/SlideshowsView.js');minispade.require('views/UserView.js');

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
    createEditUser: function() {
      return this.transitionTo('user');
    },
    updateActiveSlide: function(newSlide) {
      return this.transitionTo('slide', newSlide);
    },
    transitionAfterDeletion: function() {},
    transitionToSlideshows: function() {
      return this.transitionTo("slideshows.index");
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
    return App.Slide.find();
  }
});

App.SlideIndexRoute = App.SmartRoute.extend();

App.SlideRoute = App.SmartRoute.extend({
  events: {
    transitionAfterDeletion: function(pos) {
      var slideAtPos;

      slideAtPos = this.controllerFor('slides').get('filteredContent').objectAt(pos);
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

App.UserIndexRoute = App.SmartRoute.extend({
  events: {
    viewEditUser: function() {
      return this.transitionTo('user.edit');
    },
    createNewUser: function() {
      return this.transitionTo('user.create');
    }
  },
  renderTemplate: function(controller) {
    return this.render("usermanagement", {
      into: 'application',
      outlet: 'main',
      controller: 'user'
    });
  }
});

App.UserRoute = App.SmartRoute.extend();

App.UserCreateRoute = App.SmartRoute.extend({
  renderTemplate: function(controller) {
    return this.render("usercreate", {
      into: 'application',
      outlet: 'main',
      controller: 'user'
    });
  }
});

App.UserEditRoute = App.SmartRoute.extend({
  renderTemplate: function(controller) {
    return this.render("useredit", {
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
  attributeBindings: ['style'],
  classNameBindings: ['highlighted'],
  classNames: ['slides-thumbnail'],
  highlighted: (function() {
    if (this.get('content.id') === this.get('controller.activeSlide.id')) {
      return true;
    } else {
      return false;
    }
  }).property('controller.activeSlide.@each')
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
    return $('.slideslist').jScrollPane({
      autoReinitialise: true
    });
  }
});
});

minispade.register('views/SlideshowsView.js', function() {
App.SlideshowsView = Em.View.extend({
  didInsertElement: function() {
    return $('#slideshowlist').jScrollPane({
      autoReinitialise: true
    });
  }
});
});

minispade.register('views/SlidesthumbnailsView.js', function() {
App.SlidethumbnailsView = Em.View.extend({
  didInsertElement: function() {
    return $('.leftbar').jScrollPane({
      autoReinitialise: true
    });
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
