App.SlideThumbnailView = Em.View.extend
  attributeBindings: ['style']
  classNameBindings: ['highlighted']
  classNames: ['slides-thumbnail']
  
  highlighted: false
  height: 40

  mouseEnter: (event) ->
    @set "highlighted", true
  mouseLeave: (event) ->
    @set "highlighted", false
  click: (event) ->
    @get('controller').transitionToRoute "slide", @get('slide')
  
  style: (->
    return "height:#{@get('height')}px; width: 100%;"
  ).property('height', 'width')
