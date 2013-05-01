App.SlidethumbnailsView = Em.View.extend({
  tagName: 'div',
  classNames: ['slidethumbnailsviewport'],
  viewportWidth: (function() {
    var thumbnailCount;

    thumbnailCount = this.get('controller.filteredContent.length');
    return "width: " + (thumbnailCount * this.get('controller.thumbnailWrapperWidth')) + "px;";
  }).property('controller.filteredContent', 'controller.thumbnailWrapperWidth'),
  mouseLeave: function(event) {
    event.preventDefault();
    return this.get('controller.manager').send("mouseLeft", this.get('controller'));
  }
});
