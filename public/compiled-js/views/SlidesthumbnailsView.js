App.SlidethumbnailsView = Em.View.extend({
  didInsertElement: function() {
    return Ember.run.later((function() {
      return $('.leftbar').jScrollPane({
        autoReinitialise: true
      });
    }), 200);
  }
});
