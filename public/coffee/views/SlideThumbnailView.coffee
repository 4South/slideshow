App.SlideThumbnailView = Em.View.extend

  templateName: 'slidethumbnail'
  tagName: 'li'
  classNames: ['slidethumbnailwrapper']
  classNameBindings: ['dragging']
  attributeBindings: ['style']

  style: (->
    "width: #{@get('parentView.thumbnailWrapperWidth')}px;"
  ).property('parentView.thumbnailWrapperWidth')

  innerStyle: (->
    "width: #{@get('parentView.thumbnailWidth')}px;"
  ).property('parentView.thumbnailWidth')

  dragging: (->
    @get('content.isDragging')
  ).property('content.isDragging')
