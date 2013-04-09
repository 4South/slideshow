App.SlideView = Em.View.extend

  layoutName: 'slideframe'
  classNames: ['slideList']

  init: () ->
    @_super()
    name = "slides/" + @get('content.name')
    if Ember.TEMPLATES[name]
      @set('templateName', name)
    else
      @set('template',
        Ember.Handlebars.compile('<h1 style="color:red;">whatev</h1>'))
      
