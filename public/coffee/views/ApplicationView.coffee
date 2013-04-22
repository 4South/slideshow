App.ApplicationView = Em.View.extend

  classNames: ['appview']
  attributeBindings: ['tabindex']
  tabindex: 1

  keyUp: (event)->
    switch event.keyCode
      when 32, 39, 40
        @get('controller.controllers.slides').forward()
      when 37, 38
        @get('controller.controllers.slides').back()
      
