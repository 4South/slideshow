App.SlideThumbnailView = Em.View.extend

  templateName: 'slidethumbnail'
  tagName: 'li'
  classNames: ['slidethumbnailwrapper']
  classNameBindings: ['dragging']
  attributeBindings: ['style']

  style: (->
    "width: #{@get('controller.thumbnailWrapperWidth')}px;"
  ).property('controller.thumbnailWrapperWidth')

  innerStyle: (->
    tnWidth = @get('controller.thumbnailWidth')
    wrapperWidth = @get('controller.thumbnailWrapperWidth')
    marginLeft = (wrapperWidth - tnWidth) / 2
    """width: #{tnWidth}px;
       margin-left: #{marginLeft}px;"""
  ).property('controller.thumbnailWidth', 'controller.thumbnailWrapperWidth')

  dragging: (->
    if @get('content') is @get('controller.dragSlide')
      return true
    return false
  ).property('controller.dragSlide', 'content')
