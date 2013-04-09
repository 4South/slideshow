minispade.register('application/Application.js', function() {
var showdown;

window.App = Ember.Application.create({
  godMode: false,
  LOG_TRANSITIONS: true
});minispade.require('store/Store.js');minispade.require('router/Router.js');

showdown = new Showdown.converter();

Ember.Handlebars.registerBoundHelper('markdown', function(value) {
  if (value != null) {
    return new Ember.Handlebars.SafeString(showdown.makeHtml(value));
  }
});

Em.TextField.reopen({
  keyUp: function(event) {
    if (event.keyCode === 13) {
      return this.get('controller').enterCheat();
    }
  }
});
});

minispade.register('controllers/ApplicationController.js', function() {
App.ApplicationController = Ember.Controller.extend({
  needs: ['slides', 'slide'],
  cheatcode: '',
  enterCheat: function() {
    if (this.get('cheatcode') === 'iddqd') {
      Ember.set('App.godMode', true);
    }
    return this.set('cheatcode', '');
  },
  abdicate: function() {
    return Ember.set('App.godMode', false);
  }
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
  needs: ['application', 'slide'],
  newSlideName: "",
  sortProperties: ['position'],
  sortAscending: true,
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
      return this.get('arrangedContent').objectAt(this.get('activeSlideIndex'));
    } else {
      return null;
    }
  }).property('activeSlideIndex', 'arrangedContent.@each').cacheable(),
  atleastOneSlide: (function() {
    if (this.get('content').toArray().length === 0) {
      return false;
    }
    return true;
  }).property('content.@each').cacheable(),
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
  atStart: (function() {
    var index;

    index = this.get('activeSlideIndex');
    if (index === 0) {
      return true;
    } else {
      return false;
    }
  }).property('activeSlideIndex', 'arrangedContent.@each').cacheable(),
  startShow: function() {
    if (this.get('activeSlide') != null) {
      return this.transitionToRoute('slide', this.get('activeSlide'));
    }
  },
  pauseShow: function() {
    return this.transitionToRoute('slides');
  },
  forward: function() {
    if (this.get('atEnd')) {

    } else {
      this.incrementProperty('activeSlideIndex');
      return this.transitionToRoute('slide', this.get('activeSlide'));
    }
  },
  back: function() {
    if (this.get('atStart')) {

    } else {
      this.decrementProperty('activeSlideIndex');
      return this.transitionToRoute('slide', this.get('activeSlide'));
    }
  },
  create: function() {
    if (this.get('nameIsValid')) {
      App.Slide.createRecord({
        name: this.get('newSlideName'),
        position: this.get('content').toArray().length
      });
      this.get('store').commit();
      return this.set('newSlideName', '');
    } else {
      return alert('name must contain at least one character and no spaces');
    }
  }
});
});

minispade.register('controllers/SlidethumbnailsController.js', function() {
App.SlidethumbnailsController = Em.ArrayController.extend({
  needs: ['slides', 'slide'],
  contentBinding: "controllers.slides.content",
  activeSlideBinding: "controllers.slide.content",
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
    this.get('arrangedContent').forEach(this.resort, this.get('arrangedContent'));
    return this.get('store').commit();
  },
  moveDown: function(slide) {
    var target;

    target = this.findTarget(slide, this.get('arrangedContent'), +1, 'position');
    if (target != null) {
      return this.swap(target, slide, 'position');
    }
  },
  moveUp: function(slide) {
    var target;

    target = this.findTarget(slide, this.get('arrangedContent'), -1, 'position');
    if (target != null) {
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
  })
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
minispade.require('controllers/ApplicationController.js');minispade.require('controllers/SlidesController.js');minispade.require('controllers/SlideController.js');minispade.require('controllers/SlidethumbnailsController.js');minispade.require('models/Slide.js');minispade.require('views/ApplicationView.js');minispade.require('views/SlidesView.js');minispade.require('views/SlidedetailView.js');minispade.require('views/SlideThumbnailView.js');

App.Router.map(function() {
  this.resource("slides");
  return this.resource("slide", {
    path: 'slides/:slide_id'
  });
});

App.ApplicationRoute = Ember.Route.extend({
  setupController: function() {
    return this.controllerFor('slides').set('content', App.Slide.find());
  }
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    return this.replaceWith("slides");
  }
});

App.SlidesRoute = Ember.Route.extend({
  events: {
    transitionAfterDeletion: function() {}
  },
  setupController: function(controller) {
    return controller.set('content', App.Slide.find());
  },
  renderTemplate: function(controller) {
    this.render("slides", {
      into: 'application',
      outlet: 'slides',
      controller: controller
    });
    this.render("maincontrols", {
      into: 'application',
      outlet: 'controls',
      controller: controller
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
    this.render("thumbnailheader", {
      into: 'application',
      outlet: 'sidebar',
      controller: 'slides'
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
App.Store = DS.Store.extend({
  revision: 11,
  adapter: DS.RESTAdapter
});
});

minispade.register('views/ApplicationView.js', function() {
App.ApplicationView = Em.View.extend({
  classNames: ['appview']
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
App.SlidesView = Em.View.extend();
});
