App.ApplicationView = Em.View.extend
  classNames: ['appview']
  attributeBindings: ['tabindex']
  tabindex: 1
  keyUp: (event)->
    switch event.keyCode
      when 40, 32, 39
        @get('controller.controllers.slides').forward()
      when 38, 37
        @get('controller.controllers.slides').back()
      when 13
        @get('controller.controllers.user').login()