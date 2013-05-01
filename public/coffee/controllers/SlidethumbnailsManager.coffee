#THIS MANAGER IS USED TO CONTROL EVENTS FIRED BY THE LIST OF 
#SLIDE THUMBNAILS (usually from SlidethumbnailsView and 
#SlidethumbnailView

#These routes will react to "hoverLeft/Right" differently
#because dropTarget is not always set during dragging
App.DnDTargetSelf = Ember.State.extend

  #we do nothing because this is our neighbor
  hoverLeft: (manager) -> return
  hoverRight: (manager) -> return
  
App.DnDTargetNeighborLeft = Ember.State.extend

  #we do nothing because this is our neighbor
  hoverRight: (manager) -> return

App.DnDTargetNeighborRight = Ember.State.extend

  #we do nothing because this is our neighbor
  hoverLeft: (manager) -> return

#default behaviors are acceptable here, methods fall through to DnDDragging
App.DnDTargetOther = Ember.State.extend()

#Drag State parent
App.DnDDragging = Ember.State.extend

  determineDragTransition: (manager, slide, offsetX) ->
    slidePos = slide.get('position')
    dragSlidePos = manager.controller.get('dragSlide.position')
    dragActions = [
      {fun: ((sPos, dsPos) -> sPos is dsPos), targ: 'targetSelf'}
      {fun: ((sPos, dsPos) -> sPos is dsPos-1), targ: 'targetNeighborLeft'}
      {fun: ((sPos, dsPos) -> sPos is dsPos+1), targ: 'targetNeighborRight'}
      {fun: ((sPos, dsPos) -> true), targ: 'targetOther'}
    ]
    for action in dragActions
      if action.fun(slidePos, dragSlidePos)
        manager.transitionTo 'dragging.' + action.targ
        return

  determineHoverEvent: (manager, slide, offsetX) ->
    halfLine = manager.controller.get('thumbnailWidth')/2
   
    if offsetX > halfLine
      manager.send "hoverRight", slide
    else
      manager.send "hoverLeft", slide

  mouseMove: (manager, slide, offsetX) ->
    if slide
      manager.send "determineDragTransition", slide, offsetX
      manager.send "determineHoverEvent", slide, offsetX

  mouseDown: (manager) ->
    console.log "you should not be able to trigger MouseDown in Dragging Mode!"

  hoverRight: (manager, target) ->
    manager.controller.send "reorderThumbnails", target.get('position')+1
  hoverLeft: (manager, target) ->
    manager.controller.send "reorderThumbnails", target.get('position')

  #child States
  targetSelf: App.DnDTargetSelf
  targetNeighborLeft: App.DnDTargetNeighborLeft
  targetNeighborRight: App.DnDTargetNeighborRight
  targetOther: App.DnDTargetOther

#Base State for Manager
App.DnDInactive = Ember.State.extend

  mouseDown: (manager, slide, xpos) ->
    manager.transitionTo "dragging.targetSelf"
    manager.controller.send "startDrag", slide, xpos

App.DnDManager = Ember.StateManager.extend

  initialState: 'inactive'
  #states
  inactive: App.DnDInactive
  dragging: App.DnDDragging

  #methods that are universal to all states 
  stopDragging: (manager) ->
    manager.controller.send "endDrag"
    manager.transitionTo "inactive"

  shouldSelect: (manager, slide, xpos) ->
    dragStartPos = manager.controller.get('dragStartPos')
    if Math.abs(dragStartPos - xpos) < 20 then true else false
      
  mouseUp: (manager, slide, xpos) ->
    if manager.send "shouldSelect", slide, xpos
      manager.controller.transitionToSlide slide
    manager.send "stopDragging"

  mouseLeft: (manager) ->
    manager.send "stopDragging"

  mouseMove: (manager, slide, xpos) -> return

  #do some cleanup before transitioning
  hoverRight: (manager) ->
    console.log "hoverRight not caught correctly!"
  hoverLeft: (manager) ->
    console.log "hoverLeft not caught correctly!"
