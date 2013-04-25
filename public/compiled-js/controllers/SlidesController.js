App.SlidesController = Em.ArrayController.extend({
  needs: ['slide', 'slideshow', 'user', 'slidethumbnails'],
  newSlideName: "",
  sortProperties: ['position'],
  sortAscending: true,
  activeSlideBinding: 'controllers.slide.content',
  activeSlideIndex: 0,
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
      }
      return true;
    } else {
      return false;
    }
  }).property('content.@each.id').cacheable(),
  atStart: (function() {
    var activeSlide;

    activeSlide = this.get('activeSlide');
    if (!activeSlide) {
      return false;
    }
    if (activeSlide.get('position') === 0) {
      return true;
    } else {
      return false;
    }
  }).property('activeSlide').cacheable(),
  atEnd: (function() {
    var activeSlide, endPosition;

    activeSlide = this.get('activeSlide');
    endPosition = this.get('arrangedContent').toArray().length - 1;
    if (!activeSlide) {
      return false;
    }
    if (activeSlide.get('position') === endPosition) {
      return true;
    } else {
      return false;
    }
  }).property('activeSlide', 'arrangedContent.@each').cacheable(),
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
    }
  },
  pauseShow: function() {
    return this.transitionToRoute('slides');
  },
  findNewSlide: function(shouldExit, positionDelta) {
    var newPosition, newSlide;

    if (shouldExit) {

    } else {
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
  create: function() {
    var activeShow, slides;

    activeShow = this.get('controllers.slideshow.content');
    if (this.get('nameIsValid')) {
      App.Slide.createRecord({
        name: this.get('newSlideName'),
        position: this.get('content').toArray().length,
        slideshow: activeShow,
        title: this.get('newSlideName')
      });
      this.get('store').commit();
      this.set('newSlideName', '');
      slides = App.Slide.find({
        slideshow: activeShow.get('id')
      });
      return this.set('content', slides);
    } else {
      return alert('name must contain at least one character and no spaces');
    }
  }
});
