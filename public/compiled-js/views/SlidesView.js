App.SlidesView = Em.View.extend({
  classNames: ['slideslist'],
  tagName: 'section',
  didInsertElement: function() {
    return Ember.run.later((function() {
      return $('.slideslist').jScrollPane({
        autoReinitialise: true
      });
    }), 200);
  }
});
