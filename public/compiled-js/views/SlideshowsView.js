App.SlideshowsView = Em.View.extend({
  didInsertElement: function() {
    return Ember.run.later((function() {
      return $('#slideshowlist').jScrollPane({
        autoReinitialise: true
      });
    }), 200);
  }
});
