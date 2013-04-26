App.SlidethumbnailsView = Em.View.extend({
  didInsertElement: function() {
    return $('.leftbar').jScrollPane({
      autoReinitialise: true
    });
  }
});
