App.DnDTargetSelf = Ember.State.extend({
  hoverLeft: function(manager) {},
  hoverRight: function(manager) {}
});

App.DnDTargetNeighborLeft = Ember.State.extend({
  hoverRight: function(manager) {}
});

App.DnDTargetNeighborRight = Ember.State.extend({
  hoverLeft: function(manager) {}
});

App.DnDTargetOther = Ember.State.extend();

App.DnDDragging = Ember.State.extend({
  determineDragTransition: function(manager, slide, offsetX) {
    var action, dragActions, dragSlidePos, slidePos, _i, _len;

    slidePos = slide.get('position');
    dragSlidePos = manager.controller.get('dragSlide.position');
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
  determineHoverEvent: function(manager, slide, offsetX) {
    var halfLine;

    halfLine = manager.controller.get('thumbnailWidth') / 2;
    if (offsetX > halfLine) {
      return manager.send("hoverRight", slide);
    } else {
      return manager.send("hoverLeft", slide);
    }
  },
  mouseMove: function(manager, slide, offsetX) {
    if (slide) {
      manager.send("determineDragTransition", slide, offsetX);
      return manager.send("determineHoverEvent", slide, offsetX);
    }
  },
  mouseDown: function(manager) {
    return console.log("you should not be able to trigger MouseDown in Dragging Mode!");
  },
  hoverRight: function(manager, target) {
    return manager.controller.send("reorderThumbnails", target.get('position') + 1);
  },
  hoverLeft: function(manager, target) {
    return manager.controller.send("reorderThumbnails", target.get('position'));
  },
  targetSelf: App.DnDTargetSelf,
  targetNeighborLeft: App.DnDTargetNeighborLeft,
  targetNeighborRight: App.DnDTargetNeighborRight,
  targetOther: App.DnDTargetOther
});

App.DnDInactive = Ember.State.extend({
  mouseDown: function(manager, slide, xpos) {
    manager.transitionTo("dragging.targetSelf");
    return manager.controller.send("startDrag", slide, xpos);
  }
});

App.DnDManager = Ember.StateManager.extend({
  initialState: 'inactive',
  inactive: App.DnDInactive,
  dragging: App.DnDDragging,
  stopDragging: function(manager) {
    manager.controller.send("endDrag");
    return manager.transitionTo("inactive");
  },
  shouldSelect: function(manager, slide, xpos) {
    var dragStartPos;

    dragStartPos = manager.controller.get('dragStartPos');
    if (Math.abs(dragStartPos - xpos) < 20) {
      return true;
    } else {
      return false;
    }
  },
  mouseUp: function(manager, slide, xpos) {
    if (manager.send("shouldSelect", slide, xpos)) {
      manager.controller.transitionToSlide(slide);
    }
    return manager.send("stopDragging");
  },
  mouseLeft: function(manager) {
    return manager.send("stopDragging");
  },
  mouseMove: function(manager, slide, xpos) {},
  hoverRight: function(manager) {
    return console.log("hoverRight not caught correctly!");
  },
  hoverLeft: function(manager) {
    return console.log("hoverLeft not caught correctly!");
  }
});
