App.SlidethumbnailsView = Em.View.extend({
  tagName: 'div',
  classNames: ['slidethumbnailsviewport'],
  viewportWidth: (function() {
    var thumbnailCount;

    thumbnailCount = this.get('controller.filteredContent.length');
    return "width: " + (thumbnailCount * this.get('controller.thumbnailWidth')) + "px;";
  }).property('controller.filteredContent'),
  mouseLeave: function(event) {
    console.log("left the thumbnails area");
    event.preventDefault();
    return this.get('controller.manager').send("mouseLeft", this.get('controller'));
  }
});
