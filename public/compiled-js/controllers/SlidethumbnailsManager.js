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
      if (action.fun(slidePos, dragSlidePos) === true) {
        manager.transitionTo('dragging.' + action.targ);
        return;
      }
    }
  },
  determineHoverEvent: function(manager, slide, offsetX) {
    var halfLine, message;

    halfLine = manager.view.get('thumbnailWidth') / 2;
    message = offsetX > halfLine ? 'hoverRight' : 'hoverLeft';
    return manager.send(message, slide);
  },
  mouseMove: function(manager, slide, event, view) {
    manager.view.updateDraggingThumbnail(event.pageX, event.pageY);
    if (slide) {
      manager.send("determineDragTransition", slide, event.offsetX);
      return manager.send("determineHoverEvent", slide, event.offsetX);
    }
  },
  mouseDown: function(manager) {
    return console.log("mousedown triggerd in dragging!");
  },
  mouseUp: function(manager, slide, offsetX) {
    return manager.send("stopDragging");
  },
  mouseLeft: function(manager) {
    return manager.send("stopDragging");
  },
  hoverRight: function(manager, target) {
    return manager.controller.send("reorderThumbnails", target.get('position') + 1, target, manager.view.get('dragSlide'));
  },
  hoverLeft: function(manager, target) {
    return manager.controller.send("reorderThumbnails", target.get('position'), target, manager.view.get('dragSlide'));
  },
  targetSelf: App.DnDTargetSelf,
  targetNeighborLeft: App.DnDTargetNeighborLeft,
  targetNeighborRight: App.DnDTargetNeighborRight,
  targetOther: App.DnDTargetOther
});

App.DnDSelecting = Ember.State.extend({
  mouseDown: function(manager) {
    return console.log("mouseDown fired in selecting");
  },
  mouseMove: function(manager, slide, event, view) {
    var dragStartOffset;

    dragStartOffset = manager.view.get('dragStartOffset');
    if (Math.abs(dragStartOffset - event.offsetX) > 20) {
      manager.view.startDrag(slide, view);
      return manager.transitionTo("dragging.targetSelf");
    }
  },
  mouseUp: function(manager, slide, xpos) {
    return manager.controller.transitionToSlide(slide);
  },
  mouseLeft: function(manager) {
    return manager.transitionTo("inactive");
  }
});

App.DnDInactive = Ember.State.extend({
  mouseDown: function(manager, slide, xpos) {
    manager.view.recordStartOffset(slide, xpos);
    return manager.transitionTo("selecting");
  }
});

App.DnDManager = Ember.StateManager.extend({
  initialState: 'inactive',
  inactive: App.DnDInactive,
  selecting: App.DnDSelecting,
  dragging: App.DnDDragging,
  stopDragging: function(manager) {
    manager.view.endDrag(manager.view.get('dragSlide'));
    return manager.transitionTo("inactive");
  },
  mouseDown: function(manager) {
    throw new Ember.Error("mouseDown not handled");
  },
  mouseUp: function(manager) {},
  mouseLeft: function(manager) {},
  mouseMove: function(manager) {},
  hoverRight: function(manager) {
    return console.log("hoverRight handled incorrectly");
  },
  hoverLeft: function(manager) {
    return console.log("hoverLeft handled incorrectly");
  }
});
