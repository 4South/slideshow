App.SlidethumbnailsView = Em.View.extend({
  didInsertElement: function() {
    return Ember.run.later((function() {
      $('.leftbar').jScrollPane({
        autoReinitialise: true
      });
      return $('.slides').jScrollPane({
        autoReinitialise: true
      });
    }), 200);
  }
});
