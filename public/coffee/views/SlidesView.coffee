App.SlidesView = Em.View.extend
  classNames: ['slideslist']
  tagName: 'section'
  didInsertElement: ->
    Ember.run.later((
      ()->
        $('.slideslist').jScrollPane
                    autoReinitialise: true
       ), 200)
