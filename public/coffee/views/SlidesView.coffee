App.SlidesView = Em.CollectionView.extend

  tagName: 'ul'
  emptyView: Ember.View.extend
    template: Ember.Handlebars.compile('none active')
  itemViewClass: 'App.SlideView'
