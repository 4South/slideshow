App.TNInactive = Ember.State.extend({
  mouseReleased: function(manager, controller, slide) {
    controller.send("resetTimer");
    return controller.send("transitionToSlide", slide);
  },
  timeElapsed: function(manager, controller) {
    return manager.transitionTo("dragging");
  }
});

App.TNDragging = Ember.State.extend({
  mouseReleased: function(manager, controller, slide, target) {
    controller.send("attemptDrop", slide, target);
    controller.send("resetTimer");
    return manager.transitionTo("inactive");
  }
});

App.TNManager = Ember.StateManager.extend({
  initialState: 'inactive',
  mouseDown: function(manager, controller) {
    return controller.send("startCounter");
  },
  mouseLeft: function(manager, controller) {
    controller.send("resetTimer");
    return manager.transitionTo("inactive");
  },
  timeElapsed: function(manager, controller) {
    return manager.transitionTo("inactive");
  },
  inactive: App.TNInactive,
  dragging: App.TNDragging
});

App.SlidethumbnailsController = Ember.ArrayController.extend({
  needs: ['slides'],
  contentBinding: 'controllers.slides.content',
  filteredContentBinding: 'controllers.slides.filteredContent',
  manager: App.TNManager.create(),
  thumbnailWidth: 100,
  triggerTime: 800,
  pressTime: null,
  dragging: false,
  checkTimeDelta: function() {
    var timeDelta;

    timeDelta = Date.now() - this.get('pressTime');
    if (timeDelta > this.get('triggerTime')) {
      if (this.get('pressTime') != null) {
        return this.send("timeElapsed");
      }
    } else {
      return Ember.run.next(this, this.checkTimeDelta);
    }
  },
  timeElapsed: function() {
    this.resetTimer();
    return this.get('manager').send("timeElapsed", this);
  },
  startCounter: function() {
    this.set("pressTime", Date.now());
    return Ember.run.next(this, this.checkTimeDelta);
  },
  resetTimer: function() {
    return this.set("pressTime", null);
  },
  attemptDrop: function(slide, target) {
    return console.log("filler text for drop attempt");
  },
  transitionToSlide: function(target) {
    return this.send("updateActiveSlide", target);
  }
});
