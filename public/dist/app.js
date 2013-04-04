minispade.register('application/Application.js', function() {
window.App = Ember.Application.create({
  godMode: false
});minispade.require('router/Router.js');
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
App.SlideController = Em.ObjectController.extend();
});

minispade.register('controllers/SlidesController.js', function() {
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
  }).property('newSlideName'),
  activeSlides: (function() {
    return this.get('content').filterProperty('active');
  }).property('content.@each.active'),
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
Ember.RecordArray = Ember.ArrayProxy.extend(Ember.Evented, Ember.DeferredMixin, {
  content: Em.A()
});

App.Slide = Em.Object.extend(Ember.DeferredMixin, {
  templateName: "baseslide",
  name: "default slide",
  slideNumber: null,
  active: true
});

App.Slide.reopenClass({
  find: function() {
    return this.findAll();
  },
  findAll: function() {
    var slides;

    slides = Ember.RecordArray.create();
    Ember.$.ajax({
      contentType: "application/json",
      url: "slides",
      method: 'GET',
      context: slides,
      success: function(results) {
        return Ember.run(this, function() {
          var result, _i, _len, _results;

          _results = [];
          for (_i = 0, _len = results.length; _i < _len; _i++) {
            result = results[_i];
            _results.push(this.pushObject(App.Slide.create(result)));
          }
          return _results;
        });
      }
    });
    return slides;
  }
});
});

minispade.register('router/Router.js', function() {
minispade.require('controllers/ApplicationController.js');minispade.require('controllers/SlidesController.js');minispade.require('controllers/SlideController.js');minispade.require('models/Slide.js');minispade.require('views/SlidesView.js');minispade.require('views/SlideView.js');minispade.require('views/SlideThumbnailsView.js');minispade.require('views/SlideThumbnailView.js');

App.Router.map(function() {
  return this.resource("slides");
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    return this.replaceWith("slides");
  }
});

App.SlidesRoute = Ember.Route.extend({
  setupController: function(controller) {
    return controller.set("content", App.Slide.find());
  }
});
});

minispade.register('views/SlideThumbnailView.js', function() {
App.SlideThumbnailView = Em.View.extend({
  templateName: 'slidethumbnail',
  attributeBindings: ['style'],
  classNameBindings: ['highlighted'],
  classNames: ['slides-thumbnail'],
  highlighted: false,
  height: 40,
  style: (function() {
    return "height:" + (this.get('height')) + "px; width: 100%;";
  }).property('height', 'width')
});
});

minispade.register('views/SlideThumbnailsView.js', function() {
App.SlideThumbnailsView = Em.CollectionView.extend({
  tagName: 'ul',
  attributeBindings: ['style'],
  style: (function() {
    return "list-style-type: none;";
  }).property(),
  emptyView: Ember.View.extend({
    template: Ember.Handlebars.compile('objects loading')
  }),
  itemViewClass: 'App.SlideThumbnailView'
});
});

minispade.register('views/SlideView.js', function() {
App.SlideView = Em.View.extend({
  layoutName: 'slideframe',
  templateName: (function() {
    return 'slides/' + this.get('content.templateName');
  }).property()
});
});

minispade.register('views/SlidesView.js', function() {
App.SlidesView = Em.CollectionView.extend({
  tagName: 'ul',
  emptyView: Ember.View.extend({
    template: Ember.Handlebars.compile('none active')
  }),
  itemViewClass: 'App.SlideView'
});
});
