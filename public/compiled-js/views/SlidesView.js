App.SlidesView = Em.View.extend({
  classNames: ['slideslist'],
  tagName: 'section',
  didInsertElement: function() {
    return $('.slideslist').jScrollPane({
      autoReinitialise: true
    });
  }
});
