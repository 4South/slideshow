App.SlideThumbnailView = Em.View.extend({
  templateName: 'slidethumbnail',
  tagName: 'li',
  classNames: ['slidethumbnailwrapper'],
  classNameBindings: ['dragging'],
  attributeBindings: ['style'],
  style: (function() {
    return "width: " + (this.get('parentView.thumbnailWrapperWidth')) + "px;";
  }).property('parentView.thumbnailWrapperWidth'),
  innerStyle: (function() {
    return "width: " + (this.get('parentView.thumbnailWidth')) + "px;";
  }).property('parentView.thumbnailWidth'),
  dragging: (function() {
    return this.get('content.isDragging');
  }).property('content.isDragging')
});
