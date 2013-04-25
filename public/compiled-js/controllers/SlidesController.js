App.SlidesController = Em.ArrayController.extend({
  needs: ['slide', 'slideshow', 'user'],
  newSlideName: "",
  sortProperties: ['position'],
  sortAscending: true,
  activeSlideBinding: 'controllers.slide.content',
  currentSlideShowBinding: 'controllers.slideshow.content',
  filteredContent: (function() {
    var curSlideShow;

    curSlideShow = this.get('currentSlideShow');
    window.fuckit = this.get('contet');
    console.log(this.get('content'));
    return this.get('content').filterProperty('slideshow', curSlideShow);
  }).property('content.@each', 'currentSlideShow'),
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
      if (this.get('content').toArray().length === 0) {
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
  clickThumbnail: function(targetSlide) {
    return this.transitionToRoute("slide", targetSlide);
  },
  startShow: function() {
    if (this.get('activeSlide') != null) {
      return this.transitionToRoute('slide', this.get('activeSlide'));
    }
  },
  pauseShow: function() {
    return this.transitionToRoute('slides');
  },
  findNewSlide: function(shouldExit, positionDelta) {
    var newPosition, newSlide;

    if (!shouldExit) {
      newPosition = this.get('activeSlide').get('position') + positionDelta;
      newSlide = this.get('content').findProperty('position', newPosition);
      return this.send("updateActiveSlide", newSlide);
    }
  },
  forward: function() {
    return this.findNewSlide(this.get('atEnd'), 1);
  },
  back: function() {
    return this.findNewSlide(this.get('atStart'), -1);
  },
  findTarget: function(slide, array, relativesearch, property) {
    return array.objectAt(slide.get(property) + relativesearch);
  },
  swap: function(dectarget, inctarget, property) {
    dectarget.decrementProperty(property);
    inctarget.incrementProperty(property);
    return this.get('store').commit();
  },
  moveDown: function(slide) {
    if (this.findTarget(slide, this.get('filteredContent'), +1, 'position') != null) {
      return this.swap(target, slide, 'position');
    }
  },
  moveUp: function(slide) {
    if (this.findTarget(slide, this.get('filteredContent'), -1, 'position') != null) {
      return this.swap(slide, target, 'position');
    }
  },
  createSlide: function() {
    var activeShow;

    activeShow = this.get('controllers.slideshow.content');
    if (!this.get('nameIsValid')) {
      return alert('name must contain at least one character and no spaces');
    } else {
      App.Slide.createRecord({
        name: this.get('newSlideName'),
        position: this.get('content').toArray().length,
        slideshow: activeShow,
        title: this.get('newSlideName')
      });
      this.get('store').commit();
      this.set('newSlideName', '');
      return window.bucket = DS.defaultStore.get('defaultTransaction.buckets');
    }
  },
  deleteSlide: function(slide) {
    var arrCon, currentPos, eachslide, i, _i, _len;

    arrCon = this.get('filteredContent');
    currentPos = slide.get('position');
    slide.deleteRecord();
    console.log(slide.get('stateManager.currentState.name'));
    console.log(arrCon.toArray());
    console.log(this.get('content').toArray());
    window.bucket = DS.defaultStore.get('defaultTransaction.buckets');
    if (this.get('atleastOneSlide')) {
      i = 0;
      for (_i = 0, _len = arrCon.length; _i < _len; _i++) {
        eachslide = arrCon[_i];
        if (slide !== eachslide) {
          eachslide.set('position', i);
          i = i + 1;
        }
      }
    }
    return this.get('store').commit();
  }
});
