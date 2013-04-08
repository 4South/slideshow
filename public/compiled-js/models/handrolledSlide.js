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
