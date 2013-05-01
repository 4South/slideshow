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
  }).property('controller.dragSlide', 'content'),
  mouseUp: function(event) {
    event.preventDefault();
    event.stopPropagation();
    return this.get('controller.manager').send("mouseUp", this.get('controller'), this.get('content'), event.offsetX);
  },
  mouseDown: function(event) {
    event.preventDefault();
    event.stopPropagation();
    return this.get('controller.manager').send("mouseDown", this.get('controller'), this.get('content'), event.offsetX);
  },
  mouseEnter: function(event) {},
  mouseMove: function(event) {
    return this.get('controller.manager').send("mouseMove", this.get('controller'), this.get('content'), event.offsetX);
  },
  drag: function(event) {
    event.preventDefault();
    return console.log('should not be seeing this dragevent!');
  }
});
