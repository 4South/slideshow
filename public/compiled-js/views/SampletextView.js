App.SampletextView = Em.View.extend({
  attributeBindings: ['style'],
  templateName: 'sampletext',
  tagName: 'section',
  style: (function() {
    var alignment, alignmentString, color, colorString, font, fontString, size, sizeString;

    alignment = this.get('content.alignment');
    size = this.get('content.size');
    color = this.get('content.color');
    font = this.get('content.font');
    alignmentString = "text-align:" + alignment + ";";
    sizeString = "font-size:" + size + "px;";
    colorString = "color:" + color + ";";
    fontString = "font-family:" + font + ";";
    return alignmentString + sizeString + colorString + fontString;
  }).property('content.alignment', 'content.font', 'content.size', 'content.color').cacheable()
});
