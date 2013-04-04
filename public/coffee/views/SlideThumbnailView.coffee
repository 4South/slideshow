App.SlideThumbnailView = Em.View.extend
  templateName: 'slidethumbnail'
  attributeBindings: ['style']
  classNameBindings: ['highlighted']
  classNames: ['slides-thumbnail']
  
  highlighted: false
  height: 40
  
  style: (->
    return "height:#{@get('height')}px; width: 100%;"
  ).property('height', 'width')
