App.SlideshowsView = Em.View.extend
  didInsertElement: ->
    $('#slideshowlist').jScrollPane
                autoReinitialise: true
       