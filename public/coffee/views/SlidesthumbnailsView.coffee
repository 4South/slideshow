App.SlidethumbnailsView = Em.View.extend
  tagName: 'div'
  classNames: ['slidethumbnailsviewport']
  # didInsertElement: ->
    # $('#scrollbarWrapper').jScrollPane
           # autoReinitialise: true
  
  #in px, used to calculate size of viewport scrollbar
  viewportWidth: (->
    thumbnailCount = @get('controller.filteredContent.length')
    "width: #{thumbnailCount * @get('controller.thumbnailWidth')}px;"
  ).property('controller.filteredContent')

  mouseLeave: (event) ->
    console.log "left the thumbnails area"
    event.preventDefault()
    @get('controller.manager').send "mouseLeft", @get('controller')
