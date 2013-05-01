App.SlideshowsView = Em.View.extend({
  tagName: 'section',
  classNames: ['slideshowSplashpage'],
  didInsertElement: function() {
    return $('#slideshowlist').jScrollPane({
      autoReinitialise: true
    });
  }
});
