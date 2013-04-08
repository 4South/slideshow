App.SlidesController = Em.ArrayController.extend({
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
  startShow: function() {
    if (this.get('activeSlide') != null) {
      return this.transitionToRoute('slide', this.get('activeSlide'));
    }
  },
  pauseShow: function() {
    return this.transitionToRoute('slides');
  },
  createNewSlide: function(slide) {
    return Ember.run(this, function() {
      return this.pushObject(App.Slide.create({
        name: slide.name
      }, {
        templateName: slide.name,
        id: slide.id
      }));
    });
  },
  deleteSlide: function(deletedSlide) {
    return Ember.run(this, function() {
      var delSlide;

      delSlide = this.filterProperty('id', deletedSlide.id)[0];
      return this.removeObject(delSlide);
    });
  },
  create: function() {
    var data, name;

    name = this.get('newSlideName');
    if (!this.get('nameIsValid')) {
      return alert('name may not contain spaces and must be defined');
    } else {
      data = JSON.stringify({
        name: name,
        templateName: name
      });
      Ember.$.ajax({
        contentType: "application/json",
        url: "create",
        method: 'POST',
        data: data,
        context: this,
        success: this.createNewSlide
      });
      return this.set("newSlideName", "");
    }
  },
  "delete": function(slide) {
    if (!confirm('Delete this slide/handlebars template?')) {
      return;
    }
    return Ember.$.ajax({
      contentType: "application/json",
      url: "delete",
      method: 'DELETE',
      data: JSON.stringify(slide),
      context: this,
      success: this.deleteSlide
    });
  }
});
