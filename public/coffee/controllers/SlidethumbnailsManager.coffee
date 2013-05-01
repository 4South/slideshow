#THIS MANAGER IS USED TO CONTROL EVENTS FIRED BY THE LIST OF 
#SLIDE THUMBNAILS (usually from SlidethumbnailsView and 
#SlidethumbnailView

#These routes will react to "hoverLeft/Right" differently
#because dropTarget is not always set during dragging
App.TNTargetSelf = Ember.State.extend

  #we do nothing because this is our neighbor
  hoverLeft: (manager, controller) -> return
  hoverRight: (manager, controller) -> return
  
App.TNTargetNeighborLeft = Ember.State.extend

  #we do nothing because this is our neighbor
  hoverRight: (manager, controller) -> return

App.TNTargetNeighborRight = Ember.State.extend

  #we do nothing because this is our neighbor
  hoverLeft: (manager, controller) -> return

#default behaviors are acceptable here, methods fall through to TNDragging
App.TNTargetOther = Ember.State.extend()

#Drag State parent
App.TNDragging = Ember.State.extend

  determineDragTransition: (manager, controller, slide, offsetX) ->
    slidePos = slide.get('position')
    dragSlidePos = controller.get('dragSlide.position')
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

  determineHoverEvent: (manager, controller, slide, offsetX) ->
    halfLine = controller.get('thumbnailWidth')/2
   
    if offsetX > halfLine
      manager.send "hoverRight", controller, slide
    else
      manager.send "hoverLeft", controller, slide

  mouseMove: (manager, controller, slide, offsetX) ->
    manager.send "determineDragTransition", controller, slide, offsetX
    manager.send "determineHoverEvent", controller, slide, offsetX

  mouseDown: (manager) ->
    console.log "you should not be able to trigger MouseDown in Dragging Mode!"

  hoverRight: (manager, controller, target) ->
    controller.send "reorderThumbnails", target.get('position')+1
  hoverLeft: (manager, controller, target) ->
    controller.send "reorderThumbnails", target.get('position')

  #child States
  targetSelf: App.TNTargetSelf
  targetNeighborLeft: App.TNTargetNeighborLeft
  targetNeighborRight: App.TNTargetNeighborRight
  targetOther: App.TNTargetOther

#Base State for Manager
App.TNInactive = Ember.State.extend

  mouseDown: (manager, controller, slide, xpos) ->
    manager.transitionTo "dragging.targetSelf"
    controller.send "startDrag", slide, xpos

App.SlidethumbnailsManager = Ember.StateManager.extend

  initialState: 'inactive'
  #states
  inactive: App.TNInactive
  dragging: App.TNDragging

  #methods that are universal to all states 
  stopDragging: (manager, controller) ->
    controller.send "endDrag"
    manager.transitionTo "inactive"

  shouldSelect: (manager, controller, slide, xpos) ->
    dragStartPos = controller.get('dragStartPos')
    if Math.abs(dragStartPos - xpos) < 20 then true else false
      
  mouseUp: (manager, controller, slide, xpos) ->
    if manager.send "shouldSelect", controller, slide, xpos
      controller.transitionToSlide slide
    manager.send "stopDragging", controller

  mouseLeft: (manager, controller) ->
    manager.send "stopDragging", controller

  mouseMove: (manager, controller, slide, xpos) -> return

  #do some cleanup before transitioning
  hoverRight: (manager, controller) ->
    console.log "hoverRight not caught correctly!"
  hoverLeft: (manager, controller) ->
    console.log "hoverLeft not caught correctly!"
