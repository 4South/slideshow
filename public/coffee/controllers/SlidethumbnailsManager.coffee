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
      if action.fun(slidePos, dragSlidePos) is true
        manager.transitionTo 'dragging.' + action.targ
        return

  determineHoverEvent: (manager, slide, offsetX) ->
    halfLine = manager.view.get('thumbnailWidth')/2
   
    message = if offsetX > halfLine then 'hoverRight' else 'hoverLeft'
    manager.send message, slide

  mouseMove: (manager, slide, event, view) ->
    manager.view.updateDraggingThumbnail event.pageX, event.pageY
    if slide
      manager.send "determineDragTransition", slide, event.offsetX
      manager.send "determineHoverEvent", slide, event.offsetX

  mouseDown: (manager) -> console.log "mousedown triggerd in dragging!"

  mouseUp: (manager, slide, offsetX) -> manager.send "stopDragging"

  mouseLeft: (manager) -> manager.send "stopDragging"

  hoverRight: (manager, target) ->
    manager.controller.send "reorderThumbnails",
                            target.get('position')+1,
                            target,
                            manager.view.get('dragSlide')

  hoverLeft: (manager, target) ->
    manager.controller.send "reorderThumbnails",
                            target.get('position'),
                            target,
                            manager.view.get('dragSlide')

  #child States
  targetSelf: App.DnDTargetSelf
  targetNeighborLeft: App.DnDTargetNeighborLeft
  targetNeighborRight: App.DnDTargetNeighborRight
  targetOther: App.DnDTargetOther

#Selecting State
App.DnDSelecting = Ember.State.extend

  mouseDown: (manager) -> console.log "mouseDown fired in selecting"

  mouseMove: (manager, slide, event, view) ->
    dragStartOffset = manager.view.get('dragStartOffset')
    if Math.abs(dragStartOffset - event.offsetX) > 20
      manager.view.startDrag(slide, view)
      manager.transitionTo "dragging.targetSelf"

  mouseUp: (manager, slide, xpos) ->
    manager.controller.transitionToSlide slide

  mouseLeft: (manager) ->
    manager.transitionTo "inactive"
  
#Base State for Manager
App.DnDInactive = Ember.State.extend

  mouseDown: (manager, slide, xpos) ->
    manager.view.recordStartOffset(slide, xpos)
    manager.transitionTo "selecting"

App.DnDManager = Ember.StateManager.extend

  initialState: 'inactive'

  #states
  inactive: App.DnDInactive
  selecting: App.DnDSelecting
  dragging: App.DnDDragging

  #methods that are universal to all states 
  stopDragging: (manager) ->
    manager.view.endDrag(manager.view.get('dragSlide'))
    manager.transitionTo "inactive"

  mouseDown: (manager) -> throw new Ember.Error "mouseDown not handled"

  mouseUp: (manager) -> return

  mouseLeft: (manager) -> return

  mouseMove: (manager) -> return

  hoverRight: (manager) -> console.log "hoverRight handled incorrectly"

  hoverLeft: (manager) -> console.log "hoverLeft handled incorrectly"
