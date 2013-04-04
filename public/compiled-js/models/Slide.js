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
