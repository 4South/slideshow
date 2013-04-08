App.SlidesController = Em.ArrayController.extend({
  needs: ['application'],
  newSlideName: "",
  nameIsValid: (function() {
    var name;

    name = this.get('newSlideName');
    if ((name.indexOf(" ") === -1) && name !== "") {
      return true;
    } else {
      return false;
    }
  }).property('newSlideName').cacheable(),
  activeSlideIndex: 0,
  activeSlide: (function() {
    if (this.get('atleastOneSlide')) {
      return this.get('content').objectAt(this.get('activeSlideIndex'));
    } else {
      return null;
    }
  }).property('activeSlideIndex', 'content.@each').cacheable(),
  atleastOneSlide: (function() {
    if (this.get('content').toArray().length === 0) {
      return false;
    }
    return true;
  }).property('content.@each').cacheable(),
  atEnd: (function() {
    var contentLength, index;

    index = this.get('activeSlideIndex');
    contentLength = this.get('content').toArray().length;
    if (index === contentLength - 1) {
      return true;
    } else {
      return false;
    }
  }).property('activeSlideIndex', 'content.@each').cacheable(),
  atStart: (function() {
    var index;

    index = this.get('activeSlideIndex');
    if (index === 0) {
      return true;
    } else {
      return false;
    }
  }).property('activeSlideIndex', 'content.@each').cacheable(),
  startShow: function() {
    if (this.get('activeSlide') != null) {
      return this.transitionToRoute('slide', this.get('activeSlide'));
    }
  },
  pauseShow: function() {
    return this.transitionToRoute('slides');
  },
  forward: function() {
    if (this.get('atEnd')) {

    } else {
      this.incrementProperty('activeSlideIndex');
      return this.transitionToRoute('slide', this.get('activeSlide'));
    }
  },
  back: function() {
    if (this.get('atStart')) {

    } else {
      this.decrementProperty('activeSlideIndex');
      return this.transitionToRoute('slide', this.get('activeSlide'));
    }
  },
  create: function() {
    if (this.get('nameIsValid')) {
      App.Slide.createRecord({
        name: this.get('newSlideName'),
        position: 0
      });
      this.get('store').commit();
      return this.set('newSlideName', '');
    } else {
      return alert('name must contain at least one character and no spaces');
    }
  },
  "delete": function(slide) {
    slide.deleteRecord();
    return this.get('store').commit();
  }
});
