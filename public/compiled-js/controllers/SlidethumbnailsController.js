App.SlidethumbnailsController = Em.ArrayController.extend({
  needs: ['slideshow', 'slide', 'user', 'slides'],
  contentBinding: "controllers.slides.content",
  activeSlideBinding: "controllers.slides.activeSlide",
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
    this.get('store').commit();
    return this.set('content', App.Slide.find({
      slideshow: this.get('controllers.slideshow.content.id')
    }));
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
