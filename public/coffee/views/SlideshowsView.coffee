App.SlideshowsView = Em.View.extend
  didInsertElement: ->
    Ember.run.later((
      ()->
        $('#slideshowlist').jScrollPane
                    autoReinitialise: true
       ), 200)