App.SlideThumbnailView = Em.View.extend({
  templateName: 'slidethumbnail',
  tagName: 'li',
  classNames: ['slidethumbnailwrapper'],
  classNameBindings: ['dragging'],
  attributeBindings: ['style'],
  style: (function() {
    return "width: " + (this.get('controller.thumbnailWrapperWidth')) + "px;";
  }).property('controller.thumbnailWrapperWidth'),
  innerStyle: (function() {
    var marginLeft, tnWidth, wrapperWidth;

    tnWidth = this.get('controller.thumbnailWidth');
    wrapperWidth = this.get('controller.thumbnailWrapperWidth');
    marginLeft = (wrapperWidth - tnWidth) / 2;
    return "width: " + tnWidth + "px;\nmargin-left: " + marginLeft + "px;";
  }).property('controller.thumbnailWidth', 'controller.thumbnailWrapperWidth'),
  dragging: (function() {
    if (this.get('content') === this.get('controller.dragSlide')) {
      return true;
    }
    return false;
  }).property('controller.dragSlide', 'content')
});
