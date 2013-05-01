App.SlidethumbnailsView = Em.View.extend
  tagName: 'div'
  classNames: ['slidethumbnailsviewport']

  #in px, used to calculate size of viewport scrollbar
  viewportWidth: (->
    thumbnailCount = @get('controller.filteredContent.length')
    "width: #{thumbnailCount * @get('controller.thumbnailWrapperWidth')}px;"
  ).property('controller.filteredContent', 'controller.thumbnailWrapperWidth')

  mouseLeave: (event) ->
    event.preventDefault()
    @get('controller.manager').send "mouseLeft", @get('controller')
