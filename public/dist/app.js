minispade.register('application/Application.js', function() {
var showdown;

window.App = Ember.Application.create();minispade.require('store/Store.js');minispade.require('router/Router.js');

showdown = new Showdown.converter();

Ember.Handlebars.registerBoundHelper('markdown', function(value) {
  if (value != null) {
    return new Ember.Handlebars.SafeString(showdown.makeHtml(value));
  }
});

Ember.Application.initializer({
  name: "load data",
  initialize: function(container, application) {
    App.Slideshow.find();
    return App.Slide.find();
  }
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
  needs: ['application', 'slide', 'slideshow', 'user', 'slidethumbnails'],
  newSlideName: "",
  sortProperties: ['position'],
  sortAscending: true,
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
  activeSlide: (function() {
    if (this.get('atleastOneSlide')) {
      return this.get('arrangedContent').objectAt(this.get('activeSlideIndex'));
    } else {
      return null;
    }
  }).property('activeSlideIndex', 'arrangedContent.@each').cacheable(),
  atleastOneSlide: (function() {
    if (this.get('content')) {
      if (this.get('content').toArray().length === 0) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }).property('content.@each').cacheable(),
  atStart: (function() {
    var index;

    index = this.get('activeSlideIndex');
    if (index === 0) {
      return true;
    } else {
      return false;
    }
  }).property('activeSlideIndex', 'arrangedContent.@each').cacheable(),
  atEnd: (function() {
    var contentLength, index;

    index = this.get('activeSlideIndex');
    contentLength = this.get('arrangedContent').toArray().length;
    if (index === contentLength - 1) {
      return true;
    } else {
      return false;
    }
  }).property('activeSlideIndex', 'arrangedContent.@each').cacheable(),
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
  forward: function() {
    var curIndex, newSlide;

    if (this.get('atEnd')) {

    } else {
      curIndex = this.get('activeSlide').get('position');
      newSlide = this.get('arrangedContent').objectAt(curIndex + 1);
      return this.send("updateActiveSlide", newSlide);
    }
  },
  back: function() {
    var curIndex, newSlide;

    if (this.get('atStart')) {

    } else {
      curIndex = this.get('activeSlide').get('position');
      newSlide = this.get('arrangedContent').objectAt(curIndex - 1);
      return this.send("updateActiveSlide", newSlide);
    }
  },
  clickThumbnail: function(targetSlide) {
    return this.send("updateActiveSlide", targetSlide);
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
  },
  goToSlideShows: function() {
    this.get('controllers.slideshow').exitEditing();
    return this.replaceRoute('slideshows');
  }
});
});

minispade.register('controllers/SlideshowController.js', function() {
App.SlideshowController = Em.ObjectController.extend({
  needs: ['slides', 'user'],
  editingMode: false,
  userIsAuthor: (function() {
    var author, user;

    author = this.get('content.author');
    user = this.get('controllers.user.content.username');
    if (author === user) {
      return true;
    } else {
      return false;
    }
  }).property('content.author', 'controllers.user.content.@each'),
  goToEditing: function() {
    var author;

    if (this.get('userIsAuthor')) {
      return this.set('editingMode', true);
    } else {
      author = this.get('content.author');
      return alert('This slideshow may only be edited by: ' + author);
    }
  },
  exitEditing: function() {
    return this.set('editingMode', false);
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
  contentBinding: "controllers.slides.content",
  activeSlideBinding: "controllers.slides.activeSlide",
  sortProperties: ['position'],
  sortAscending: true,
  resort: function(slide, index, enumerable) {
    return slide.set('position', index);
  },
  "delete": function(slide) {
    var pos;

    pos = slide.get('position') - 1;
    this.send('transitionAfterDeletion', pos);
    slide.deleteRecord();
    this.get('store').commit();
    return Ember.run.later(this, this.updatePos, 250);
  },
  updatePos: function() {
    this.get('arrangedContent').forEach(this.resort, this.get('arrangedContent'));
    return this.set('content', App.Slide.find({
      slideshow: this.get('controllers.slideshow.content.id')
    }));
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
  findTarget: function(slide, array, relativeSearch, property) {
    return array.objectAt(slide.get(property) + relativeSearch);
  },
  swap: function(decTarget, incTarget, property) {
    decTarget.decrementProperty(property);
    incTarget.incrementProperty(property);
    return this.get('store').commit();
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
  loggedInUser: (function() {
    return this.get('content.username');
  }).property('content.username').cacheable(),
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
          this.set('content', Ember.Object.create(data));
          return this.transitionToRoute('slideshows');
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
          this.set('content', Ember.Object.create(data));
          return this.transitionToRoute('slideshows');
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
          this.get('controllers.slideshow').exitEditing();
          return this.replaceRoute('index');
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

minispade.register('router/Router.js', function() {
minispade.require('models/User.js');minispade.require('models/Slideshow.js');minispade.require('models/Slide.js');minispade.require('controllers/IndexController.js');minispade.require('controllers/HeaderController.js');minispade.require('controllers/ApplicationController.js');minispade.require('controllers/SlideController.js');minispade.require('controllers/SlidesController.js');minispade.require('controllers/SlidethumbnailsController.js');minispade.require('controllers/SlideshowsController.js');minispade.require('controllers/SlideshowController.js');minispade.require('controllers/UserController.js');minispade.require('views/SlideTextField.js');minispade.require('views/ApplicationView.js');minispade.require('views/SlidesView.js');minispade.require('views/SlidedetailView.js');minispade.require('views/SlideThumbnailView.js');minispade.require('views/SlidesthumbnailsView.js');minispade.require('views/SlideshowsView.js');minispade.require('views/UserView.js');

App.Router.map(function() {
  this.resource("slideshows");
  return this.resource("slideshow", {
    path: 'slideshow/:slideshow_id'
  }, function() {
    this.resource("slides", {
      path: '/slides'
    });
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
  renderTemplate: function(controller, model) {
    this.render('index', {
      into: 'application',
      outlet: 'slides'
    });
    return this.render("blank", {
      into: 'application',
      outlet: 'slidethumbnails'
    });
  }
});

App.SlideshowsRoute = Em.Route.extend({
  setupController: function(controller, model) {
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
  renderTemplate: function(controller, model) {
    return this.render("slideshow", {
      into: 'application',
      outlet: 'slides'
    });
  }
});

App.SlidesRoute = Em.Route.extend({
  events: {
    transitionAfterDeletion: function() {}
  },
  setupController: function(controller, model) {
    var slides, slideshow;

    slideshow = this.controllerFor('slideshow').get('content');
    slides = App.Slide.find({
      slideshow: slideshow.get('id')
    });
    return controller.set('content', slides);
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
    this.render("maincontrols", {
      into: 'user',
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
      into: 'user',
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
  tagName: "div",
  classNames: ['navbar', 'navbar-inverse', 'navbar-fixed-top'],
  templateName: "user"
});
});
