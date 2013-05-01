App.SlideshowsView = Em.View.extend
  tagName: 'section'
  classNames: ['slideshowSplashpage']
  didInsertElement: ->
    $('#slideshowlist').jScrollPane
      autoReinitialise: true
  
