App.SlidethumbnailsView = Em.View.extend
  didInsertElement: ->
    $('.leftbar').jScrollPane
      autoReinitialise: true