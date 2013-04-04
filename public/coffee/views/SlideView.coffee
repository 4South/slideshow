App.SlideView = Em.View.extend

  layoutName: 'slideframe'
  templateName: (->
    return 'slides/' + @get('content.templateName')
  ).property()
