App.SlidethumbnailsController = Em.ArrayController.extend({
  needs: ['slides', 'slide'],
  contentBinding: "controllers.slides.content",
  activeSlideBinding: "controllers.slide.content",
  sortProperties: ['position'],
  sortAscending: true,
  resort: function(slide, index, enumerable) {
    return slide.set('position', index);
  },
  "delete": function(slide) {
    var pos;

    pos = slide.get('position') - 1;
    this.send('transitionAfterDeletion', pos);
    slide.deleteRecord();
    this.get('arrangedContent').forEach(this.resort, this.get('arrangedContent'));
    return this.get('store').commit();
  },
  moveDown: function(slide) {
    var target;

    target = this.findTarget(slide, this.get('arrangedContent'), +1, 'position');
    if (target != null) {
      return this.swap(target, slide, 'position');
    }
  },
  moveUp: function(slide) {
    var target;

    target = this.findTarget(slide, this.get('arrangedContent'), -1, 'position');
    if (target != null) {
      return this.swap(slide, target, 'position');
    }
  },
  findTarget: function(slide, array, relativeSearch, property) {
    return array.objectAt(slide.get(property) + relativeSearch);
  },
  swap: function(decTarget, incTarget, property) {
    decTarget.decrementProperty(property);
    incTarget.incrementProperty(property);
    return this.get('store').commit();
  }
});
