App.SlideThumbnailView = Em.View.extend({
  templateName: 'slidethumbnail',
  tagName: 'li',
  classNames: ['slidethumbnail', 'btn', 'btn-warning'],
  attributeBindings: ['style'],
  style: (function() {
    return "width: " + (this.get('controller.thumbnailWidth')) + "px;";
  }).property('controller.thumbnailWidth'),
  mouseUp: function(event) {
    event.preventDefault();
    event.stopPropagation();
    window.ev = event;
    return this.get('controller.manager').send("mouseReleased", this.get('controller'), this.get('content'), event.target);
  },
  drag: function(event) {
    event.preventDefault();
    return console.log('should not be seeing this dragevent!');
  },
  mouseDown: function(event) {
    event.preventDefault();
    event.stopPropagation();
    return this.get('controller.manager').send("mouseDown", this.get('controller'));
  },
  mouseEnter: function(event) {}
});
