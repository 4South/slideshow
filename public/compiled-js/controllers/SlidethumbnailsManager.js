App.TNTargetSelf = Ember.State.extend({
  hoverLeft: function(manager, controller) {},
  hoverRight: function(manager, controller) {}
});

App.TNTargetNeighborLeft = Ember.State.extend({
  hoverRight: function(manager, controller) {}
});

App.TNTargetNeighborRight = Ember.State.extend({
  hoverLeft: function(manager, controller) {}
});

App.TNTargetOther = Ember.State.extend();

App.TNDragging = Ember.State.extend({
  determineDragTransition: function(manager, controller, slide, offsetX) {
    var action, dragActions, dragSlidePos, slidePos, _i, _len;

    slidePos = slide.get('position');
    dragSlidePos = controller.get('dragSlide.position');
    dragActions = [
      {
        fun: (function(sPos, dsPos) {
          return sPos === dsPos;
        }),
        targ: 'targetSelf'
      }, {
        fun: (function(sPos, dsPos) {
          return sPos === dsPos - 1;
        }),
        targ: 'targetNeighborLeft'
      }, {
        fun: (function(sPos, dsPos) {
          return sPos === dsPos + 1;
        }),
        targ: 'targetNeighborRight'
      }, {
        fun: (function(sPos, dsPos) {
          return true;
        }),
        targ: 'targetOther'
      }
    ];
    for (_i = 0, _len = dragActions.length; _i < _len; _i++) {
      action = dragActions[_i];
      if (action.fun(slidePos, dragSlidePos)) {
        manager.transitionTo('dragging.' + action.targ);
        return;
      }
    }
  },
  determineHoverEvent: function(manager, controller, slide, offsetX) {
    var halfLine;

    halfLine = controller.get('thumbnailWidth') / 2;
    if (offsetX > halfLine) {
      return manager.send("hoverRight", controller, slide);
    } else {
      return manager.send("hoverLeft", controller, slide);
    }
  },
  mouseMove: function(manager, controller, slide, offsetX) {
    manager.send("determineDragTransition", controller, slide, offsetX);
    return manager.send("determineHoverEvent", controller, slide, offsetX);
  },
  mouseDown: function(manager) {
    return console.log("you should not be able to trigger MouseDown in Dragging Mode!");
  },
  hoverRight: function(manager, controller, target) {
    return controller.send("reorderThumbnails", target.get('position') + 1);
  },
  hoverLeft: function(manager, controller, target) {
    return controller.send("reorderThumbnails", target.get('position'));
  },
  targetSelf: App.TNTargetSelf,
  targetNeighborLeft: App.TNTargetNeighborLeft,
  targetNeighborRight: App.TNTargetNeighborRight,
  targetOther: App.TNTargetOther
});

App.TNInactive = Ember.State.extend({
  mouseDown: function(manager, controller, slide, xpos) {
    manager.transitionTo("dragging.targetSelf");
    return controller.send("startDrag", slide, xpos);
  }
});

App.SlidethumbnailsManager = Ember.StateManager.extend({
  initialState: 'inactive',
  inactive: App.TNInactive,
  dragging: App.TNDragging,
  stopDragging: function(manager, controller) {
    controller.send("endDrag");
    return manager.transitionTo("inactive");
  },
  shouldSelect: function(manager, controller, slide, xpos) {
    var dragStartPos;

    dragStartPos = controller.get('dragStartPos');
    if (Math.abs(dragStartPos - xpos) < 20) {
      return true;
    } else {
      return false;
    }
  },
  mouseUp: function(manager, controller, slide, xpos) {
    if (manager.send("shouldSelect", controller, slide, xpos)) {
      controller.transitionToSlide(slide);
    }
    return manager.send("stopDragging", controller);
  },
  mouseLeft: function(manager, controller) {
    return manager.send("stopDragging", controller);
  },
  mouseMove: function(manager, controller, slide, xpos) {},
  hoverRight: function(manager, controller) {
    return console.log("hoverRight not caught correctly!");
  },
  hoverLeft: function(manager, controller) {
    return console.log("hoverLeft not caught correctly!");
  }
});
