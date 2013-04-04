App.SlideThumbnailsView = Em.CollectionView.extend({
  tagName: 'ul',
  attributeBindings: ['style'],
  style: (function() {
    return "list-style-type: none;";
  }).property(),
  emptyView: Ember.View.extend({
    template: Ember.Handlebars.compile('objects loading')
  }),
  itemViewClass: 'App.SlideThumbnailView'
});