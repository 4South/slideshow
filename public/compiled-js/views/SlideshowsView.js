App.SlideshowsView = Em.View.extend({
  didInsertElement: function() {
    return $('#slideshowlist').jScrollPane({
      autoReinitialise: true
    });
  }
});
