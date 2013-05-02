var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

App.SlidethumbnailsController = Ember.ArrayController.extend({
  needs: ['slides'],
  contentBinding: 'controllers.slides.content',
  filteredContentBinding: 'controllers.slides.filteredContent',
  reorderThumbnails: function(newPos, targetSlide, dragSlide) {
    var inRange, incrementPos, origPos, range, setPosByIndex, slides, _i, _j, _ref, _results, _results1;

    slides = this.get('filteredContent');
    origPos = dragSlide.get('position');
    inRange = function(slide, index, slides) {
      var _ref;

      return _ref = slide.get('position'), __indexOf.call(this, _ref) >= 0;
    };
    incrementPos = function(slide, index, slides) {
      return slide.incrementProperty('position');
    };
    setPosByIndex = function(slide, index, slides) {
      return slide.set('position', index);
    };
    dragSlide.set('position', newPos);
    if (newPos < origPos) {
      range = (function() {
        _results = [];
        for (var _i = newPos; newPos <= origPos ? _i <= origPos : _i >= origPos; newPos <= origPos ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this);
    } else {
      range = (function() {
        _results1 = [];
        for (var _j = newPos, _ref = slides.get('lastObject.position'); newPos <= _ref ? _j <= _ref : _j >= _ref; newPos <= _ref ? _j++ : _j--){ _results1.push(_j); }
        return _results1;
      }).apply(this);
    }
    slides.without(dragSlide).filter(inRange, range).forEach(incrementPos);
    return slides.forEach(setPosByIndex);
  },
  transitionToSlide: function(target) {
    return this.send("updateActiveSlide", target);
  }
});
