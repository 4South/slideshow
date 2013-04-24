App.SlidethumbnailsController = Em.ArrayController.extend({
  needs: ['slideshow', 'slide', 'user', 'slides'],
  activeSlideBinding: "controllers.slides.activeSlide",
  contentBinding: 'controllers.slides.content',
  sortProperties: ['position'],
  sortAscending: true,
  resort: function(slide, index, enumerable) {
    return slide.set('position', index);
  },
  "delete": function(slide) {
    var pos;

    pos = slide.get('position') - 1;
    this.send('transitionAfterDeletion', pos);
    console.log(this.get('controllers.slides.content').toArray().length);
    slide.deleteRecord();
    console.log(this.get('controllers.slides.content').toArray().length);
    this.get('arrangedContent').forEach(this.resort, this.get('arrangedContent'));
    return this.get('store').commit();
  },
  moveDown: function(slide) {
    if (this.findTarget(slide, this.get('arrangedContent'), +1, 'position') != null) {
      return this.swap(target, slide, 'position');
    }
  },
  moveUp: function(slide) {
    if (this.findTarget(slide, this.get('arrangedContent'), -1, 'position') != null) {
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
  },
  clickThumbnail: function(targetSlide) {
    console.log('clickthumbnail fired');
    return this.send("updateActiveSlide", targetSlide);
  }
});
