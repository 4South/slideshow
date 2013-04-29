App.TNInactive = Ember.State.extend
  mouseReleased: (manager, controller, slide) ->
    controller.send "resetTimer"
    controller.send "transitionToSlide", slide
  timeElapsed: (manager, controller) ->
    manager.transitionTo "dragging"

App.TNDragging = Ember.State.extend
  mouseReleased: (manager, controller, slide, target) ->
    controller.send "attemptDrop", slide, target
    controller.send "resetTimer"
    manager.transitionTo "inactive"

App.TNManager = Ember.StateManager.extend
  initialState: 'inactive'
  
  #methods that are universal to all states 
  mouseDown: (manager, controller) ->
    controller.send "startCounter"
  mouseLeft: (manager, controller) ->
    controller.send "resetTimer"
    manager.transitionTo "inactive"
  timeElapsed: (manager, controller) ->
    manager.transitionTo "inactive"
     
  inactive: App.TNInactive
  dragging: App.TNDragging


App.SlidethumbnailsController = Ember.ArrayController.extend
  
  needs: ['slides']
  contentBinding: 'controllers.slides.content'
  filteredContentBinding: 'controllers.slides.filteredContent'

  manager: App.TNManager.create()

  thumbnailWidth: 100
 
  triggerTime: 800
  pressTime: null
  dragging: false

  checkTimeDelta: () ->
    timeDelta = Date.now() - @get('pressTime')
    if timeDelta > @get('triggerTime')
      if @get('pressTime')?
        @send "timeElapsed"
    else Ember.run.next(@, @checkTimeDelta)

  timeElapsed: () ->
    @resetTimer()
    @get('manager').send "timeElapsed", @

  startCounter: () ->
    @set "pressTime", Date.now()
    Ember.run.next(@, @checkTimeDelta)

  resetTimer: () ->
    @set "pressTime", null

  attemptDrop: (slide, target) ->
    console.log "filler text for drop attempt"

  transitionToSlide: (target) ->
    @send "updateActiveSlide", target
