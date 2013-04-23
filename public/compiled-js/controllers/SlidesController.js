App.SlidesController = Em.ArrayController.extend({
  needs: ['slide', 'slideshow', 'user', 'slidethumbnails'],
  newSlideName: "",
  sortProperties: ['position'],
  sortAscending: true,
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
  activeSlide: (function() {
    if (this.get('atleastOneSlide')) {
      return this.get('arrangedContent').objectAt(this.get('activeSlideIndex'));
    } else {
      return null;
    }
  }).property('activeSlideIndex', 'arrangedContent.@each').cacheable(),
  atleastOneSlide: (function() {
    if (this.get('content')) {
      if (this.get('content').toArray().length === 0) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }).property('content.@each').cacheable(),
  atStart: (function() {
    var index;

    index = this.get('activeSlideIndex');
    if (index === 0) {
      return true;
    } else {
      return false;
    }
  }).property('activeSlideIndex', 'arrangedContent.@each').cacheable(),
  atEnd: (function() {
    var contentLength, index;

    index = this.get('activeSlideIndex');
    contentLength = this.get('arrangedContent').toArray().length;
    if (index === contentLength - 1) {
      return true;
    } else {
      return false;
    }
  }).property('activeSlideIndex', 'arrangedContent.@each').cacheable(),
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
  forward: function() {
    var curIndex, newSlide;

    if (this.get('atEnd')) {

    } else {
      curIndex = this.get('activeSlide').get('position');
      newSlide = this.get('arrangedContent').objectAt(curIndex + 1);
      return this.send("updateActiveSlide", newSlide);
    }
  },
  back: function() {
    var curIndex, newSlide;

    if (this.get('atStart')) {

    } else {
      curIndex = this.get('activeSlide').get('position');
      newSlide = this.get('arrangedContent').objectAt(curIndex - 1);
      return this.send("updateActiveSlide", newSlide);
    }
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
  },
  goToSlideShows: function() {
    this.get('controllers.slideshow').exitEditing();
    return this.replaceRoute('slideshows');
  }
});
