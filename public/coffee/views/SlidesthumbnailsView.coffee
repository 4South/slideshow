App.SlidethumbnailsView = Em.View.extend
  didInsertElement: ->
    Ember.run.later((
      ()->
        $('.leftbar').jScrollPane
                    autoReinitialise: true
        $('.slides').jScrollPane
                    autoReinitialise: true
       ), 200)