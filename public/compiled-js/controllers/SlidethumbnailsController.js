App.SlidethumbnailsController = Ember.ArrayController.extend({
  needs: ['slides'],
  contentBinding: 'controllers.slides.content',
  filteredContentBinding: 'controllers.slides.filteredContent',
  thumbnailWrapperWidth: 160,
  thumbnailWidth: (function() {
    return this.get('thumbnailWrapperWidth') * .9;
  }).property('thumbnailWrapperWidth'),
  targetPos: null,
  dragSlide: null,
  dragStartPos: null,
  startDrag: function(slide, xpos) {
    return this.setProperties({
      dragSlide: slide,
      dragStartPos: xpos
    });
  },
  endDrag: function() {
    this.setProperties({
      dragSlide: null,
      dragStartPos: null
    });
    return this.get('store').commit();
  },
  reorderThumbnails: function(newPos) {
    var dragSlide, filteredSlides, incrementPosition, isTrue, lastObjPos, origPos, range, slide, slides, _i, _j, _k, _len, _ref, _results, _results1;

    dragSlide = this.get('dragSlide');
    origPos = dragSlide.get('position');
    slides = this.get('filteredContent');
    filteredSlides = [];
    dragSlide.set("position", newPos);
    if (newPos < origPos) {
      range = (function() {
        _results = [];
        for (var _i = newPos; newPos <= origPos ? _i <= origPos : _i >= origPos; newPos <= origPos ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this);
    } else {
      lastObjPos = slides.get('lastObject.position');
      range = (function() {
        _results1 = [];
        for (var _j = newPos; newPos <= lastObjPos ? _j <= lastObjPos : _j >= lastObjPos; newPos <= lastObjPos ? _j++ : _j--){ _results1.push(_j); }
        return _results1;
      }).apply(this);
    }
    _ref = slides.without(dragSlide);
    for (_k = 0, _len = _ref.length; _k < _len; _k++) {
      slide = _ref[_k];
      isTrue = range.some(function(item) {
        return item === slide.get('position');
      });
      if (isTrue) {
        filteredSlides.pushObject(slide);
      }
    }
    incrementPosition = function(slide) {
      return slide.incrementProperty('position');
    };
    filteredSlides.forEach(incrementPosition);
    return slides.forEach(function(slide, index) {
      return slide.set('position', index);
    });
  },
  transitionToSlide: function(target) {
    return this.send("updateActiveSlide", target);
  }
});
