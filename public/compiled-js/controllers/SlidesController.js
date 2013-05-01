App.SortedFilteredSet = Ember.ArrayProxy.extend(Ember.SortableMixin, {
  sortProperties: [],
  sortAscending: true
});

App.SlidesController = Em.ArrayController.extend({
  needs: ['slide', 'slideshow', 'user'],
  newSlideName: "",
  activeSlideBinding: 'controllers.slide.content',
  currentSlideshowBinding: 'controllers.slideshow.content',
  filteredContent: (function() {
    var curSlideShow, filteredArray;

    curSlideShow = this.get('currentSlideshow');
    filteredArray = this.get('content').filterProperty('slideshow', curSlideShow);
    return App.SortedFilteredSet.create({
      content: filteredArray,
      sortProperties: ['position'],
      sortAscending: true
    });
  }).property('content.@each', 'currentSlideshow'),
  nameIsValid: (function() {
    var name;

    name = this.get('newSlideName');
    if ((name.indexOf(" ") === -1) && name !== "") {
      return true;
    } else {
      return false;
    }
  }).property('newSlideName').cacheable(),
  atleastOneSlide: (function() {
    if (this.get('content')) {
      if (this.get('filteredContent').toArray().length === 0) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }).property('content.@each.id').cacheable(),
  isPositionAnExtreme: function(activeSlide, extremeValue) {
    if (!activeSlide) {
      return false;
    }
    if (activeSlide.get('position') === extremeValue) {
      return true;
    } else {
      return false;
    }
  },
  atStart: (function() {
    var activeSlide;

    activeSlide = this.get('activeSlide');
    return this.isPositionAnExtreme(activeSlide, 0);
  }).property('activeSlide').cacheable(),
  atEnd: (function() {
    var activeSlide, endPosition;

    activeSlide = this.get('activeSlide');
    endPosition = this.get('filteredContent').toArray().length - 1;
    return this.isPositionAnExtreme(activeSlide, endPosition);
  }).property('activeSlide', 'filteredContent.@each').cacheable(),
  savedStatus: (function() {
    if (this.get('content').someProperty('isDirty')) {
      return "Unsaved Changes";
    } else {
      return "All Changes Saved";
    }
  }).property('content.@each.isDirty').cacheable(),
  startShow: function() {
    if (this.get('activeSlide') != null) {
      return this.transitionToRoute('slide', this.get('activeSlide'));
    } else if (this.get('filteredContent').toArray().length !== 0) {
      return this.transitionToRoute('slide', this.get('filteredContent.firstObject'));
    }
  },
  pauseShow: function() {
    return this.transitionToRoute('slides');
  },
  findNewSlide: function(positionDelta) {
    var newPosition;

    newPosition = this.get('activeSlide').get('position') + positionDelta;
    return this.get('content').findProperty('position', newPosition);
  },
  forward: function() {
    if (!this.get('atEnd')) {
      return this.transitionToRouteAnimated("slide", {
        main: 'slideLeft'
      }, this.findNewSlide(1));
    }
  },
  back: function() {
    if (!this.get('atStart')) {
      return this.transitionToRouteAnimated("slide", {
        main: 'slideRight'
      }, this.findNewSlide(-1));
    }
  },
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
  createSlide: function() {
    var activeShow;

    activeShow = this.get('currentSlideshow');
    if (!this.get('nameIsValid')) {
      return alert('name must contain at least one character and no spaces');
    } else {
      App.Slide.createRecord({
        name: this.get('newSlideName'),
        position: this.get('filteredContent').toArray().length,
        slideshow: activeShow,
        title: this.get('newSlideName')
      });
      this.get('store').commit();
      return this.set('newSlideName', '');
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
