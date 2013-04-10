App.SlideTextField = Em.TextField.extend
  keyUp: (e)->
    e.stopPropagation()
  keyDown: (e)->
    e.stopPropagation()
  keyPress: (e)->
    e.stopPropagation()
    
App.SlideTextArea = Em.TextArea.extend
  keyUp: (e)->
    e.stopPropagation()
  keyDown: (e)->
    e.stopPropagation()
  keyPress: (e)->
    e.stopPropagation()