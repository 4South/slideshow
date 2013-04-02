Ember.RecordArray = Ember.ArrayProxy.extend(Ember.Evented, Ember.DeferredMixin, {
  content: Em.A()
});

App.Slide = Em.Object.extend(Ember.DeferredMixin, {
  templateName: "baseslide",
  name: "default slide",
  slideNumber: null
});

App.Slide.reopenClass({
  find: function() {
    return this.findAll();
  },
  findAll: function() {
    var slides;

    slides = Ember.RecordArray.create();
    Ember.$.getJSON('slides.json', (function(results) {
      var _ref;

      console.log("json response was " + (JSON.stringify(results)));
      slides.pushObjects(Em.A((_ref = results.slides) != null ? _ref.map(function(item) {
        return App.Slide.create(item);
      }) : void 0));
      return slides;
    }));
    return slides;
  }
});
