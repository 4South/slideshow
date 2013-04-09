App.SlideThumbnailView = Em.View.extend({
  templateName: 'slidethumbnail',
  tagName: 'li',
  attributeBindings: ['style'],
  classNameBindings: ['highlighted'],
  classNames: ['slides-thumbnail'],
  highlighted: false,
  height: 40,
  style: (function() {
    return "height:" + (this.get('height')) + "px; width: 100%;";
  }).property('height', 'width')
});
