App.ThumbnaileditingController = Ember.ObjectController.extend({
  needs: ['slides', 'slide', 'slidethumbnails'],
  contentBinding: 'controllers.slide.content',
  findTarget: function(slide, array, deltaPos) {
    return array.findProperty('position', slide.get('position') + deltaPos);
  },
  swap: function(dectarget, inctarget, property) {
    dectarget.decrementProperty(property);
    inctarget.incrementProperty(property);
    return this.get('store').commit();
  },
  moveDown: function(slide) {
    var target;

    target = this.findTarget(slide, this.get('filteredContent'), 1, 'position');
    if (target != null) {
      return this.swap(target, slide, 'position');
    }
  },
  moveUp: function(slide) {
    var target;

    target = this.findTarget(slide, this.get('filteredContent'), -1, 'position');
    if (target != null) {
      return this.swap(slide, target, 'position');
    }
  },
  deleteSlide: function(slide) {
    var arrCon, currentPos, target, withoutDeleted;

    arrCon = this.get('filteredContent');
    withoutDeleted = arrCon.without(slide);
    currentPos = slide.get('position');
    slide.deleteRecord();
    withoutDeleted.forEach(function(eachslide, index) {
      return eachslide.set('position', index);
    });
    this.get('store').commit();
    if (this.get('atleastOneSlide')) {
      target = withoutDeleted.findProperty('position', currentPos);
      if (target) {
        return this.replaceRoute('slide', target);
      } else {
        return this.replaceRoute('slide', withoutDeleted.get('lastObject'));
      }
    } else {
      return this.replaceRoute('slides');
    }
  }
});
