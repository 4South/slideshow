App.SampletextView = Em.View.extend
  attributeBindings: ['style']
  templateName: 'sampletext'
  tagName: 'section'
  style: (->
    alignment = @get('content.alignment')
    size = @get('content.size')
    color = @get('content.color')
    font = @get('content.font')

    alignmentString = "text-align:#{alignment};"
    sizeString="font-size:#{size}px;"
    colorString="color:#{color};"
    fontString="font-family:#{font};"
    return alignmentString + sizeString + colorString + fontString
  ).property('content.alignment',
                    'content.font',
                    'content.size',
                    'content.color').cacheable()