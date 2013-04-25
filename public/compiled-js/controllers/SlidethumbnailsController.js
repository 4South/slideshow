App.SlidethumbnailsController = Em.ArrayController.extend({
  needs: ['slideshow', 'slide', 'user', 'slides'],
  activeSlideBinding: "controllers.slides.activeSlide",
  contentBinding: 'controllers.slides.content',
  arrangedContentBinding: 'controllers.slides.arrangedContent',
  sortProperties: ['position'],
  sortAscending: true,
  atleastOneSlide: (function() {
    if (this.get('content')) {
      if (this.get('content').toArray().length === 0) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }).property('content.@each.id').cacheable(),
  "delete": function(slide) {
    var arrCon, currentPos;

    arrCon = this.get('arrangedContent');
    currentPos = slide.get('position');
    slide.deleteRecord();
    console.log(arrCon.toString());
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
  findTarget: function(slide, array, relativesearch, property) {
    return array.objectAt(slide.get(property) + relativesearch);
  },
  swap: function(dectarget, inctarget, property) {
    dectarget.decrementProperty(property);
    inctarget.incrementProperty(property);
    return this.get('store').commit();
  },
  clickThumbnail: function(targetslide) {
    console.log('clickthumbnail fired');
    return this.send("updateActiveSlide", targetslide);
  }
});
